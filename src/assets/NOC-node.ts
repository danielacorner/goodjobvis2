import { interpolateRdGy, interpolateRdYlGn } from "d3-scale-chromatic";
import NOC_DATA from "./NOC-data";

export const AUTOMATIONRISKS = NOC_DATA.map((node) => node.automationRisk);

export const NOC_STATS = {
  automationRisk: {
    min: AUTOMATIONRISKS.reduce((acc, cur) => Math.min(acc, cur), Infinity),
    max: AUTOMATIONRISKS.reduce((acc, cur) => Math.max(acc, cur), -Infinity),
  },
};

export const NOC_NODES = NOC_DATA.map((node) => ({
  ...node,
  imageUrl: `/img/NOC_images/${node.noc}.jpg`,
  imageUrlThumbnail: `/img/NOC_Thumbnails/tn_${node.noc}.jpg`,
  color: getNodeColor(node),
  scale: 1,
}));

export function getNodeColor(node) {
  const pct = node.automationRisk / NOC_STATS.automationRisk.max;
  const col = interpolateRdYlGn(1 - pct);
  const rgb = col.slice(`rgb(`.length, -`)`.length).split(", ");
  const [r, g, b] = rgb.map(Number);
  const colHex = RGBToHex(r, g, b);
  return colHex;
}

function RGBToHex(r, g, b) {
  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);

  if (r.length === 1) r = "0" + r;
  if (g.length === 1) g = "0" + g;
  if (b.length === 1) b = "0" + b;

  return "#" + r + g + b;
}
