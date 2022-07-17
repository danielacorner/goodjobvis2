import NOC_DATA from "../assets/NOC-data";
import { NOC_NODES, NOC_STATS } from "../assets/NOC-node";
export const NOC_STATS_TYPED = NOC_STATS as {
  [hey in keyof NOCDataType]: { min: number; max: number };
};

export type NOCDataType = typeof NOC_DATA[0];

export type GraphNodeType = typeof NOC_NODES[0] & {
  color: string;
  scale: number;
};
export type StoryStepType = {
  graphType:
    | "3dPile"
    | "react-force-graph"
    | "2dScatter"
    | "react-sigma"
    | "lotteryMachine";
  graphData?: GraphDataType;
  text?: string | JSX.Element | (() => JSX.Element);
  xKey?: keyof NOCDataType | "VARIABLE";
  yKey?: keyof NOCDataType | "VARIABLE";
  // https://www.chartjs.org/docs/latest/axes/
  xScaleType?: "linear" | "logarithmic" | "time";
  yScaleType?: "linear" | "logarithmic" | "time";
  id: string;
  nextStepOptions?: NextStepOption[];
};
export type NextStepOption = {
  stepPathName: StepPaths;
  // stepName: StepNames;
  description: string;
  icon: any;
};
export type StepPaths =
  | "chemistry"
  | "astronomer"
  | "engineer"
  | "computers"
  | "journalist"
  | "nurse";

export type GraphDataType = {
  nodes: GraphNodeType[];
  links: [];
};
