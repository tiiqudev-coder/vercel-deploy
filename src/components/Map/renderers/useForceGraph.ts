import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { ESG_MACROAREAS } from "#/lib/constants";
import type { ESGMacroArea } from "#/lib/constants";
import getNodeTilt from "#/lib/d3js/getNodeTilt";
import pentagonPath from "#/lib/d3js/pentagon";
import { addWrappedLabelWithBackground } from "#/lib/d3js/nodeLabels";
import { resolveNodeStyle } from "#/lib/graph-style/resolveNodeStyle";
import { toNodeLineage } from "#/lib/graph-style/toNodeLineage";
import type { MainLevelConfig } from "../levels/types";
import type { GraphLink, GraphNode, D3Node } from "#/lib/types/graph.types";

type ZoomAttach = (
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  g: d3.Selection<SVGGElement, unknown, null, undefined>,
) => void;

export type UseForceGraphParams = {
  enabled?: boolean;
  containerRef: React.RefObject<HTMLDivElement | null>;
  attach: ZoomAttach;
  nodes: GraphNode[];
  links: GraphLink[];
  levelConfig: MainLevelConfig;
  onMacroAreaClick?: (id: string) => void;
  onSubtopicClick?: (id: string) => void;
  showLinks?: boolean;
  reducedMotion?: boolean;
  onHover?: (label: string | null, position: { x: number; y: number } | null) => void;
};

function getNodeRadius(d: GraphNode) {
  switch (d.group) {
    case "MacroArea":
      return 100;
    case "Macrotopic":
      return 60;
    case "Topic":
      return 25;
    case "Subtopic":
      return 15;
    default:
      return 20;
  }
}

function filterOverviewNodes(nodes: GraphNode[]) {
  return nodes.filter(
    (n) =>
      n.group === "MacroArea" && ESG_MACROAREAS.includes(n.label as ESGMacroArea),
  );
}

export function useForceGraph({
  enabled = true,
  containerRef,
  attach,
  nodes,
  links,
  levelConfig,
  onMacroAreaClick,
  onSubtopicClick,
  showLinks = true,
  reducedMotion = false,
  onHover,
}: UseForceGraphParams) {
  const onMacroAreaClickRef = useRef(onMacroAreaClick);
  const onSubtopicClickRef = useRef(onSubtopicClick);
  const onHoverRef = useRef(onHover);
  const simulationRef = useRef<d3.Simulation<D3Node, undefined> | null>(null);

  useEffect(() => {
    onMacroAreaClickRef.current = onMacroAreaClick;
    onSubtopicClickRef.current = onSubtopicClick;
    onHoverRef.current = onHover;
  }, [onMacroAreaClick, onSubtopicClick, onHover]);

  useEffect(() => {
    if (!enabled || !containerRef.current) return;

    containerRef.current.innerHTML = "";
    simulationRef.current?.stop();

    const filteredNodes = filterOverviewNodes(nodes);
    if (filteredNodes.length === 0) return;

    const width = containerRef.current.clientWidth || window.innerWidth;
    const height = containerRef.current.clientHeight || window.innerHeight;

    const d3Nodes: D3Node[] = filteredNodes.map((d) => ({ ...d }));
    const nodeMap = new Map(d3Nodes.map((n) => [n.id, n]));

    const d3Links = links
      .map((d) => {
        const sourceId =
          typeof d.source === "object" ? (d.source as GraphNode).id : d.source;
        const targetId =
          typeof d.target === "object" ? (d.target as GraphNode).id : d.target;
        if (nodeMap.has(sourceId) && nodeMap.has(targetId)) {
          return { ...d, source: sourceId, target: targetId };
        }
        return null;
      })
      .filter(Boolean) as GraphLink[];

    const { forceLayout } = levelConfig;
    const styleConfig = levelConfig.styleConfig;

    const simulation = d3
      .forceSimulation(d3Nodes)
      .force(
        "link",
        d3
          .forceLink(d3Links)
          .id((d: any) => d.id)
          .distance(forceLayout.linkDistance)
          .strength(0.5),
      )
      .force("charge", d3.forceManyBody().strength(forceLayout.chargeStrength))
      .force("x", d3.forceX(0))
      .force("y", d3.forceY(0))
      .force(
        "collision",
        d3.forceCollide().radius((d: any) => getNodeRadius(d) + 5),
      );

    simulationRef.current = simulation;

    const svg = d3
      .create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .attr("style", "max-width: 100%; height: auto; display: block;");

    const g = svg.append("g");

    const link = g
      .append("g")
      .attr("class", "link-group")
      .attr("stroke", "#000000")
      .attr("stroke-opacity", showLinks ? 0.6 : 0)
      .attr("stroke-width", 1.5)
      .attr("stroke-dasharray", "4 4")
      .selectAll("line")
      .data(d3Links)
      .join("line");

    const drag = (sim: d3.Simulation<D3Node, undefined>) => {
      function dragstarted(event: d3.D3DragEvent<SVGGElement, D3Node, D3Node>, d: D3Node) {
        if (!reducedMotion && !event.active) sim.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }
      function dragged(event: d3.D3DragEvent<SVGGElement, D3Node, D3Node>, d: D3Node) {
        d.fx = event.x;
        d.fy = event.y;
      }
      function dragended(event: d3.D3DragEvent<SVGGElement, D3Node, D3Node>, d: D3Node) {
        if (!reducedMotion && !event.active) sim.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }
      return d3
        .drag<SVGGElement, D3Node>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
    };

    const isOverviewOnly = d3Nodes.every((n) => n.group === "MacroArea");

    const node = g
      .append("g")
      .selectAll<SVGGElement, D3Node>("g")
      .data(d3Nodes)
      .join("g")
      .style("cursor", "pointer");

    if (!isOverviewOnly) {
      node.call(drag(simulation));
    }

    node.each(function (d: GraphNode) {
      const nodeElement = d3.select(this);
      const style = resolveNodeStyle("main", "node", toNodeLineage(d), styleConfig);
      const radius = getNodeRadius(d);

      nodeElement.attr("aria-label", `${d.group}: ${d.label}`);

      if (d.group === "MacroArea") {
        nodeElement
          .append("circle")
          .attr("fill", style.fill)
          .attr("stroke", style.stroke)
          .attr("stroke-width", style.strokeWidth)
          .attr("r", radius);
        addWrappedLabelWithBackground(nodeElement, {
          label: d.label || d.id || "",
          maxWidth: radius,
          textColor: style.text.fill,
        });
      } else if (d.group === "Macrotopic") {
        const cardSize = 120;
        nodeElement
          .append("rect")
          .attr("fill", style.fill)
          .attr("width", cardSize)
          .attr("height", cardSize)
          .attr("x", -cardSize / 2)
          .attr("y", -cardSize / 2)
          .attr("rx", 8)
          .attr("ry", 8)
          .attr("cursor", "pointer")
          .attr("stroke-width", style.strokeWidth)
          .attr("stroke", style.stroke);
        addWrappedLabelWithBackground(nodeElement, {
          label: d.label || d.id || "",
          maxWidth: cardSize - 20,
          textColor: style.text.fill,
        });
      } else if (d.group === "Topic") {
        nodeElement
          .append("circle")
          .attr("fill", style.fill)
          .attr("r", radius)
          .attr("cursor", "pointer")
          .attr("stroke-width", style.strokeWidth)
          .attr("stroke", style.stroke);
      } else {
        const tilt = getNodeTilt(String(d.id || d.label || ""));
        nodeElement
          .append("path")
          .attr("fill", style.fill)
          .attr("d", pentagonPath(radius, -Math.PI / 2 + tilt))
          .attr("cursor", "pointer")
          .attr("stroke-width", style.strokeWidth)
          .attr("stroke", style.stroke);
      }
    });

    node
      .on("mouseover", (event, d) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
          onHoverRef.current?.(d.label, {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
          });
        }
      })
      .on("mousemove", (event, d) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
          onHoverRef.current?.(d.label, {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
          });
        }
      })
      .on("mouseout", () => onHoverRef.current?.(null, null))
      .on("click", (event, d) => {
        if (d.group === "MacroArea") {
          event.stopPropagation();
          onMacroAreaClickRef.current?.(d.id);
          return;
        }
        if (d.group === "Subtopic") {
          event.stopPropagation();
          onSubtopicClickRef.current?.(d.id);
        }
      });

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);
      node.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

    const duration = reducedMotion ? 4000 : 8000;
    setTimeout(() => simulation.stop(), duration);

    attach(svg as any, g as any);
    containerRef.current.appendChild(svg.node()!);

    return () => {
      simulation.stop();
    };
  }, [enabled, attach, containerRef, levelConfig, nodes, links, reducedMotion, showLinks]);
}
