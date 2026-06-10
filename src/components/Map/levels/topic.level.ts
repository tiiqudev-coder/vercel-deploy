import { topicGraphStyle } from "#/lib/graph-style/configs/topic.graphStyle";
import type { LevelConfig } from "./types";

export const topicLevel: LevelConfig = {
  level: "topic",
  graphKind: "topic",
  styleConfig: topicGraphStyle,
  centerShape: "circle",
  childShape: "pentagon",
  layout: {
    radialRadius: 250,
    collideRadius: 70,
    chargeStrength: -72,
    centerRadius: 100,
    childRadius: 80,
  },
};
