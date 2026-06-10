import { FALLBACK_GRAY } from "#/lib/graph-style/palette/macroAreaColors";
import type { GraphStyleConfig } from "#/lib/graph-style/types";
import { GRAPH_CHILD_TEXT_ON_LIGHT_FILL } from "#/lib/graph-style/tokens/graphNodeText";

export const macroareaGraphStyle: GraphStyleConfig = {
  graphKind: "macroarea",
  defaults: {
    fill: FALLBACK_GRAY,
    stroke: "none",
    strokeWidth: 0,
    text: { fill: "#ffffff" },
  },
  rules: [
    {
      match: ({ graphKind, role, node }) =>
        graphKind === "macroarea" &&
        role === "center" &&
        node.group === "MacroArea",
      accentTier: "MacroArea",
      fill: "macroAreaSolid",
      stroke: "none",
      text: "onFill",
    },
    {
      match: ({ graphKind, role, node }) =>
        graphKind === "macroarea" &&
        role === "child" &&
        node.group === "Macrotopic",
      accentTier: "Macrotopic",
      fill: "palettePastel",
      pastelMix: 0.9,
      stroke: "palette",
      strokeWidth: 0.5,
      text: "onFill",
      fixed: { text: { fill: GRAPH_CHILD_TEXT_ON_LIGHT_FILL } },
    },
  ],
};
