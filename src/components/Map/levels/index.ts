import type { MapLevel } from "#/features/map-data/viewModels/types";
import { mainLevel } from "./main.level";
import { macroareaLevel } from "./macroarea.level";
import { macrotopicLevel } from "./macrotopic.level";
import { subtopicLevel } from "./subtopic.level";
import { topicLevel } from "./topic.level";
import type { LevelConfig, MainLevelConfig } from "./types";

const levelConfigs: Record<MapLevel, LevelConfig | MainLevelConfig> = {
  main: mainLevel,
  macroarea: macroareaLevel,
  macrotopic: macrotopicLevel,
  topic: topicLevel,
  subtopic: subtopicLevel,
};

export function getLevelConfig(level: MapLevel): LevelConfig | MainLevelConfig {
  return levelConfigs[level];
}

export { mainLevel, macroareaLevel, macrotopicLevel, topicLevel, subtopicLevel };
export type { LevelConfig, MainLevelConfig, NodeShape, RadialLayoutConfig } from "./types";
