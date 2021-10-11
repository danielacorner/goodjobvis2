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
};

export type GraphDataType = {
  nodes: GraphNodeType[];
  links: [];
};
