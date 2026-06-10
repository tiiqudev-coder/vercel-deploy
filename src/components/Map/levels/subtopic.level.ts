import { subtopicGraphStyle } from "#/lib/graph-style/configs/subtopic.graphStyle";
import type { LevelConfig } from "./types";

export const subtopicLevel: LevelConfig = {
  level: "subtopic",
  graphKind: "subtopic",
  styleConfig: subtopicGraphStyle,
  centerShape: "pentagon",
  childShape: "circle",
  qnaMode: true,
  layout: {
    radialRadius: 300,
    collideRadius: 30,
    chargeStrength: -50,
    centerRadius: 100,
    childRadius: 20,
  },
};
