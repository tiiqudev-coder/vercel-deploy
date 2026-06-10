import fs from "fs";
import path from "path";
import slugify from "../src/lib/slugify";
import { MAIN_GRAPH_PATH, MACROTOPICS_DIR } from "./paths";

type MainGraphNode = {
  id: string;
  label: string;
  group: "MacroArea" | "Macrotopic" | "Topic" | "Subtopic";
  macroArea?: string;
};

type MainGraphData = {
  nodes: MainGraphNode[];
};

const OUTPUT_DIR = MACROTOPICS_DIR;

type MacroareaEntry = {
  id: string;
  label: string;
};

type MacrotopicEntry = {
  id: string;
  label: string;
  macroareaId: string;
  macroArea: string;
};

async function generateMacrotopics(): Promise<void> {
  console.log("📊 Starting macrotopic index generation...\n");

  const mainGraph = JSON.parse(
    fs.readFileSync(MAIN_GRAPH_PATH, "utf-8")
  ) as MainGraphData;

  const macroareas: MacroareaEntry[] = mainGraph.nodes
    .filter((node) => node.group === "MacroArea")
    .map((node) => ({ id: node.id, label: node.label }));

  const macrotopics: MacrotopicEntry[] = mainGraph.nodes
    .filter((node) => node.group === "Macrotopic")
    .map((node) => ({
      id: node.id,
      label: node.label,
      macroareaId: `MacroArea:${node.macroArea}`,
      macroArea: node.macroArea || "Unmapped Macrotopic",
    }));

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const generatedAt = new Date().toISOString();
  fs.writeFileSync(
    path.join(OUTPUT_DIR, "index.json"),
    JSON.stringify({ version: "1.0.0", generatedAt, macrotopics }, null, 2),
    "utf-8"
  );

  for (const macroarea of macroareas) {
    const items = macrotopics.filter((mt) => mt.macroareaId === macroarea.id);

    const filename = `${slugify(macroarea.id)}.json`;

    fs.writeFileSync(
      path.join(OUTPUT_DIR, filename),
      JSON.stringify({ macroarea, macrotopics: items }, null, 2),
      "utf-8"
    );
  }

  console.log(`✅ Generated ${macrotopics.length} macrotopics`);
  console.log(`📁 Output directory: ${OUTPUT_DIR}\n`);
}

generateMacrotopics().catch((error) => {
  console.error("❌ Error generating macrotopic data:", error);
  process.exit(1);
});
