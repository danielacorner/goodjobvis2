import { EffectCallback, useEffect, useState } from "react";
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
  "rgba(31,119,180, 1)",
  "rgba(255,127,14, 1)",
  "rgba(44,160,44, 1)",
  "rgba(214,39,40, 1)",
  "rgba(148,103,189, 1)",
  "rgba(140,86,75, 1)",
  "rgba(227,119,194, 1)",
  "rgba(127,127,127, 1)",
  "rgba(188,189,34, 1)",
  "rgba(23,190,207, 1)",
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

export const colors = {
  appBackground: "#f5ffe1",
};
export const INDUSTRY_COLORS = {
  Management: d3SchemeCategory10[0],
  "Art, culture, recreation, sport": d3SchemeCategory10[1],
  "Trades, transport, equipment operators": d3SchemeCategory10[2],
  "Business, finance, administration": d3SchemeCategory10[3],
  "Education, law & social, community & government": d3SchemeCategory10[4],
  "Natural & applied sciences": d3SchemeCategory10[5],
  "Manufacturing & utilities": d3SchemeCategory10[6],
  Health: d3SchemeCategory10[7],
  "Sales and service": d3SchemeCategory10[8],
  "Natural resources, agriculture, production": d3SchemeCategory10[9],
};

export function removeKeys(object: any, keys: string[]) {
  return Object.keys(object)
    .filter((key) => !keys.includes(key))
    .reduce((acc, cur) => {
      acc[cur] = object[cur];
      return acc;
    }, {});
}
