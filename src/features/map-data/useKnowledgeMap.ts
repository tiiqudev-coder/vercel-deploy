import { knowledgeMapRepository } from "./index";
import type { KnowledgeMapRepository } from "./knowledgeMapRepository";

/** Returns the active {@link KnowledgeMapRepository} (JSON or API, per env). */
export function useKnowledgeMap(): KnowledgeMapRepository {
  return knowledgeMapRepository;
}
