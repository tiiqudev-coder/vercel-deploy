import type {
  GraphLink,
  QnaNode,
} from "#/lib/types/graph.types";

export type KnowledgeLevel = "macroarea" | "macrotopic" | "topic" | "subtopic";

export interface KnowledgeNodeView {
  id: string;
  label: string;
  group: "MacroArea" | "Macrotopic" | "Topic" | "Subtopic";
  macroArea?: string;
  macrotopic?: string;
  topic?: string;
  /** Route param ids for map breadcrumbs (`/map/macroarea/...`, etc.). */
  macroareaId?: string;
  macrotopicId?: string;
  topicId?: string;
}

export interface MacroareaViewData {
  centerNode: KnowledgeNodeView;
  children: KnowledgeNodeView[];
}

export interface MacrotopicViewData {
  centerNode: KnowledgeNodeView;
  children: KnowledgeNodeView[];
}

export interface TopicViewData {
  centerNode: KnowledgeNodeView;
  children: KnowledgeNodeView[];
}

export interface SubtopicQnaViewData {
  centerNode: KnowledgeNodeView;
  qnaNodes: QnaNode[];
  links: GraphLink[];
}
