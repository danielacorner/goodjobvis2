import { ReactNode } from "react";
import NOC_DATA from "../assets/NOC-data";
import { NOC_NODES } from "../assets/NOC-node";

export type NOCDataType = typeof NOC_DATA[0];

export type GraphNodeType = typeof NOC_NODES[0] & {
  color: string;
  scale: number;
};
export type StoryStepType = {
  graphType: "3dPile" | "force" | "2dScatter";
  graphData: GraphDataType;
  text?: string | JSX.Element | (() => JSX.Element);
  xKey?: keyof NOCDataType | "VARIABLE";
  yKey?: keyof NOCDataType | "VARIABLE";
  // https://www.chartjs.org/docs/latest/axes/
  xScaleType?: "linear" | "logarithmic" | "time";
  yScaleType?: "linear" | "logarithmic" | "time";
  stepName?: StepNames;
  nextStepOptions?: StepNames[];
};
export type StepNames = "Step1" | "Step2";
export type GraphDataType = {
  nodes: GraphNodeType[];
  links: [];
};
