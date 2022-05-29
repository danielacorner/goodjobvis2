import { ReactNode } from "react";
import NOC_DATA from "../assets/NOC-data";
import { NOC_NODES } from "../assets/NOC-node";

export type NOCDataType = typeof NOC_DATA[0];

export type GraphNodeType = typeof NOC_NODES[0] & {
  color: string;
  scale: number;
};
export type StoryStepType = {
  graphData: GraphDataType;
  text?: string | ReactNode;
  xKey?: keyof NOCDataType;
  yKey?: keyof NOCDataType;
  // https://www.chartjs.org/docs/latest/axes/
  xScaleType?: "linear" | "logarithmic" | "time";
  yScaleType?: "linear" | "logarithmic" | "time";
};

export type GraphDataType = {
  nodes: GraphNodeType[];
  links: [];
};
