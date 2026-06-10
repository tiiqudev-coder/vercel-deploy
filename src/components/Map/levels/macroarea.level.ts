import { macroareaGraphStyle } from "#/lib/graph-style/configs/macroarea.graphStyle";
import type { LevelConfig } from "./types";

export const macroareaLevel: LevelConfig = {
  level: "macroarea",
  graphKind: "macroarea",
  styleConfig: macroareaGraphStyle,
  centerShape: "circle",
  childShape: "rounded-square",
  layout: {
    radialRadius: 300,
    collideRadius: 85,
    chargeStrength: -90,
    centerRadius: 105,
    childRadius: 75,
  },
};
