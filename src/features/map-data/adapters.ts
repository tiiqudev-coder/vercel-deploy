import type {
  MacrotopicsByMacroareaData,
  SubtopicQnaData,
  SubtopicsByTopicData,
  TopicsByMacrotopicData,
} from "#/lib/types/graph.types";
import { parseRouteIdsFromSubtopicGraphId } from "#/features/map-data/mapBreadcrumbSegments";
import type {
  MacroareaViewData,
  MacrotopicViewData,
  TopicViewData,
  SubtopicQnaViewData,
} from "./types";

export function toMacroareaViewData(payload: MacrotopicsByMacroareaData): MacroareaViewData {
  return {
    centerNode: {
      id: payload.macroarea.id,
      label: payload.macroarea.label,
      group: "MacroArea",
      macroArea: payload.macroarea.label,
    },
    children: payload.macrotopics.map((item) => ({
      id: item.id,
      label: item.label,
      group: "Macrotopic" as const,
      macroArea: item.macroArea,
      macrotopic: item.label,
      macroareaId: item.macroareaId,
    })),
  };
}

export function toMacrotopicViewData(payload: TopicsByMacrotopicData): MacrotopicViewData {
  return {
    centerNode: {
      id: payload.macrotopic.id,
      label: payload.macrotopic.label,
      group: "Macrotopic",
      macroArea: payload.macrotopic.macroArea,
      macrotopic: payload.macrotopic.label,
      macroareaId: payload.macrotopic.macroareaId,
    },
    children: payload.topics.map((item) => ({
      id: item.id,
      label: item.label,
      group: "Topic" as const,
      macroArea: item.macroArea,
      macrotopic: item.macrotopic,
      topic: item.label,
      macroareaId: item.macroareaId,
      macrotopicId: item.macrotopicId,
    })),
  };
}

export function toTopicViewData(payload: SubtopicsByTopicData): TopicViewData {
  return {
    centerNode: {
      id: payload.topic.id,
      label: payload.topic.label,
      group: "Topic",
      macroArea: payload.topic.macroArea,
      macrotopic: payload.topic.macrotopic,
      topic: payload.topic.label,
      macroareaId: payload.topic.macroareaId,
      macrotopicId: payload.topic.macrotopicId,
    },
    children: payload.subtopics.map((item) => ({
      id: item.id,
      label: item.label,
      group: "Subtopic" as const,
      macroArea: item.macroArea,
      macrotopic: item.macrotopic,
      topic: item.topic,
      macroareaId: item.macroareaId,
      macrotopicId: item.macrotopicId,
      topicId: item.topicId,
    })),
  };
}

export function toSubtopicQnaViewData(payload: SubtopicQnaData): SubtopicQnaViewData {
  const routeIds = parseRouteIdsFromSubtopicGraphId(payload.centerNode.id);
  return {
    centerNode: {
      id: payload.centerNode.id,
      label: payload.centerNode.label,
      group: "Subtopic",
      macroArea: payload.centerNode.macroArea,
      macrotopic: payload.centerNode.macrotopic,
      topic: payload.centerNode.topic,
      macroareaId: routeIds?.macroareaId,
      macrotopicId: routeIds?.macrotopicId,
      topicId: routeIds?.topicId,
    },
    qnaNodes: payload.nodes,
    links: (payload.links ?? []).map((link) => ({
      source: link.source,
      target: link.target,
      value: 1,
    })),
  };
}
