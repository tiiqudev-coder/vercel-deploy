import categoryPalette from "#/lib/d3js/categoryPalette";
import {
  FALLBACK_GRAY,
  MACRO_AREA_COLORS,
  NEUTRAL_LIGHT_GRAY,
} from "#/lib/graph-style/palette/macroAreaColors";
import type { NodeLineage, PaletteTier } from "#/lib/graph-style/types";

type PaletteMap = Record<string, Record<string, Record<string, string>>>;

const palette = categoryPalette as PaletteMap;

function findMacrotopicKey(
  macroAreaPalette: Record<string, Record<string, string>>,
  macrotopicName: string
): string | undefined {
  return Object.keys(macroAreaPalette).find(
    (key) => key.toLowerCase() === macrotopicName.toLowerCase()
  );
}

/**
 * Returns a single hex from the category palette or macroarea map.
 * QnA/Qna nodes always use the Subtopic column when resolving tiered colours.
 */
export function getCategoryPaletteColor(
  node: NodeLineage,
  tier: PaletteTier | "MacroArea"
): string {
  if (tier === "MacroArea") {
    if (node.group !== "MacroArea") return FALLBACK_GRAY;
    return MACRO_AREA_COLORS[node.label] ?? NEUTRAL_LIGHT_GRAY;
  }

  const macroArea = node.macroArea;
  const macrotopicName =
    node.group === "Macrotopic" ? node.label : node.macrotopic;

  if (!macroArea || !macrotopicName) {
    return FALLBACK_GRAY;
  }

  const macroAreaPalette = palette[macroArea];
  if (!macroAreaPalette) {
    return FALLBACK_GRAY;
  }

  const macrotopicKey = findMacrotopicKey(macroAreaPalette, macrotopicName);
  if (!macrotopicKey) {
    return FALLBACK_GRAY;
  }

  const isQna = node.group === "QnA" || node.group === "Qna";
  const column: PaletteTier = isQna ? "Subtopic" : tier;

  return macroAreaPalette[macrotopicKey]?.[column] ?? FALLBACK_GRAY;
}
