import { useState, type CSSProperties } from "react";
import ZoomInMagnifierIcon from "#/components/Icons/ZoomInMagnifierIcon";
import ZoomOutMagnifierIcon from "#/components/Icons/ZoomOutMagnifierIcon";
import { useTheme } from "#/lib/ThemeContext";
import {
  getOverlayTokens,
  PILL_BORDER_RADIUS,
  type OverlayTheme,
} from "./overlayTokens";

// ! DO NOT TOUCH THIS COMPONENT

interface ZoomControlsPillProps {
  zoomPercent: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  theme?: OverlayTheme;
  style?: CSSProperties;
}

const iconButtonStyle = (
  tokens: ReturnType<typeof getOverlayTokens>,
  isHovered: boolean
): CSSProperties => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "36px",
  height: "32px",
  padding: 0,
  border: "none",
  background: isHovered ? tokens.hoverSurface : "transparent",
  cursor: "pointer",
  borderRadius: PILL_BORDER_RADIUS,
  transition: "background-color 0.15s ease, opacity 0.15s ease",
});

export const ZoomControlsPill = ({
  zoomPercent,
  onZoomIn,
  onZoomOut,
  theme: themeProp,
  style,
}: ZoomControlsPillProps) => {
  const { theme: contextTheme } = useTheme();
  const theme = themeProp ?? contextTheme;
  const tokens = getOverlayTokens(theme);
  const [hoveredButton, setHoveredButton] = useState<"out" | "in" | null>(null);

  return (
    <div
      aria-label="Zoom controls"
      style={{
        position: "absolute",
        left: "16px",
        bottom: "16px",
        zIndex: 1000,
        display: "inline-flex",
        alignItems: "center",
        borderRadius: PILL_BORDER_RADIUS,
        border: `1px solid ${tokens.border}`,
        backgroundColor: tokens.surface,
        boxShadow: tokens.shadow,
        ...style,
      }}
    >
      <button
        type="button"
        aria-label="Zoom out"
        onClick={onZoomOut}
        onMouseEnter={() => setHoveredButton("out")}
        onMouseLeave={() => setHoveredButton(null)}
        style={iconButtonStyle(tokens, hoveredButton === "out")}
      >
        <ZoomOutMagnifierIcon size={16} color={tokens.textPrimary} />
      </button>

      <div
        aria-hidden
        style={{
          width: "1px",
          height: "20px",
          backgroundColor: tokens.divider,
        }}
      />

      <span
        style={{
          minWidth: "48px",
          padding: "0 4px",
          textAlign: "center",
          fontSize: "12px",
          fontWeight: 500,
          color: tokens.textPrimary,
          userSelect: "none",
        }}
      >
        {zoomPercent}%
      </span>

      <div
        aria-hidden
        style={{
          width: "1px",
          height: "20px",
          backgroundColor: tokens.divider,
        }}
      />

      <button
        type="button"
        aria-label="Zoom in"
        onClick={onZoomIn}
        onMouseEnter={() => setHoveredButton("in")}
        onMouseLeave={() => setHoveredButton(null)}
        style={iconButtonStyle(tokens, hoveredButton === "in")}
      >
        <ZoomInMagnifierIcon size={16} color={tokens.textPrimary} />
      </button>
    </div>
  );
};
