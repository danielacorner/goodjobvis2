import { StoryStepType } from "./types";
import { NOC_NODES } from "../assets/NOC-node";

// the story
export const STORY_STEPS: StoryStepType[] = [
  {
    graphData: {
      nodes: NOC_NODES,
      // nodes: NOC_NODES,
      links: [],
    },
  },
  { graphData: { nodes: [NOC_NODES[0]], links: [] } },
  { graphData: { nodes: [NOC_NODES[0], NOC_NODES[1]], links: [] } },
  {
    graphData: { nodes: [NOC_NODES[0], NOC_NODES[1], NOC_NODES[2]], links: [] },
  },
];
