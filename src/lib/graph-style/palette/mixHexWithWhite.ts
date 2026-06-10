/**
 * Linear RGB blend toward white. `whiteFraction` 0 = base colour, 1 = pure white.
 * Use high values (e.g. 0.86–0.92) for very light pastels.
 */
export function mixHexWithWhite(hex: string, whiteFraction: number): string {
  const t = Math.min(1, Math.max(0, whiteFraction));
  const normalized = hex.trim().replace(/^#/, "");
  if (normalized.length !== 6) return "#f5f5f5";

  const r0 = parseInt(normalized.slice(0, 2), 16);
  const g0 = parseInt(normalized.slice(2, 4), 16);
  const b0 = parseInt(normalized.slice(4, 6), 16);
  if ([r0, g0, b0].some((n) => Number.isNaN(n))) return "#f5f5f5";

  const r = Math.round(r0 * (1 - t) + 255 * t);
  const g = Math.round(g0 * (1 - t) + 255 * t);
  const b = Math.round(b0 * (1 - t) + 255 * t);

  const toHex = (n: number) => n.toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
