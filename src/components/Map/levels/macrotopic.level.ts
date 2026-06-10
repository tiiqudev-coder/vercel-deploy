import { macrotopicGraphStyle } from "#/lib/graph-style/configs/macrotopic.graphStyle";
import type { LevelConfig } from "./types";

export const macrotopicLevel: LevelConfig = {
  level: "macrotopic",
  graphKind: "macrotopic",
  styleConfig: macrotopicGraphStyle,
  centerShape: "rounded-square",
  childShape: "circle",
  layout: {
    radialRadius: 280,
    collideRadius: 78,
    chargeStrength: -80,
    centerRadius: 95,
    childRadius: 62,
  },
};
