import { type CSSProperties, type PropsWithChildren, type ReactNode } from "react";
import { useTheme } from "#/lib/ThemeContext";
import type { MapBreadcrumbSegment } from "#/features/map-data/mapBreadcrumbSegments";
import { BackButtonPill } from "../overlays/BackButtonPill";
import { KnowledgeMapBreadcrumb } from "../overlays/Breadcrumb";
import { ZoomControlsPill } from "../overlays/ZoomControlsPill";

const mapViewportStyle: CSSProperties = {
  position: "relative",
  width: "100%",
  height: "100%",
  minWidth: 0,
  minHeight: 0,
  overflow: "hidden",
};

const centeredViewportStyle: CSSProperties = {
  ...mapViewportStyle,
  display: "grid",
  placeItems: "center",
};

type Props = PropsWithChildren<{
  loading?: boolean;
  error?: string | null;
  backTo: string;
  backLabel?: string;
  breadcrumbSegments: MapBreadcrumbSegment[];
  zoomPercent: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  toolbar?: ReactNode;
}>;

export function MapGraphShell({
  loading,
  error,
  backTo,
  backLabel,
  breadcrumbSegments,
  zoomPercent,
  onZoomIn,
  onZoomOut,
  toolbar,
  children,
}: Props) {
  const { theme } = useTheme();

  if (loading) {
    return <div style={centeredViewportStyle}>Loading...</div>;
  }

  if (error) {
    return <div style={centeredViewportStyle}>{error}</div>;
  }

  return (
    <div style={mapViewportStyle}>
      {children}

      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          gap: "12px",
          maxWidth: "calc(100% - 40px)",
        }}
      >
        <BackButtonPill to={backTo} label={backLabel} theme={theme} />
        <KnowledgeMapBreadcrumb segments={breadcrumbSegments} theme={theme} />
      </div>

      {toolbar && (
        <div
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            zIndex: 1000,
          }}
        >
          {toolbar}
        </div>
      )}

      <ZoomControlsPill
        zoomPercent={zoomPercent}
        onZoomIn={onZoomIn}
        onZoomOut={onZoomOut}
        theme={theme}
      />
    </div>
  );
}
