import fs from "fs";
import path from "path";
import slugify from "../src/lib/slugify";
import { MAIN_GRAPH_PATH, TOPICS_DIR } from "./paths";

type MainGraphNode = {
  id: string;
  label: string;
  group: "MacroArea" | "Macrotopic" | "Topic" | "Subtopic";
  macroArea?: string;
  macrotopic?: string;
};

type MainGraphData = {
  nodes: MainGraphNode[];
};

const OUTPUT_DIR = TOPICS_DIR;

type MacrotopicEntry = {
  id: string;
  label: string;
  macroareaId: string;
  macroArea: string;
};

type TopicEntry = {
  id: string;
  label: string;
  macrotopicId: string;
  macroareaId: string;
  macroArea: string;
  macrotopic: string;
};

async function generateTopics(): Promise<void> {
  console.log("📊 Starting topic index generation...\n");

  const mainGraph = JSON.parse(
    fs.readFileSync(MAIN_GRAPH_PATH, "utf-8")
  ) as MainGraphData;

  const macrotopics: MacrotopicEntry[] = mainGraph.nodes
    .filter((node) => node.group === "Macrotopic")
    .map((node) => ({
      id: node.id,
      label: node.label,
      macroareaId: `MacroArea:${node.macroArea}`,
      macroArea: node.macroArea || "Unmapped Macrotopic",
    }));

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

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const generatedAt = new Date().toISOString();
  fs.writeFileSync(
    path.join(OUTPUT_DIR, "index.json"),
    JSON.stringify({ version: "1.0.0", generatedAt, topics }, null, 2),
    "utf-8"
  );

  for (const macrotopic of macrotopics) {
    const items = topics.filter((topic) => topic.macrotopicId === macrotopic.id);

    const filename = `${slugify(macrotopic.id)}.json`;

    fs.writeFileSync(
      path.join(OUTPUT_DIR, filename),
      JSON.stringify({ macrotopic, topics: items }, null, 2),
      "utf-8"
    );
  }
  // for (const macrotopic of macrotopics) {
  //   const items = topics.filter((topic) => topic.macrotopicId === macrotopic.id);
  //   fs.writeFileSync(
  //     path.join(OUTPUT_DIR, `${encodeURIComponent(macrotopic.id)}.json`),
  //     JSON.stringify({ macrotopic, topics: items }, null, 2),
  //     "utf-8"
  //   );
  // }

  console.log(`✅ Generated ${topics.length} topics`);
  console.log(`📁 Output directory: ${OUTPUT_DIR}\n`);
}

generateTopics().catch((error) => {
  console.error("❌ Error generating topic data:", error);
  process.exit(1);
});
