import { mainGraphStyle } from "#/lib/graph-style/configs/main.graphStyle";
import type { MainLevelConfig } from "./types";

export const mainLevel: MainLevelConfig = {
  level: "main",
  graphKind: "main",
  styleConfig: mainGraphStyle,
  centerShape: "circle",
  childShape: "circle",
  layout: {},
  forceLayout: {
    linkDistance: 200,
    chargeStrength: -350,
  },
};
