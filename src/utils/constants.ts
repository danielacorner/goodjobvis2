import { EffectCallback, useEffect, useState } from "react";
import colors from "nice-color-palettes";
export const WIDTH_SEGMENTS = 26;
export const DISABLE_SELECTION_OF_TEXT_CSS = `
/* Disable selection of text */
  -webkit-user-select: none; /* Chrome all / Safari all */
  -moz-user-select: none; /* Firefox all */
  -ms-user-select: none; /* IE 10+ */
  user-select: none;
`;

export function useMount(cb: EffectCallback) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useEffect(cb, []);
}

export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useMount(() => {
    setMounted(true);
  });
  return mounted;
}
export const MAX_NUM_IMAGES_TO_DISPLAY = 500;
export const FULL_WIDTH = 0.5;
export const PADDING = 0.08;
export const NODE_RADIUS = 0.12;
export const NODE_RADIUS_COLLISION_MULTIPLIER = 1.2;
const d3SchemeCategory10 = [
  "#1f77b4",
  "#ff7f0e",
  "#2ca02c",
  "#d62728",
  "#9467bd",
  "#8c564b",
  "#e377c2",
  "#7f7f7f",
  "#bcbd22",
  "#17becf",
];
const palette = d3SchemeCategory10;
export const CLUSTER_COLORS = {
  "1": palette[0],
  "2": palette[1],
  "3": palette[2],
  "4": palette[3],
  "5": palette[4],
  "6": palette[5],
  "7": palette[6],
  "8": palette[7],
  "9": palette[8],
  "10": palette[9],
};
