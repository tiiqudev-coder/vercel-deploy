import { FALLBACK_GRAY } from "#/lib/graph-style/palette/macroAreaColors";
import type { GraphStyleConfig } from "#/lib/graph-style/types";
import { GRAPH_CHILD_TEXT_ON_LIGHT_FILL } from "#/lib/graph-style/tokens/graphNodeText";

export const topicGraphStyle: GraphStyleConfig = {
  graphKind: "topic",
  defaults: {
    fill: FALLBACK_GRAY,
    stroke: "none",
    strokeWidth: 0,
    text: { fill: "#ffffff" },
  },
  rules: [
    {
      match: ({ graphKind, role, node }) =>
        graphKind === "topic" && role === "center" && node.group === "Topic",
      accentTier: "Topic",
      fill: "palette",
      stroke: "none",
      text: "onFill",
    },
    {
      match: ({ graphKind, role, node }) =>
        graphKind === "topic" && role === "child" && node.group === "Subtopic",
      accentTier: "Subtopic",
      fill: "white",
      stroke: "palette",
      text: "onFill",
      strokeWidth: 1.5,
      fixed: { text: { fill: GRAPH_CHILD_TEXT_ON_LIGHT_FILL } },
    },
  ],
};
