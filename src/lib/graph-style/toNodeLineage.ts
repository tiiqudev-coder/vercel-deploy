import type { NodeLineage, NodeGroup } from "#/lib/graph-style/types";

function normalizeGroup(g: string | undefined): NodeLineage["group"] {
  if (g === "Qna") return "Qna";
  if (g === "QnA") return "QnA";
  if (
    g === "MacroArea" ||
    g === "Macrotopic" ||
    g === "Topic" ||
    g === "Subtopic"
  ) {
    return g;
  }
  if (!g) return "Topic";
  return "Subtopic";
}

/** Coerce API / graph nodes into NodeLineage for resolvers. */
export function toNodeLineage(node: {
  id: string;
  label: string;
  group?: string;
  macroArea?: string;
  macrotopic?: string;
  topic?: string;
  subtopic?: string;
}): NodeLineage {
  return {
    id: node.id,
    label: node.label,
    group: normalizeGroup(node.group) as NodeGroup,
    macroArea: node.macroArea,
    macrotopic: node.macrotopic,
    topic: node.topic,
    subtopic: node.subtopic,
  };
}
