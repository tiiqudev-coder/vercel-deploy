import * as d3 from "d3";

type SimNode = { x?: number; y?: number };

export type RadialSimulationConfig = {
  radialRadius: number;
  radialStrength: number;
  collideRadius: number;
  chargeStrength: number;
  alphaDecay?: number;
  velocityDecay?: number;
};

export function createRadialSimulation(
  nodes: SimNode[],
  centerX: number,
  centerY: number,
  config: RadialSimulationConfig,
) {
  return d3
    .forceSimulation(nodes as any)
    .force(
      "radial",
      d3.forceRadial(config.radialRadius, centerX, centerY).strength(config.radialStrength),
    )
    .force("collide", d3.forceCollide(config.collideRadius))
    .force("charge", d3.forceManyBody().strength(config.chargeStrength))
    .alphaDecay(config.alphaDecay ?? 0.02)
    .velocityDecay(config.velocityDecay ?? 0.3);
}
