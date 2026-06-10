import { useEffect, useRef } from "react";
import * as d3 from "d3";
import getNodeTilt from "#/lib/d3js/getNodeTilt";
import { addCenterGroupBadge, addWrappedLabelWithBackground } from "#/lib/d3js/nodeLabels";
import { formatKnowledgeGroupLabel } from "#/features/map-data/groupDisplayLabels";
import pentagonPath from "#/lib/d3js/pentagon";
import { createRadialSimulation } from "../graphs/primitives/useRadialSimulation";
import type { LevelConfig, NodeShape } from "../levels/types";
import { resolveNodeStyle } from "#/lib/graph-style/resolveNodeStyle";
import { toNodeLineage } from "#/lib/graph-style/toNodeLineage";
import { inheritLineageFromCenter, mergeOrbitalChildWithCenter } from "#/lib/graph-style/inheritLineage";
import type { KnowledgeNodeView } from "#/features/map-data/types";
import type { GraphLink, QnaNode } from "#/lib/types/graph.types";

type ZoomAttach = (
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  g: d3.Selection<SVGGElement, unknown, null, undefined>,
) => void;

function drawNodeShape(
  target: d3.Selection<SVGGElement, unknown, null, undefined>,
  shape: NodeShape,
  radius: number,
  fill: string,
  tilt = 0,
  strokeOpts?: { stroke: string; strokeWidth: number },
) {
  const stroke = strokeOpts?.stroke ?? "none";
  const strokeWidth = stroke === "none" || !strokeOpts ? 0 : strokeOpts.strokeWidth;

  if (shape === "pentagon") {
    target
      .append("path")
      .attr("d", pentagonPath(radius, -Math.PI / 2 + tilt))
      .attr("fill", fill)
      .attr("stroke", stroke)
      .attr("stroke-width", strokeWidth);
  } else if (shape === "rounded-square") {
    const size = radius * 2;
    target
      .append("rect")
      .attr("x", -radius)
      .attr("y", -radius)
      .attr("width", size)
      .attr("height", size)
      .attr("rx", Math.max(8, radius * 0.28))
      .attr("ry", Math.max(8, radius * 0.28))
      .attr("fill", fill)
      .attr("stroke", stroke)
      .attr("stroke-width", strokeWidth);
  } else {
    target
      .append("circle")
      .attr("r", radius)
      .attr("fill", fill)
      .attr("stroke", stroke)
      .attr("stroke-width", strokeWidth);
  }
}

export type UseRadialGraphParams = {
  enabled?: boolean;
  svgRef: React.RefObject<SVGSVGElement | null>;
  attach: ZoomAttach;
  centerNode: KnowledgeNodeView | undefined;
  nodes: KnowledgeNodeView[] | QnaNode[];
  links?: GraphLink[];
  levelConfig: LevelConfig;
  onNodeClick: (id: string, node?: QnaNode) => void;
  showLinks?: boolean;
};

export function useRadialGraph({
  enabled = true,
  svgRef,
  attach,
  centerNode,
  nodes,
  links = [],
  levelConfig,
  onNodeClick,
  showLinks = true,
}: UseRadialGraphParams) {
  const onNodeClickRef = useRef(onNodeClick);

  useEffect(() => {
    onNodeClickRef.current = onNodeClick;
  }, [onNodeClick]);

  useEffect(() => {
    if (!enabled || !svgRef.current || !centerNode) return;

    const { graphKind, styleConfig, layout, centerShape, childShape, qnaMode } = levelConfig;
    const width = 1200;
    const height = 800;
    const centerX = width / 2;
    const centerY = height / 2;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height]);

    svg.selectAll("*").remove();
    const g = svg.append("g");

    const childNodes = qnaMode ? (nodes as QnaNode[]) : (nodes as KnowledgeNodeView[]);

    const simulation = createRadialSimulation(childNodes as any, centerX, centerY, {
      radialRadius: layout.radialRadius ?? 280,
      radialStrength: 0.8,
      collideRadius: layout.collideRadius ?? 65,
      chargeStrength: layout.chargeStrength ?? -70,
    });

    const linksData = qnaMode
      ? links
      : (childNodes as KnowledgeNodeView[]).map((node) => ({
          source: centerNode.id,
          target: node.id,
        }));

    const centerD3 = { ...centerNode, x: centerX, y: centerY };
    const nodeById = new Map(childNodes.map((n: any) => [n.id, n]));

    const linkSelection = g
      .selectAll(".link")
      .data(linksData)
      .join("line")
      .attr("class", "link")
      .attr("stroke", "#000000")
      .attr("stroke-opacity", showLinks ? 0.6 : 0)
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "4 4");

    const nodeGroups = g
      .selectAll<SVGGElement, any>(".node")
      .data(childNodes)
      .join("g")
      .attr("class", "node")
      .style("cursor", "pointer")
      .on("click", (_event, d) => {
        if (qnaMode) {
          onNodeClickRef.current(d.id, d as QnaNode);
        } else {
          onNodeClickRef.current(d.id);
        }
      });

    if (qnaMode) {
      nodeGroups
        .attr("role", "button")
        .attr("tabindex", 0)
        .on("keydown", (event, d) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onNodeClickRef.current(d.id, d as QnaNode);
          }
        });
    }

    const center = g
      .append("g")
      .attr("transform", `translate(${centerX}, ${centerY})`)
      .attr(
        "aria-label",
        `${formatKnowledgeGroupLabel(centerNode.group)}: ${centerNode.label}`,
      );

    const centerRadius = layout.centerRadius ?? 95;
    const centerStyle = resolveNodeStyle(
      graphKind,
      "center",
      toNodeLineage(centerNode),
      styleConfig,
    );

    drawNodeShape(
      center as d3.Selection<SVGGElement, unknown, null, undefined>,
      centerShape,
      centerRadius,
      centerStyle.fill,
      getNodeTilt(String(centerNode.id || centerNode.label || "center")),
      { stroke: centerStyle.stroke, strokeWidth: centerStyle.strokeWidth },
    );

    addCenterGroupBadge(center as any, formatKnowledgeGroupLabel(centerNode.group), {
      nodeRadius: centerRadius,
    });

    addWrappedLabelWithBackground(center as any, {
      label: centerNode.label,
      maxWidth: qnaMode ? 100 : 120,
      textColor: centerStyle.text.fill,
    });

    nodeGroups.each(function (d: any) {
      const node = d3.select(this);

      if (qnaMode) {
        const radius = layout.childRadius ?? 20;
        const qnaStyle = resolveNodeStyle(
          graphKind,
          "child",
          mergeOrbitalChildWithCenter(d, centerNode as any),
          styleConfig,
        );
        node
          .attr("aria-label", d.question ?? d.label)
          .append("circle")
          .attr("r", radius)
          .attr("fill", qnaStyle.fill)
          .attr("stroke", qnaStyle.stroke)
          .attr("stroke-width", qnaStyle.strokeWidth);
        return;
      }

      const radius = layout.childRadius ?? 90;
      const lineage = inheritLineageFromCenter(d, centerNode);
      const childStyle = resolveNodeStyle(graphKind, "child", lineage, styleConfig);

      drawNodeShape(
        node as d3.Selection<SVGGElement, unknown, null, undefined>,
        childShape,
        radius,
        childStyle.fill,
        getNodeTilt(String(d.id || d.label || "child")),
        { stroke: childStyle.stroke, strokeWidth: childStyle.strokeWidth },
      );

      addWrappedLabelWithBackground(node as any, {
        label: d.label,
        maxWidth: 95,
        textColor: childStyle.text.fill,
      });
    });

    simulation.on("tick", () => {
      nodeGroups.attr("transform", (d: any) => `translate(${d.x}, ${d.y})`);

      if (qnaMode) {
        linkSelection
          .attr("x1", (d: any) => {
            const s = typeof d.source === "object" ? d.source : nodeById.get(d.source);
            return s?.x ?? centerX;
          })
          .attr("y1", (d: any) => {
            const s = typeof d.source === "object" ? d.source : nodeById.get(d.source);
            return s?.y ?? centerY;
          })
          .attr("x2", (d: any) => {
            const t = typeof d.target === "object" ? d.target : nodeById.get(d.target);
            return t?.x ?? centerX;
          })
          .attr("y2", (d: any) => {
            const t = typeof d.target === "object" ? d.target : nodeById.get(d.target);
            return t?.y ?? centerY;
          });
      } else {
        linkSelection
          .attr("x1", () => centerD3.x)
          .attr("y1", () => centerD3.y)
          .attr("x2", (d: any) => nodeById.get(d.target)?.x ?? centerX)
          .attr("y2", (d: any) => nodeById.get(d.target)?.y ?? centerY);
      }
    });

    attach(svg as any, g as any);

    return () => {
      simulation.stop();
    };
  }, [
    enabled,
    attach,
    centerNode,
    nodes,
    links,
    levelConfig,
    onNodeClick,
    showLinks,
    svgRef,
  ]);
}
