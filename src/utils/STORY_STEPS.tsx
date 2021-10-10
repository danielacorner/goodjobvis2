import { StoryStepType } from "./types";
import { NOC_NODES } from "../assets/NOC-node";
const AUTOMATIONRISKS = NOC_NODES.map((d) => d.automationRisk);
const NOC_STATS = {
  automationRisk: {
    min: AUTOMATIONRISKS.reduce((acc, cur) => Math.min(acc, cur), Infinity),
    max: AUTOMATIONRISKS.reduce((acc, cur) => Math.max(acc, cur), -Infinity),
  },
};

// the story
export const STORY_STEPS: StoryStepType[] = [
  {
    graphData: {
      nodes: NOC_NODES,
      links: [],
    },
    text: (
      <div>
        Hey 😀 this is the{" "}
        <a
          style={{ pointerEvents: "auto" }}
          href="https://noc.esdc.gc.ca/"
          target="_blank"
          rel="noopener noreferrer"
        >
          National Occupational Classification dataset (2016)
        </a>
        . Each circle is a job category...
      </div>
    ),
  },
  {
    graphData: {
      nodes: NOC_NODES.filter(
        (node) => node.automationRisk >= 0.9 * NOC_STATS.automationRisk.max
      ),
      links: [],
    },
    text: "These nodes have > 90% chance of having their tasks automated in the near future...",
  },
  {
    graphData: { nodes: [NOC_NODES[0], NOC_NODES[1]], links: [] },
    text: "😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀hey step 3",
  },
  {
    graphData: { nodes: [NOC_NODES[0], NOC_NODES[1], NOC_NODES[2]], links: [] },
  },
];
