import { useCallback, useRef, useState } from "react";
import * as d3 from "d3";

/** Matches MainGraph zoom range for consistent +/- and wheel behaviour. */
const ZOOM_SCALE_EXTENT: [number, number] = [0.1, 8];

export function useZoomPan() {
  const zoomRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);
  const svgSelectionRef = useRef<
    d3.Selection<SVGSVGElement, unknown, null, undefined> | null
  >(null);
  const [scale, setScale] = useState(1);

  const attach = useCallback(
    (
      svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
      g: d3.Selection<SVGGElement, unknown, null, undefined>
    ) => {
      const zoom = d3
        .zoom<SVGSVGElement, unknown>()
        .scaleExtent(ZOOM_SCALE_EXTENT)
        .on("zoom", (event) => {
          g.attr("transform", event.transform);
          setScale(event.transform.k);
        });

      zoomRef.current = zoom;
      svgSelectionRef.current = svg;
      svg.call(zoom as any);
      setScale(1);
    },
    []
  );

  const zoomIn = useCallback((reducedMotion: boolean) => {
    if (!zoomRef.current || !svgSelectionRef.current) return;
    if (reducedMotion) {
      svgSelectionRef.current.call(zoomRef.current.scaleBy, 1.2);
      return;
    }
    svgSelectionRef.current
      .transition()
      .duration(250)
      .call(zoomRef.current.scaleBy, 1.2);
  }, []);

  const zoomOut = useCallback((reducedMotion: boolean) => {
    if (!zoomRef.current || !svgSelectionRef.current) return;
    if (reducedMotion) {
      svgSelectionRef.current.call(zoomRef.current.scaleBy, 0.8);
      return;
    }
    svgSelectionRef.current
      .transition()
      .duration(250)
      .call(zoomRef.current.scaleBy, 0.8);
  }, []);

  return { attach, zoomIn, zoomOut, zoomPercent: Math.round(scale * 100) };
}
