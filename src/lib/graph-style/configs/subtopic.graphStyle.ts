import { FALLBACK_GRAY } from "#/lib/graph-style/palette/macroAreaColors";
import type { GraphStyleConfig } from "#/lib/graph-style/types";

export const subtopicGraphStyle: GraphStyleConfig = {
  graphKind: "subtopic",
  defaults: {
    fill: FALLBACK_GRAY,
    stroke: "none",
    strokeWidth: 0,
    text: { fill: "#ffffff" },
  },
  rules: [
    {
      match: ({ graphKind, role, node }) =>
        graphKind === "subtopic" &&
        role === "center" &&
        node.group === "Subtopic",
      accentTier: "Subtopic",
      fill: "palette",
      stroke: "none",
      text: "onFill",
    },
    {
      match: ({ graphKind, role, node }) =>
        graphKind === "subtopic" &&
        role === "child" &&
        node.group === "Subtopic",
      accentTier: "Subtopic",
      fill: "palette",
      stroke: "sameAsFill",
      text: "onFill",
      strokeWidth: 1.5,
    },
    {
      match: ({ graphKind, role, node }) =>
        graphKind === "subtopic" &&
        role === "child" &&
        (node.group === "QnA" || node.group === "Qna"),
      accentTier: "Subtopic",
      fill: "palette",
      stroke: "sameAsFill",
      text: "onFill",
      strokeWidth: 1.5,
    },
  ],
};
