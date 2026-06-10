import { useCallback, useRef, useState, type ReactNode } from "react";
import type { MapGraphViewModel } from "#/features/map-data/viewModels/types";
import type { KnowledgeNodeView } from "#/features/map-data/types";
import type { GraphNode, QnaNode } from "#/lib/types/graph.types";
import { getLevelConfig } from "./levels";
import type { MainLevelConfig } from "./levels/types";
import { MapGraphShell } from "./shell/MapGraphShell";
import { useZoomPan } from "./graphs/primitives/useZoomPan";
import { useRadialGraph } from "./renderers/useRadialGraph";
import { useForceGraph } from "./renderers/useForceGraph";
import { HoverTooltip } from "./overlays/HoverTooltip";
import { useTheme } from "#/lib/ThemeContext";

export type KnowledgeMapGraphProps = {
  viewModel: MapGraphViewModel;
  loading?: boolean;
  error?: string | null;
  onNodeClick: (id: string, node?: QnaNode) => void;
  onMacroAreaClick?: (macroAreaId: string) => void;
  toolbar?: ReactNode;
  showLinks?: boolean;
  reducedMotion?: boolean;
};

export function KnowledgeMapGraph({
  viewModel,
  loading = false,
  error = null,
  onNodeClick,
  onMacroAreaClick,
  toolbar,
  showLinks = true,
  reducedMotion = false,
}: KnowledgeMapGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { attach, zoomIn, zoomOut, zoomPercent } = useZoomPan();
  const { theme } = useTheme();
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const levelConfig = getLevelConfig(viewModel.level);
  const isMain = viewModel.level === "main";

  const handleForceHover = useCallback(
    (label: string | null, position: { x: number; y: number } | null) => {
      setHoveredNode((prev) => (prev === label ? prev : label));
      if (position) setMousePosition(position);
    },
    [],
  );

  useRadialGraph({
    enabled: !isMain && !!viewModel.centerNode,
    svgRef,
    attach,
    centerNode: viewModel.centerNode,
    nodes: (viewModel.nodes ?? []) as KnowledgeNodeView[] | QnaNode[],
    links: viewModel.links,
    levelConfig,
    onNodeClick,
    showLinks,
  });

  useForceGraph({
    enabled: isMain,
    containerRef,
    attach,
    nodes: (viewModel.nodes ?? []) as GraphNode[],
    links: viewModel.links ?? [],
    levelConfig: levelConfig as MainLevelConfig,
    onMacroAreaClick,
    onSubtopicClick: (id) => onNodeClick(id),
    showLinks,
    reducedMotion,
    onHover: handleForceHover,
  });

  return (
    <MapGraphShell
      loading={loading}
      error={error}
      backTo={viewModel.backTo}
      breadcrumbSegments={viewModel.breadcrumbSegments}
      zoomPercent={zoomPercent}
      onZoomIn={() => zoomIn(reducedMotion)}
      onZoomOut={() => zoomOut(reducedMotion)}
      toolbar={toolbar}
    >
      {isMain ? (
        <>
          {hoveredNode && (
            <HoverTooltip
              text={hoveredNode}
              position={mousePosition}
              theme={theme}
            />
          )}
          <div
            ref={containerRef}
            style={{ width: "100%", height: "100%", overflow: "hidden" }}
          />
        </>
      ) : (
        <svg
          ref={svgRef}
          role="img"
          style={{ display: "block", width: "100%", height: "100%" }}
        />
      )}
    </MapGraphShell>
  );
}
