export default function getNodeTilt(seed: string, spreadRadians = Math.PI / 2) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  const normalized = (hash % 1000) / 999;
  return -spreadRadians / 2 + normalized * spreadRadians;
}
