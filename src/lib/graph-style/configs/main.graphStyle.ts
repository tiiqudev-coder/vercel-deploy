import { FALLBACK_GRAY } from "#/lib/graph-style/palette/macroAreaColors";
import type { GraphStyleConfig } from "#/lib/graph-style/types";

export const mainGraphStyle: GraphStyleConfig = {
  graphKind: "main",
  defaults: {
    fill: FALLBACK_GRAY,
    stroke: "none",
    strokeWidth: 0,
    text: { fill: "#ffffff" },
  },
  rules: [
    {
      match: ({ graphKind, role, node }) =>
        graphKind === "main" && role === "node" && node.group === "MacroArea",
      accentTier: "MacroArea",
      fill: "macroAreaSolid",
      stroke: "none",
      text: "onFill",
    },
    {
      match: ({ graphKind, role, node }) =>
        graphKind === "main" && role === "node" && node.group === "Macrotopic",
      accentTier: "Macrotopic",
      fill: "palette",
      stroke: "sameAsFill",
      text: "onFill",
      strokeWidth: 1.5,
    },
    {
      match: ({ graphKind, role, node }) =>
        graphKind === "main" && role === "node" && node.group === "Topic",
      accentTier: "Topic",
      fill: "palette",
      stroke: "sameAsFill",
      text: "onFill",
      strokeWidth: 1.5,
    },
    {
      match: ({ graphKind, role, node }) =>
        graphKind === "main" && role === "node" && node.group === "Subtopic",
      accentTier: "Subtopic",
      fill: "palette",
      stroke: "sameAsFill",
      text: "onFill",
      strokeWidth: 1.5,
    },
  ],
};
