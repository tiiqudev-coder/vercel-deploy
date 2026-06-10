// src/lib/graph/labels.ts
import type * as d3 from "d3";

interface LabelOptions {
    label: string;
    maxWidth: number;
    textColor?: string;
    fontSize?: number;
    fontFamily?: string;
    fontWeight?: number | string;
    lineHeight?: number;
    paddingX?: number;
    paddingY?: number;
    bgColor?: string;
    strokeColor?: string;
    strokeWidth?: number;
}

/**
 * Appends a multi-line text label centered on (0,0)
 * within the given node <g>.
 */
export function addWrappedLabelWithBackground<
    T extends d3.BaseType,
    D
>(
    nodeElement: d3.Selection<SVGGElement, D, T, unknown>,
    {
        label,
        maxWidth,
        textColor = "#ffffff",
        fontSize = 13,
        fontFamily = "sans-serif",
        fontWeight = 600,
        lineHeight = 16,
    }: LabelOptions
) {
    const words = label.split(/\s+/);
    const lines: string[] = [];
    let currentLine: string[] = [];

    const charWidth = 7; // rough estimate just for wrapping

    words.forEach((word) => {
        const testLine = currentLine.length
            ? currentLine.join(" ") + " " + word
            : word;
        const estimatedWidth = testLine.length * charWidth;

        if (estimatedWidth > maxWidth && currentLine.length) {
            lines.push(currentLine.join(" "));
            currentLine = [word];
        } else {
            currentLine.push(word);
        }
    });

    if (currentLine.length) lines.push(currentLine.join(" "));

    // Group to hold text
    const labelGroup = nodeElement
        .append("g")
        .attr("pointer-events", "none");

    const textElement = labelGroup
        .append("text")
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("fill", textColor)
        .attr("font-size", fontSize)
        .attr("font-weight", fontWeight)
        .attr("font-family", fontFamily);

    const startY = (-(lines.length - 1) * lineHeight) / 2;

    lines.forEach((line, i) => {
        textElement
            .append("tspan")
            .attr("x", 0)
            .attr("y", startY + i * lineHeight)
            .text(line);
    });

    return labelGroup;
}

export type CenterGroupBadgeOptions = {
    nodeRadius: number;
    /** Vertical offset from top of node toward center; larger = lower */
    insetFromTop?: number;
    fontSize?: number;
    fontFamily?: string;
    fontWeight?: number | string;
    textColor?: string;
    bgColor?: string;
    paddingX?: number;
    paddingY?: number;
    cornerRadius?: number;
};

/**
 * Small group tag at the top-inside of a centered node shape (circle, polygon, etc.).
 */
export function addCenterGroupBadge<
    T extends d3.BaseType,
    D,
>(
    nodeElement: d3.Selection<SVGGElement, D, T, unknown>,
    text: string,
    {
        nodeRadius,
        insetFromTop = 14,
        fontSize = 10,
        fontFamily = "sans-serif",
        fontWeight = 600,
        textColor = "#ffffff",
        bgColor = "rgba(0, 0, 0, 0.42)",
        paddingX = 6,
        paddingY = 3,
        cornerRadius = 4,
    }: CenterGroupBadgeOptions
) {
    const badge = nodeElement
        .append("g")
        .attr("class", "node-group-badge")
        .attr("pointer-events", "none")
        .attr("aria-hidden", "true")
        .attr("transform", `translate(0, ${-nodeRadius + insetFromTop})`);

    const textEl = badge
        .append("text")
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("fill", textColor)
        .attr("font-size", fontSize)
        .attr("font-weight", fontWeight)
        .attr("font-family", fontFamily)
        .text(text);

    const node = textEl.node() as SVGGraphicsElement | null;
    if (!node) return badge;

    const bb = node.getBBox();
    badge
        .insert("rect", "text")
        .attr("x", bb.x - paddingX)
        .attr("y", bb.y - paddingY)
        .attr("width", bb.width + paddingX * 2)
        .attr("height", bb.height + paddingY * 2)
        .attr("rx", cornerRadius)
        .attr("ry", cornerRadius)
        .attr("fill", bgColor);

    return badge;
}
