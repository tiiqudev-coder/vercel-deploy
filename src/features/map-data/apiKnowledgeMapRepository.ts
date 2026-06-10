import type {
  MacroareasIndexData,
  MacrotopicsByMacroareaData,
  QnasIndex,
  SubtopicQnaData,
  SubtopicsByTopicData,
  TopicsByMacrotopicData,
} from "#/lib/types/graph.types";
import type { KnowledgeMapRepository } from "./knowledgeMapRepository";
import { jsonKnowledgeMapRepository } from "./jsonKnowledgeMapRepository";

// When wiring endpoints, use VITE_API_BASE_URL and e.g.:
// async function fetchApiJson<T>(path: string, signal?: AbortSignal): Promise<T> {
//   const base = import.meta.env.VITE_API_BASE_URL ?? "";
//   const response = await fetch(`${base}${path}`, { signal });
//   if (!response.ok) throw new Error(`Knowledge map API ${path} failed (${response.status})`);
//   return (await response.json()) as T;
// }

/**
 * Production repository: one HTTP call per graph level, by id.
 * Until endpoints exist, each method falls back to {@link jsonKnowledgeMapRepository}
 * so local `/data/*` graphs keep working. Remove fallbacks as you wire real routes.
 */
export class ApiKnowledgeMapRepository implements KnowledgeMapRepository {
  async getMainGraph(signal?: AbortSignal): Promise<{ nodes: any[]; links: any[] }> {
    // return fetchApiJson<{ nodes: any[]; links: any[] }>("/graph/main", signal);
    return jsonKnowledgeMapRepository.getMainGraph(signal);
  }

  async getMacroareas(
    signal?: AbortSignal,
  ): Promise<MacroareasIndexData["macroareas"]> {
    // return fetchApiJson<MacroareasIndexData["macroareas"]>("/macroareas", signal);
    return jsonKnowledgeMapRepository.getMacroareas(signal);
  }

  async getMacrotopicsByMacroarea(
    macroareaId: string,
    signal?: AbortSignal,
  ): Promise<MacrotopicsByMacroareaData> {
    // return fetchApiJson<MacrotopicsByMacroareaData>(
    //   `/macroareas/${encodeURIComponent(macroareaId)}`,
    //   signal,
    // );
    return jsonKnowledgeMapRepository.getMacrotopicsByMacroarea(macroareaId, signal);
  }

  async getTopicsByMacrotopic(
    macrotopicId: string,
    signal?: AbortSignal,
  ): Promise<TopicsByMacrotopicData> {
    // return fetchApiJson<TopicsByMacrotopicData>(
    //   `/macrotopics/${encodeURIComponent(macrotopicId)}`,
    //   signal,
    // );
    return jsonKnowledgeMapRepository.getTopicsByMacrotopic(macrotopicId, signal);
  }

  async getSubtopicsByTopic(
    topicId: string,
    signal?: AbortSignal,
  ): Promise<SubtopicsByTopicData> {
    // return fetchApiJson<SubtopicsByTopicData>(
    //   `/topics/${encodeURIComponent(topicId)}`,
    //   signal,
    // );
    return jsonKnowledgeMapRepository.getSubtopicsByTopic(topicId, signal);
  }

  async getQnasIndex(signal?: AbortSignal): Promise<QnasIndex> {
    // return fetchApiJson<QnasIndex>("/qnas", signal);
    return jsonKnowledgeMapRepository.getQnasIndex(signal);
  }

  async getSubtopicQnas(
    subtopicId: string,
    signal?: AbortSignal,
  ): Promise<SubtopicQnaData> {
    // return fetchApiJson<SubtopicQnaData>(
    //   `/subtopics/${encodeURIComponent(subtopicId)}/qnas`,
    //   signal,
    // );
    return jsonKnowledgeMapRepository.getSubtopicQnas(subtopicId, signal);
  }
}

export const apiKnowledgeMapRepository: KnowledgeMapRepository =
  new ApiKnowledgeMapRepository();
