export type GraphKind =
  | "macroarea"
  | "macrotopic"
  | "topic"
  | "subtopic"
  | "main";

/** Hierarchy views use center/child; main force graph uses node. */
export type NodeRole = "center" | "child" | "node";

export type PaletteTier = "Macrotopic" | "Topic" | "Subtopic";

export type NodeGroup =
  | "MacroArea"
  | "Macrotopic"
  | "Topic"
  | "Subtopic"
  | "QnA"
  | "Qna";

/** Minimal fields for palette + style resolution. */
export interface NodeLineage {
  id: string;
  label: string;
  group: NodeGroup;
  macroArea?: string;
  macrotopic?: string;
  topic?: string;
  subtopic?: string;
}

export interface ResolvedNodeStyle {
  fill: string;
  stroke: string;
  strokeWidth: number;
  text: { fill: string };
  label?: { maxWidthFactor?: number };
}

export type StyleFill =
  | "palette"
  /** Blend palette accent heavily toward white (see `pastelMix` on rule). */
  | "palettePastel"
  | "white"
  | "macroAreaSolid"
  | "transparent";

export type StyleStroke = "palette" | "none" | "sameAsFill";

export type StyleText = "palette" | "onFill" | "fixed";

export interface NodeStyleRule {
  match: (ctx: StyleMatchContext) => boolean;
  accentTier: PaletteTier | "MacroArea" | null;
  fill: StyleFill;
  stroke: StyleStroke;
  text: StyleText;
  strokeWidth?: number;
  /** Used when `fill` is `palettePastel`; fraction of white in the mix (default in resolver). */
  pastelMix?: number;
  fixed?: Partial<Pick<ResolvedNodeStyle, "fill" | "stroke">> & {
    text?: { fill: string };
  };
}

export interface StyleMatchContext {
  graphKind: GraphKind;
  role: NodeRole;
  node: NodeLineage;
}

export interface GraphStyleConfig {
  graphKind: GraphKind;
  rules: NodeStyleRule[];
  defaults: Omit<ResolvedNodeStyle, "text"> & { text: { fill: string } };
}
