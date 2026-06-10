import type { KnowledgeMapRepository } from "./knowledgeMapRepository";
import { apiKnowledgeMapRepository } from "./apiKnowledgeMapRepository";
import { jsonKnowledgeMapRepository } from "./jsonKnowledgeMapRepository";

export type { KnowledgeMapRepository } from "./knowledgeMapRepository";
export { jsonKnowledgeMapRepository } from "./jsonKnowledgeMapRepository";
export { apiKnowledgeMapRepository } from "./apiKnowledgeMapRepository";

/** Toggle via `VITE_USE_KNOWLEDGE_MAP_API=true` when backend endpoints are ready. */
const useApiRepository = import.meta.env.VITE_USE_KNOWLEDGE_MAP_API === "true";

/**
 * Single entry point for all map / graph data.
 * UI and routes should import this 
 */
export const knowledgeMapRepository: KnowledgeMapRepository = useApiRepository
  ? apiKnowledgeMapRepository
  : jsonKnowledgeMapRepository;
