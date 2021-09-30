import { GraphDataType } from "./types";
import { NOC_NODES } from "./assets/NOC-node";

// the story
export const STORY_STEPS: { graphData: GraphDataType }[] = [
  {
    graphData: {
      nodes: NOC_NODES,
      links: [],
    },
  },
  { graphData: { nodes: [NOC_NODES[0]], links: [] } },
];
