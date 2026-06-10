import type { NodeLineage } from "#/lib/graph-style/types";
import { toNodeLineage } from "#/lib/graph-style/toNodeLineage";

type HierarchyFields = {
  id: string;
  label: string;
  group: "MacroArea" | "Macrotopic" | "Topic" | "Subtopic";
  macroArea?: string;
  macrotopic?: string;
  topic?: string;
};

export type OrbitalCenterFields = {
  id: string;
  label: string;
  group: string;
  macroArea?: string;
  macrotopic?: string;
  topic?: string;
};

/**
 * Fills macroArea / macrotopic / topic from the radial centre when children omit them.
 */
export function inheritLineageFromCenter(
  child: HierarchyFields,
  center: HierarchyFields
): NodeLineage {
  const macroArea = child.macroArea ?? center.macroArea;
  const macrotopic =
    child.macrotopic ??
    (center.group === "Macrotopic" ? center.label : center.macrotopic);
  const topic =
    child.topic ?? (center.group === "Topic" ? center.label : center.topic);

  return toNodeLineage({
    ...child,
    macroArea,
    macrotopic,
    topic,
  });
}

/** QnA / mixed orbit nodes: inherit palette lineage from the centre subtopic. */
export function mergeOrbitalChildWithCenter(
  child: {
    id: string;
    label?: string;
    group?: string;
    macroArea?: string;
    macrotopic?: string;
    topic?: string;
    subtopic?: string;
    question?: string;
  },
  center: OrbitalCenterFields
): NodeLineage {
  const label =
    child.label ||
    (child.question ? String(child.question).slice(0, 48) : "") ||
    child.id;

  return toNodeLineage({
    id: child.id,
    label,
    group: child.group ?? "QnA",
    macroArea: child.macroArea ?? center.macroArea,
    macrotopic: child.macrotopic ?? center.macrotopic,
    topic: child.topic ?? center.topic,
    subtopic:
      child.subtopic ??
      (center.group === "Subtopic" ? center.label : undefined),
  });
}
