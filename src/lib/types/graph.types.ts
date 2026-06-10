// src/lib/graphTypes.ts

export type ThemeValue = "light" | "dark" | string;

export type NodeGroup =
  | "MacroArea"
  | "Macrotopic"
  | "Topic"
  | "Subtopic"
  | "QnA"
  | "Qna";

/**
 * Raw node shapes coming from main_graph.json
 * (Your JSON is not fully uniform, so keep this flexible but safe)
 */
export interface BaseGraphNode {
  id: string;
  label: string;
  group: NodeGroup;
  macroArea?: string;
  macrotopic?: string;
  topic?: string;
  // subtopic nodes implicitly represent a subtopic; for qna nodes, you'll have subtopicId etc.
}

export type MacroAreaNode = BaseGraphNode & {
  group: "MacroArea";
  macroArea?: string;
};
export type MacrotopicNode = BaseGraphNode & {
  group: "Macrotopic";
  macrotopic?: string;
};
export type TopicNode = BaseGraphNode & { group: "Topic"; topic?: string };
export type SubtopicNode = BaseGraphNode & {
  group: "Subtopic";
  topic?: string;
};
export type GraphNode =
  | MacroAreaNode
  | MacrotopicNode
  | TopicNode
  | SubtopicNode;

export interface GraphLink {
  source: string;
  target: string;
  value: number;
}

export interface RawQnaEntry {
  Macrotopic?: string;
  Topic?: string;
  Subtopic?: string;
  Label?: string;
  question?: string;
  answer?: string;
  articlesourceurl?: string;
  paragraph?: string;
  Tags?: string[];
  ViewCount?: number;
}

/**
 * D3 “hydrated” node/link typings
 */
export type D3Node = GraphNode & {
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;
};

export type D3Link = Omit<GraphLink, "source" | "target"> & {
  source: string | D3Node;
  target: string | D3Node;
  index?: number;
};

/**
 * QnA data layer (from qnas/*.json)
 * Shape this to your actual QnA schema (keep it permissive for now).
 */
export interface QnaNode {
  id: string;
  group?: "QnA" | "Qna";
  label?: string;
  macroArea?: string;
  macrotopic?: string;
  topic?: string;
  subtopic?: string;
  tags?: string[];
  question: string;
  answer?: string;
  [key: string]: unknown;
}

export interface QnasIndexEntry {
  id: string; // subtopicId (matches Subtopic node id)
  label: string;
  qnaCount: number;
  macroArea?: string;
  macrotopic?: string;
  topic?: string;
  file: string; // filename in /public/qnas/
}

export interface QnasIndex {
  version: string;
  generatedAt: string;
  subtopics: QnasIndexEntry[];
}

export interface MacroareaEntry {
  id: string;
  label: string;
}

export interface MacrotopicEntry {
  id: string;
  label: string;
  macroareaId: string;
  macroArea: string;
}

export interface TopicEntry {
  id: string;
  label: string;
  macrotopicId: string;
  macroareaId: string;
  macroArea: string;
  macrotopic: string;
}

export interface SubtopicEntry {
  id: string;
  label: string;
  topicId: string;
  macrotopicId: string;
  macroareaId: string;
  macroArea: string;
  macrotopic: string;
  topic: string;
  qnaCount?: number;
}

export interface MacroareasIndexData {
  version: string;
  generatedAt: string;
  macroareas: MacroareaEntry[];
}

export interface MacrotopicsByMacroareaData {
  macroarea: MacroareaEntry;
  macrotopics: MacrotopicEntry[];
}

export interface TopicsByMacrotopicData {
  macrotopic: MacrotopicEntry;
  topics: TopicEntry[];
}

export interface SubtopicsByTopicData {
  topic: TopicEntry;
  subtopics: SubtopicEntry[];
}

export type MainGraphData = {
  nodes: GraphNode[];
  links: GraphLink[];
};

export type SubtopicQnaGraphData = {
  nodes: Array<SubtopicNode | QnaNode>;
  links: GraphLink[];
};

// What SubtopicLanding expects

export interface SubtopicQnaData {
  centerNode: {
    id: string;
    label: string;
    macroArea?: string;
    macrotopic?: string;
    topic?: string;
    group: string;
    macroareaId?: string;
    macrotopicId?: string;
    topicId?: string;
  };
  nodes: QnaNode[];
  links?: Array<{ source: string; target: string }>; // optional
}

//  Variant props for accessibility sidebar -----------------------------------------

type QnaSidebarProps = {
  variant: "qna";
  macroArea?: string;
  subtopic: string;
  nodes: QnaNode[];
  onSelectQuestion: (qna: QnaNode) => void;
};

export type SubtopicItem = SubtopicNode;

export type TopicItem = {
  topic: TopicNode;
  subtopics: SubtopicNode[];
};

export type MacroTopicItem = {
  macrotopic: MacrotopicNode;
  topics: TopicItem[];
};

type HierarchySidebarProps = {
  variant: "hierarchy";
  macroArea: string;
  macrotopics: MacroTopicItem[];
  onSelectSubtopic: (subtopicId: string) => void;
};

export type GraphSidebarProps = QnaSidebarProps | HierarchySidebarProps;
