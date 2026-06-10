export type {
  GraphKind,
  GraphStyleConfig,
  NodeGroup,
  NodeLineage,
  NodeRole,
  NodeStyleRule,
  PaletteTier,
  ResolvedNodeStyle,
  StyleMatchContext,
  StyleFill,
  StyleStroke,
  StyleText,
} from "#/lib/graph-style/types";

export { mixHexWithWhite } from "#/lib/graph-style/palette/mixHexWithWhite";
export { GRAPH_CHILD_TEXT_ON_LIGHT_FILL } from "#/lib/graph-style/tokens/graphNodeText";
export {
  FALLBACK_GRAY,
  MACRO_AREA_COLORS,
  NEUTRAL_LIGHT_GRAY,
} from "#/lib/graph-style/palette/macroAreaColors";
export { resolveNodeStyle } from "#/lib/graph-style/resolveNodeStyle";
export { toNodeLineage } from "#/lib/graph-style/toNodeLineage";
export { inheritLineageFromCenter, mergeOrbitalChildWithCenter } from "#/lib/graph-style/inheritLineage";
export type { OrbitalCenterFields } from "#/lib/graph-style/inheritLineage";

export { macroareaGraphStyle } from "#/lib/graph-style/configs/macroarea.graphStyle";
export { macrotopicGraphStyle } from "#/lib/graph-style/configs/macrotopic.graphStyle";
export { topicGraphStyle } from "#/lib/graph-style/configs/topic.graphStyle";
export { subtopicGraphStyle } from "#/lib/graph-style/configs/subtopic.graphStyle";
export { mainGraphStyle } from "#/lib/graph-style/configs/main.graphStyle";
