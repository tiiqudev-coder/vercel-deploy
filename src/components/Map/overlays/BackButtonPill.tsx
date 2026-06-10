import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import LeftArrowIcon from "#/components/Icons/LeftArrow";
import { useTheme } from "#/lib/ThemeContext";
import {
  getOverlayTokens,
  PILL_BORDER_RADIUS,
  type OverlayTheme,
} from "./overlayTokens";

interface BackButtonPillProps {
  to: string;
  label?: string;
  theme?: OverlayTheme;
}

// ! DO NOT TOUCH THIS COMPONENT

export const BackButtonPill = ({
  to,
  label = "Back",
  theme: themeProp,
}: BackButtonPillProps) => {
  const navigate = useNavigate();
  const { theme: contextTheme } = useTheme();
  const theme = themeProp ?? contextTheme;
  const tokens = getOverlayTokens(theme);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      type="button"
      aria-label="Back"
      onClick={() => navigate({ to })}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "8px 14px",
        borderRadius: PILL_BORDER_RADIUS,
        border: `1px solid ${tokens.border}`,
        backgroundColor: isHovered ? tokens.hoverSurface : tokens.surface,
        boxShadow: tokens.shadow,
        color: tokens.textPrimary,
        fontSize: "13px",
        fontWeight: 500,
        fontFamily: "inherit",
        cursor: "pointer",
        transition: "background-color 0.15s ease, border-color 0.15s ease",
      }}
    >
      <LeftArrowIcon size={16} style={{ color: tokens.textPrimary }} />
      {label}
    </button>
  );
};
