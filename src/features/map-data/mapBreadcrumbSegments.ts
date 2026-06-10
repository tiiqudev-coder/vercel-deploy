import type { GraphKind } from "#/lib/graph-style/types";
import type { KnowledgeNodeView } from "#/features/map-data/types";

export type MapBreadcrumbLinkTarget =
  | { kind: "map" }
  | { kind: "macroarea"; macroAreaId: string }
  | { kind: "macrotopic"; macrotopicId: string }
  | { kind: "topic"; topicId: string }
  | { kind: "subtopic"; subtopicId: string };

export type MapBreadcrumbSegment = {
  label: string;
  /** Omit or undefined last segment = current page (not a link). */
  link?: MapBreadcrumbLinkTarget;
};

function enc(id: string): string {
  return encodeURIComponent(id);
}

type CenterWithRouteIds = KnowledgeNodeView & {
  macroareaId?: string;
  macrotopicId?: string;
};

/**
 * Parses canonical subtopic graph ids (`Subtopic:Area|Macrotopic|Topic|Label`)
 * into route param ids used under `/map/...`.
 */
export function parseRouteIdsFromSubtopicGraphId(
  subtopicFullId: string
): {
  macroareaId: string;
  macrotopicId: string;
  topicId: string;
  subtopicId: string;
} | null {
  if (!subtopicFullId.startsWith("Subtopic:")) return null;
  const body = subtopicFullId.slice("Subtopic:".length);
  const parts = body.split("|").map((p) => p.trim());
  if (parts.length < 4) return null;
  const [area, macrotopic, topic] = [parts[0], parts[1], parts[2]];
  if (!area || !macrotopic || !topic) return null;
  return {
    macroareaId: `MacroArea:${area}`,
    macrotopicId: `Macrotopic:${area}|${macrotopic}`,
    topicId: `Topic:${area}|${macrotopic}|${topic}`,
    subtopicId: subtopicFullId,
  };
}

export function buildHierarchyBreadcrumbSegments(
  graphKind: GraphKind,
  centerNode: CenterWithRouteIds
): MapBreadcrumbSegment[] {
  const root: MapBreadcrumbSegment = {
    label: "Map of knowledge",
    link: { kind: "map" },
  };

  if (graphKind === "macroarea" && centerNode.group === "MacroArea") {
    return [root, { label: centerNode.label }];
  }

  if (graphKind === "macrotopic" && centerNode.group === "Macrotopic") {
    const segments: MapBreadcrumbSegment[] = [root];
    if (centerNode.macroareaId) {
      segments.push({
        label: centerNode.macroArea ?? "Macroarea",
        link: { kind: "macroarea", macroAreaId: centerNode.macroareaId },
      });
    } else if (centerNode.macroArea) {
      segments.push({ label: centerNode.macroArea });
    }
    segments.push({ label: centerNode.label });
    return segments;
  }

  if (graphKind === "topic" && centerNode.group === "Topic") {
    const segments: MapBreadcrumbSegment[] = [root];
    if (centerNode.macroareaId) {
      segments.push({
        label: centerNode.macroArea ?? "Macroarea",
        link: { kind: "macroarea", macroAreaId: centerNode.macroareaId },
      });
    } else if (centerNode.macroArea) {
      segments.push({ label: centerNode.macroArea });
    }
    if (centerNode.macrotopicId) {
      segments.push({
        label: centerNode.macrotopic ?? "Macrotopic",
        link: { kind: "macrotopic", macrotopicId: centerNode.macrotopicId },
      });
    } else if (centerNode.macrotopic) {
      segments.push({ label: centerNode.macrotopic });
    }
    segments.push({ label: centerNode.label });
    return segments;
  }

  return [
    root,
    {
      label: centerNode.macroArea || centerNode.label,
    },
  ];
}

export function buildSubtopicQnaBreadcrumbSegments(center: {
  id: string;
  label: string;
  macroArea?: string;
  macrotopic?: string;
  topic?: string;
  macroareaId?: string;
  macrotopicId?: string;
  topicId?: string;
}): MapBreadcrumbSegment[] {
  const parsed = parseRouteIdsFromSubtopicGraphId(center.id);
  const macroareaId = center.macroareaId ?? parsed?.macroareaId;
  const macrotopicId = center.macrotopicId ?? parsed?.macrotopicId;
  const topicId = center.topicId ?? parsed?.topicId;

  const root: MapBreadcrumbSegment = {
    label: "Map of knowledge",
    link: { kind: "map" },
  };

  const segments: MapBreadcrumbSegment[] = [root];

  if (macroareaId && center.macroArea) {
    segments.push({
      label: center.macroArea,
      link: { kind: "macroarea", macroAreaId: macroareaId },
    });
  } else if (center.macroArea) {
    segments.push({ label: center.macroArea });
  }

  if (macrotopicId && center.macrotopic) {
    segments.push({
      label: center.macrotopic,
      link: { kind: "macrotopic", macrotopicId: macrotopicId },
    });
  } else if (center.macrotopic) {
    segments.push({ label: center.macrotopic });
  }

  if (topicId && center.topic) {
    segments.push({
      label: center.topic,
      link: { kind: "topic", topicId: topicId },
    });
  } else if (center.topic) {
    segments.push({ label: center.topic });
  }

  segments.push({
    label: center.label,
  });

  return segments;
}

/** Breadcrumb when MainGraph is drilled into a macro area (label + optional route id). */
export function buildMainGraphMacroAreaBreadcrumbSegments(
  macroAreaLabel: string,
  macroAreaId: string | undefined
): MapBreadcrumbSegment[] {
  const root: MapBreadcrumbSegment = {
    label: "Map of knowledge",
    link: { kind: "map" },
  };
  if (macroAreaId) {
    return [
      root,
      {
        label: macroAreaLabel,
        link: { kind: "macroarea", macroAreaId },
      },
    ];
  }
  return [root, { label: macroAreaLabel }];
}

/** Full path for `<a href>` / window navigation when needed outside Router. */
export function mapBreadcrumbHref(target: MapBreadcrumbLinkTarget): string {
  switch (target.kind) {
    case "map":
      return "/map";
    case "macroarea":
      return `/map/macroarea/${enc(target.macroAreaId)}`;
    case "macrotopic":
      return `/map/macrotopic/${enc(target.macrotopicId)}`;
    case "topic":
      return `/map/topic/${enc(target.topicId)}`;
    case "subtopic":
      return `/map/subtopic/${enc(target.subtopicId)}`;
    default:
      return "/map";
  }
}
