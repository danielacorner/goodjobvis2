import NOC_DATA from "./assets/NOC-data";
import { NOC_NODES } from "./assets/NOC-node";

export type NOCDataType = typeof NOC_DATA[0];

export type GraphNodeType = typeof NOC_NODES[0];
console.log("🌟🚨 ~ NOC_NODES[0]", NOC_NODES[0]);

export type GraphDataType = {
  nodes: GraphNodeType[];
  links: [];
};
