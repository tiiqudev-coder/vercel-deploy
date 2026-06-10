// ! DO NOT TOUCH THIS COMPONENT

import { Link } from "@tanstack/react-router";
import { useState, type CSSProperties } from "react";
import ChevronRightIcon from "#/components/Icons/ChevronRightIcon";
import type {
  MapBreadcrumbLinkTarget,
  MapBreadcrumbSegment,
} from "#/features/map-data/mapBreadcrumbSegments";
import {
  getOverlayTokens,
  type OverlayTheme,
} from "./overlayTokens";

type KnowledgeMapBreadcrumbProps = {
  segments: MapBreadcrumbSegment[];
  theme?: OverlayTheme;
  className?: string;
  style?: CSSProperties;
};

type BreadcrumbLinkProps = {
  target: MapBreadcrumbLinkTarget;
  children: React.ReactNode;
  color: string;
};

const BreadcrumbLink = ({ target, children, color }: BreadcrumbLinkProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const linkStyle: CSSProperties = {
    color,
    textDecoration: isHovered ? "underline" : "none",
    textUnderlineOffset: "2px",
    cursor: "pointer",
  };

  switch (target.kind) {
    case "map":
      return (
        <Link
          to="/map"
          style={linkStyle}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {children}
        </Link>
      );
    case "macroarea":
      return (
        <Link
          to="/map/macroarea/$macroAreaId"
          params={{ macroAreaId: target.macroAreaId }}
          style={linkStyle}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {children}
        </Link>
      );
    case "macrotopic":
      return (
        <Link
          to="/map/macrotopic/$macrotopicId"
          params={{ macrotopicId: target.macrotopicId }}
          style={linkStyle}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {children}
        </Link>
      );
    case "topic":
      return (
        <Link
          to="/map/topic/$topicId"
          params={{ topicId: target.topicId }}
          style={linkStyle}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {children}
        </Link>
      );
    case "subtopic":
      return (
        <Link
          to="/map/subtopic/$subtopicId"
          params={{ subtopicId: target.subtopicId }}
          style={linkStyle}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {children}
        </Link>
      );
    default:
      return <>{children}</>;
  }
};

export const KnowledgeMapBreadcrumb = ({
  segments,
  theme = "light",
  className,
  style,
}: KnowledgeMapBreadcrumbProps) => {
  const tokens = getOverlayTokens(theme);

  return (
    <nav
      className={className}
      aria-label="Knowledge map"
      aria-live="polite"
      style={{
        display: "flex",
        alignItems: "center",
        flexWrap: "nowrap",
        gap: "6px",
        fontSize: "13px",
        fontWeight: 400,
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      {segments.map((seg, i) => (
        <span
          key={`${seg.label}-${i}`}
          style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
        >
          {i > 0 && (
            <ChevronRightIcon size={10} color={tokens.textMuted} />
          )}
          {seg.link ? (
            <BreadcrumbLink target={seg.link} color={tokens.textMuted}>
              {seg.label}
            </BreadcrumbLink>
          ) : (
            <span
              style={{
                color: tokens.accent,
                textDecoration: "underline",
                textUnderlineOffset: "2px",
              }}
            >
              {seg.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
};
