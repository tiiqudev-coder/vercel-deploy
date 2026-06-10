import slugify from "#/lib/slugify";
import { parseRouteIdsFromSubtopicGraphId } from "#/features/map-data/mapBreadcrumbSegments";
import type {
  MacroareasIndexData,
  MacrotopicsByMacroareaData,
  QnasIndex,
  SubtopicQnaData,
  SubtopicsByTopicData,
  TopicsByMacrotopicData,
} from "#/lib/types/graph.types";
import type { KnowledgeMapRepository } from "./knowledgeMapRepository";

async function fetchJson<T>(path: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(path, { signal });
  if (!response.ok) {
    throw new Error(`Failed to load ${path} (${response.status})`);
  }
  return (await response.json()) as T;
}

async function fetchFromDataDir<T>(path: string, signal?: AbortSignal): Promise<T> {
  return fetchJson<T>(`/data/${path}`, signal);
}

async function fetchQnaPayload(entryFile: string, signal?: AbortSignal) {
  try {
    return await fetchFromDataDir<any>(`qnas/${entryFile}`, signal);
  } catch {
    return fetchJson<any>(`/qnas/${entryFile}`, signal);
  }
}

export class JsonKnowledgeMapRepository implements KnowledgeMapRepository {
  async getMainGraph(signal?: AbortSignal): Promise<{ nodes: any[]; links: any[] }> {
    return fetchJson<{ nodes: any[]; links: any[] }>("/data/main_graph.json", signal);
  }

  async getQnasIndex(signal?: AbortSignal): Promise<QnasIndex> {
    return fetchFromDataDir<QnasIndex>("qnas/index.json", signal);
  }

  async getMacroareas(signal?: AbortSignal): Promise<MacroareasIndexData["macroareas"]> {
    const index = await fetchFromDataDir<{
      version: string;
      generatedAt: string;
      macrotopics: Array<{ macroareaId: string; macroArea: string }>;
    }>("macrotopics/index.json", signal);

    const byId = new Map<string, { id: string; label: string }>();
    for (const item of index.macrotopics) {
      if (!byId.has(item.macroareaId)) {
        byId.set(item.macroareaId, { id: item.macroareaId, label: item.macroArea });
      }
    }
    return Array.from(byId.values());
  }

  async getMacrotopicsByMacroarea(
    macroareaId: string,
    signal?: AbortSignal,
  ): Promise<MacrotopicsByMacroareaData> {
    const index = await fetchFromDataDir<{
      version: string;
      generatedAt: string;
      macrotopics: MacrotopicsByMacroareaData["macrotopics"];
    }>("macrotopics/index.json", signal);

    const normalizedId = decodeURIComponent(macroareaId);
    const normalizedSlug = slugify(normalizedId);
    const macrotopics = index.macrotopics.filter((item) => {
      return item.macroareaId === normalizedId || slugify(item.macroareaId) === normalizedSlug;
    });

    const fallbackLabel = normalizedId.includes(":")
      ? normalizedId.split(":").slice(1).join(":")
      : normalizedId;

    return {
      macroarea: {
        id: macrotopics[0]?.macroareaId ?? normalizedId,
        label: macrotopics[0]?.macroArea ?? fallbackLabel,
      },
      macrotopics,
    };
  }

  async getTopicsByMacrotopic(
    macrotopicId: string,
    signal?: AbortSignal,
  ): Promise<TopicsByMacrotopicData> {
    return fetchFromDataDir<TopicsByMacrotopicData>(
      `topics/${slugify(decodeURIComponent(macrotopicId))}.json`,
      signal,
    );
  }

  async getSubtopicsByTopic(topicId: string, signal?: AbortSignal): Promise<SubtopicsByTopicData> {
    return fetchFromDataDir<SubtopicsByTopicData>(
      `subtopics/${slugify(decodeURIComponent(topicId))}.json`,
      signal,
    );
  }

  async getSubtopicQnas(subtopicId: string, signal?: AbortSignal): Promise<SubtopicQnaData> {
    const index = await this.getQnasIndex(signal);
    const decodedId = decodeURIComponent(subtopicId);
    const entry = index.subtopics.find((item) => item.id === decodedId);
    if (!entry) {
      throw new Error(`Subtopic not found in QnA index: ${decodedId}`);
    }

    const payload = await fetchQnaPayload(entry.file, signal);
    const qnaNodes = (payload.nodes ?? []).filter((node: any) => node.group === "QnA");
    const routeIds = parseRouteIdsFromSubtopicGraphId(entry.id);

    return {
      centerNode: {
        id: entry.id,
        label: entry.label,
        group: "Subtopic",
        macroArea: entry.macroArea,
        macrotopic: entry.macrotopic,
        topic: entry.topic,
        macroareaId: routeIds?.macroareaId,
        macrotopicId: routeIds?.macrotopicId,
        topicId: routeIds?.topicId,
      },
      nodes: qnaNodes,
      links: payload.links ?? [],
    };
  }
}

export const jsonKnowledgeMapRepository: KnowledgeMapRepository = new JsonKnowledgeMapRepository();
