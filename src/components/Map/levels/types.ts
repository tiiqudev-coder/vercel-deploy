import type { GraphKind, GraphStyleConfig } from "#/lib/graph-style/types";
import type { MapLevel } from "#/features/map-data/viewModels/types";

export type NodeShape = "circle" | "pentagon" | "rounded-square";

export type RadialLayoutConfig = {
  radialRadius?: number;
  collideRadius?: number;
  chargeStrength?: number;
  centerRadius?: number;
  childRadius?: number;
};

export type LevelConfig = {
  level: MapLevel;
  graphKind: GraphKind;
  styleConfig: GraphStyleConfig;
  layout: RadialLayoutConfig;
  centerShape: NodeShape;
  childShape: NodeShape;
  /** When true, renderer uses QnA child drawing (subtopic level). */
  qnaMode?: boolean;
};

export type ForceLayoutConfig = {
  linkDistance: number;
  chargeStrength: number;
};

export type MainLevelConfig = LevelConfig & {
  level: "main";
  forceLayout: ForceLayoutConfig;
};
