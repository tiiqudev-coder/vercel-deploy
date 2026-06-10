import type { MapBreadcrumbSegment } from "#/features/map-data/mapBreadcrumbSegments";
import type { KnowledgeNodeView } from "#/features/map-data/types";
import type { GraphLink, GraphNode, QnaNode } from "#/lib/types/graph.types";

export type MapLevel = "main" | "macroarea" | "macrotopic" | "topic" | "subtopic";

export type MapGraphViewModel = {
  level: MapLevel;
  centerNode?: KnowledgeNodeView;
  nodes: KnowledgeNodeView[] | GraphNode[] | QnaNode[];
  links?: GraphLink[];
  breadcrumbSegments: MapBreadcrumbSegment[];
  backTo: string;
};
