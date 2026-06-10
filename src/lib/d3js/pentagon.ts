export default function pentagonPath(size: number, rotation = -Math.PI / 2) {
  const angle = (Math.PI * 2) / 5;
  const points = [];

  for (let i = 0; i < 5; i++) {
    const x = size * Math.cos(i * angle + rotation);
    const y = size * Math.sin(i * angle + rotation);
    points.push({ x, y });
  }

  const cornerRadius = size * 0.2;
  const incomingPoints = [];
  const outgoingPoints = [];

  for (let i = 0; i < points.length; i++) {
    const prev = points[(i + points.length - 1) % points.length];
    const curr = points[i];
    const next = points[(i + 1) % points.length];

    const toPrevX = prev.x - curr.x;
    const toPrevY = prev.y - curr.y;
    const toPrevLen = Math.hypot(toPrevX, toPrevY) || 1;

    const toNextX = next.x - curr.x;
    const toNextY = next.y - curr.y;
    const toNextLen = Math.hypot(toNextX, toNextY) || 1;

    incomingPoints.push({
      x: curr.x + (toPrevX / toPrevLen) * cornerRadius,
      y: curr.y + (toPrevY / toPrevLen) * cornerRadius,
    });
    outgoingPoints.push({
      x: curr.x + (toNextX / toNextLen) * cornerRadius,
      y: curr.y + (toNextY / toNextLen) * cornerRadius,
    });
  }

  let path = `M${outgoingPoints[0].x},${outgoingPoints[0].y}`;
  for (let i = 1; i < points.length; i++) {
    path += `L${incomingPoints[i].x},${incomingPoints[i].y}`;
    path += `Q${points[i].x},${points[i].y} ${outgoingPoints[i].x},${outgoingPoints[i].y}`;
  }

  path += `L${incomingPoints[0].x},${incomingPoints[0].y}`;
  path += `Q${points[0].x},${points[0].y} ${outgoingPoints[0].x},${outgoingPoints[0].y}Z`;

  return path;
}
