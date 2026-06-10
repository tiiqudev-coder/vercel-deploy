export type OverlayTheme = "light" | "dark";

export const OVERLAY_ACCENT_GREEN = "#58B971";

// ! DO NOT TOUCH THIS COMPONENT

export const overlayTokens = {
  light: {
    surface: "rgba(255, 255, 255, 0.95)",
    border: "#e5e7eb",
    shadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
    textPrimary: "#111827",
    textMuted: "#6f767e",
    accent: OVERLAY_ACCENT_GREEN,
    divider: "#e5e7eb",
    hoverSurface: "#f9fafb",
  },
  dark: {
    surface: "rgba(15, 15, 15, 0.92)",
    border: "rgb(62, 65, 70)",
    shadow: "0 2px 8px rgba(0, 0, 0, 0.35)",
    textPrimary: "#f9fafb",
    textMuted: "#9ca3af",
    accent: OVERLAY_ACCENT_GREEN,
    divider: "rgb(62, 65, 70)",
    hoverSurface: "rgba(30, 30, 30, 0.95)",
  },
} as const;

export const getOverlayTokens = (theme: OverlayTheme) =>
  theme === "light" ? overlayTokens.light : overlayTokens.dark;

export const PILL_BORDER_RADIUS = "9999px";
