import type { KnowledgeNodeView } from "./types";

const GROUP_LABELS: Record<KnowledgeNodeView["group"], string> = {
  MacroArea: "Macro area",
  Macrotopic: "Macro topic",
  Topic: "Topic",
  Subtopic: "Subtopic",
};

export function formatKnowledgeGroupLabel(group: string): string {
  if (group in GROUP_LABELS) {
    return GROUP_LABELS[group as KnowledgeNodeView["group"]];
  }
  return group.replace(/([a-z])([A-Z])/g, "$1 $2").trim() || "Unknown";
}
