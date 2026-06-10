import fs from "fs";
import path from "path";
import slugify from "../src/lib/slugify";
import { MAIN_GRAPH_PATH, QNA_INDEX_PATH, SUBTOPICS_DIR } from "./paths";

type MainGraphNode = {
  id: string;
  label: string;
  group: "MacroArea" | "Macrotopic" | "Topic" | "Subtopic";
  macroArea?: string;
  macrotopic?: string;
  topic?: string;
};

type MainGraphData = {
  nodes: MainGraphNode[];
};

type QnaIndex = {
  subtopics: Array<{ id: string; qnaCount: number }>;
};

const OUTPUT_DIR = SUBTOPICS_DIR;

type TopicEntry = {
  id: string;
  label: string;
  macrotopicId: string;
  macroareaId: string;
  macroArea: string;
  macrotopic: string;
};

type SubtopicEntry = {
  id: string;
  label: string;
  topicId: string;
  macrotopicId: string;
  macroareaId: string;
  macroArea: string;
  macrotopic: string;
  topic: string;
  qnaCount: number;
};

async function generateSubtopics(): Promise<void> {
  console.log("📊 Starting subtopic index generation...\n");

  const mainGraph = JSON.parse(
    fs.readFileSync(MAIN_GRAPH_PATH, "utf-8")
  ) as MainGraphData;
  const qnaIndex = JSON.parse(fs.readFileSync(QNA_INDEX_PATH, "utf-8")) as QnaIndex;
  const qnaCountBySubtopicId = new Map(
    qnaIndex.subtopics.map((subtopic) => [subtopic.id, subtopic.qnaCount])
  );

  const topics: TopicEntry[] = mainGraph.nodes
    .filter((node) => node.group === "Topic")
    .map((node) => ({
      id: node.id,
      label: node.label,
      macrotopicId: `Macrotopic:${node.macroArea}|${node.macrotopic}`,
      macroareaId: `MacroArea:${node.macroArea}`,
      macroArea: node.macroArea || "Unmapped Macrotopic",
      macrotopic: node.macrotopic || "Unknown Macrotopic",
    }));

  const subtopics: SubtopicEntry[] = mainGraph.nodes
    .filter((node) => node.group === "Subtopic")
    .map((node) => ({
      id: node.id,
      label: node.label,
      topicId: `Topic:${node.macroArea}|${node.macrotopic}|${node.topic}`,
      macrotopicId: `Macrotopic:${node.macroArea}|${node.macrotopic}`,
      macroareaId: `MacroArea:${node.macroArea}`,
      macroArea: node.macroArea || "Unmapped Macrotopic",
      macrotopic: node.macrotopic || "Unknown Macrotopic",
      topic: node.topic || "Unknown Topic",
      qnaCount: qnaCountBySubtopicId.get(node.id) || 0,
    }));

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const generatedAt = new Date().toISOString();
  fs.writeFileSync(
    path.join(OUTPUT_DIR, "index.json"),
    JSON.stringify({ version: "1.0.0", generatedAt, subtopics }, null, 2),
    "utf-8"
  );

  for (const topic of topics) {
    const items = subtopics.filter((subtopic) => subtopic.topicId === topic.id);

    const filename = `${slugify(topic.id)}.json`;
    fs.writeFileSync(
      path.join(OUTPUT_DIR, filename),
      JSON.stringify({ topic, subtopics: items }, null, 2),
      "utf-8"
    );
  }
  // for (const topic of topics) {
  //   const items = subtopics.filter((subtopic) => subtopic.topicId === topic.id);
  //   fs.writeFileSync(
  //     path.join(OUTPUT_DIR, `${encodeURIComponent(topic.id)}.json`),
  //     JSON.stringify({ topic, subtopics: items }, null, 2),
  //     "utf-8"
  //   );
  // }

  console.log(`✅ Generated ${subtopics.length} subtopics`);
  console.log(`📁 Output directory: ${OUTPUT_DIR}\n`);
}

generateSubtopics().catch((error) => {
  console.error("❌ Error generating subtopic data:", error);
  process.exit(1);
});
