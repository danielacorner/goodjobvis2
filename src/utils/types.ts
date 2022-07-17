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
  graphType: "3dPile" | "react-force-graph" | "2dScatter" | "react-sigma";
  graphData: GraphDataType;
  text?: string | JSX.Element | (() => JSX.Element);
  xKey?: keyof NOCDataType | "VARIABLE";
  yKey?: keyof NOCDataType | "VARIABLE";
  // https://www.chartjs.org/docs/latest/axes/
  xScaleType?: "linear" | "logarithmic" | "time";
  yScaleType?: "linear" | "logarithmic" | "time";
  stepName: StepNames;
  nextStepOptions?: NextStepOption[];
};
export type NextStepOption = {
  stepName: StepNames;
  description: string;
  icon: any;
};
export type StepNames =
  | "step-1"
  | "step-2"
  | "step-3"
  | "step-4"
  | "step-5"
  | "step-6"
  | "step-7"
  | "step-8";
export type GraphDataType = {
  nodes: GraphNodeType[];
  links: [];
};
