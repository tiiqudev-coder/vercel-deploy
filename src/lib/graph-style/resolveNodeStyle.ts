import { getCategoryPaletteColor } from "#/lib/graph-style/palette/getCategoryPaletteColor";
import { mixHexWithWhite } from "#/lib/graph-style/palette/mixHexWithWhite";
import { FALLBACK_GRAY } from "#/lib/graph-style/palette/macroAreaColors";
import type {
  GraphKind,
  GraphStyleConfig,
  NodeLineage,
  NodeRole,
  ResolvedNodeStyle,
} from "#/lib/graph-style/types";

export function resolveNodeStyle(
  graphKind: GraphKind,
  role: NodeRole,
  node: NodeLineage,
  config: GraphStyleConfig
): ResolvedNodeStyle {
  const ctx = { graphKind, role, node };
  const rule = config.rules.find((r) => r.match(ctx));

  if (!rule) {
    return {
      fill: config.defaults.fill,
      stroke: config.defaults.stroke,
      strokeWidth: config.defaults.strokeWidth,
      text: { fill: config.defaults.text.fill },
    };
  }

  const accent =
    rule.accentTier != null
      ? getCategoryPaletteColor(node, rule.accentTier)
      : null;

  let fill = config.defaults.fill;
  let stroke = config.defaults.stroke;
  const strokeWidth = rule.strokeWidth ?? config.defaults.strokeWidth;
  let textFill = config.defaults.text.fill;

  if (rule.fill === "white") fill = "#ffffff";
  else if (rule.fill === "palette" && accent) fill = accent;
  else if (rule.fill === "palettePastel") {
    const base = accent ?? FALLBACK_GRAY;
    fill = mixHexWithWhite(base, rule.pastelMix ?? 0.9);
  } else if (rule.fill === "macroAreaSolid" && node.group === "MacroArea") {
    fill = getCategoryPaletteColor(node, "MacroArea");
  } else if (rule.fill === "transparent") fill = "none";

  if (rule.stroke === "palette" && accent) stroke = accent;
  else if (rule.stroke === "none") stroke = "none";
  else if (rule.stroke === "sameAsFill") stroke = fill;

  if (rule.text === "palette" && accent) textFill = accent;
  else if (rule.text === "onFill") textFill = config.defaults.text.fill;

  const resolved: ResolvedNodeStyle = {
    fill,
    stroke,
    strokeWidth,
    text: { fill: textFill },
  };

  if (rule.fixed?.fill != null) resolved.fill = rule.fixed.fill;
  if (rule.fixed?.stroke != null) resolved.stroke = rule.fixed.stroke;
  if (rule.fixed?.text?.fill != null) resolved.text.fill = rule.fixed.text.fill;

  return resolved;
}
