import type {
  MacroareasIndexData,
  MacrotopicsByMacroareaData,
  QnasIndex,
  SubtopicQnaData,
  SubtopicsByTopicData,
  TopicsByMacrotopicData,
} from "#/lib/types/graph.types";

export interface KnowledgeMapRepository {
  getMainGraph: (signal?: AbortSignal) => Promise<{ nodes: any[]; links: any[] }>;
  getMacroareas: (signal?: AbortSignal) => Promise<MacroareasIndexData["macroareas"]>;
  getMacrotopicsByMacroarea: (
    macroareaId: string,
    signal?: AbortSignal,
  ) => Promise<MacrotopicsByMacroareaData>;
  getTopicsByMacrotopic: (
    macrotopicId: string,
    signal?: AbortSignal,
  ) => Promise<TopicsByMacrotopicData>;
  getSubtopicsByTopic: (
    topicId: string,
    signal?: AbortSignal,
  ) => Promise<SubtopicsByTopicData>;
  getQnasIndex: (signal?: AbortSignal) => Promise<QnasIndex>;
  getSubtopicQnas: (subtopicId: string, signal?: AbortSignal) => Promise<SubtopicQnaData>;
}
