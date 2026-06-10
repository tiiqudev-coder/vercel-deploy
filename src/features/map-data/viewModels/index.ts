import {
  buildHierarchyBreadcrumbSegments,
  buildSubtopicQnaBreadcrumbSegments,
} from "#/features/map-data/mapBreadcrumbSegments";
import {
  toMacroareaViewData,
  toMacrotopicViewData,
  toSubtopicQnaViewData,
  toTopicViewData,
} from "#/features/map-data/adapters";
import type {
  MacrotopicsByMacroareaData,
  SubtopicQnaData,
  SubtopicsByTopicData,
  TopicsByMacrotopicData,
} from "#/lib/types/graph.types";
import type { GraphLink, GraphNode } from "#/lib/types/graph.types";
import type { MapGraphViewModel, MapLevel } from "./types";

export type { MapGraphViewModel, MapLevel } from "./types";

const MAIN_BREADCRUMB = [{ label: "Map of knowledge" }] as const;

export function toMainGraphViewModel(data: {
  nodes: GraphNode[];
  links: GraphLink[];
}): MapGraphViewModel {
  return {
    level: "main",
    nodes: data.nodes,
    links: data.links,
    breadcrumbSegments: [...MAIN_BREADCRUMB],
    backTo: "/map",
  };
}

export function toMacroareaGraphViewModel(
  payload: MacrotopicsByMacroareaData,
): MapGraphViewModel {
  const view = toMacroareaViewData(payload);
  return {
    level: "macroarea",
    centerNode: view.centerNode,
    nodes: view.children,
    breadcrumbSegments: buildHierarchyBreadcrumbSegments("macroarea", view.centerNode),
    backTo: "/map",
  };
}

export function toMacrotopicGraphViewModel(
  payload: TopicsByMacrotopicData,
): MapGraphViewModel {
  const view = toMacrotopicViewData(payload);
  const macroareaId = payload.macrotopic.macroareaId;
  return {
    level: "macrotopic",
    centerNode: view.centerNode,
    nodes: view.children,
    breadcrumbSegments: buildHierarchyBreadcrumbSegments("macrotopic", view.centerNode),
    backTo: macroareaId
      ? `/map/macroarea/${encodeURIComponent(macroareaId)}`
      : "/map",
  };
}

export function toTopicGraphViewModel(payload: SubtopicsByTopicData): MapGraphViewModel {
  const view = toTopicViewData(payload);
  const macrotopicId = payload.topic.macrotopicId;
  return {
    level: "topic",
    centerNode: view.centerNode,
    nodes: view.children,
    breadcrumbSegments: buildHierarchyBreadcrumbSegments("topic", view.centerNode),
    backTo: macrotopicId
      ? `/map/macrotopic/${encodeURIComponent(macrotopicId)}`
      : "/map",
  };
}

export function toSubtopicQnaGraphViewModel(payload: SubtopicQnaData): MapGraphViewModel {
  const view = toSubtopicQnaViewData(payload);
  const topicId = view.centerNode.topicId;
  return {
    level: "subtopic",
    centerNode: view.centerNode,
    nodes: view.qnaNodes,
    links: view.links,
    breadcrumbSegments: buildSubtopicQnaBreadcrumbSegments(view.centerNode),
    backTo: topicId ? `/map/topic/${encodeURIComponent(topicId)}` : "/map",
  };
}
