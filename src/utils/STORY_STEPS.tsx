import { StoryStepType } from "./types";
import { NOC_NODES } from "../assets/NOC-node";
const AUTOMATIONRISKS = NOC_NODES.map((d) => d.automationRisk);
export const NOC_STATS = {
  automationRisk: {
    min: AUTOMATIONRISKS.reduce((acc, cur) => Math.min(acc, cur), Infinity),
    max: AUTOMATIONRISKS.reduce((acc, cur) => Math.max(acc, cur), -Infinity),
  },
};

// the story
export const STORY_STEPS: StoryStepType[] = [
  {
    graphData: {
      nodes: NOC_NODES.filter(
        (node) => node.automationRisk >= 0.9 * NOC_STATS.automationRisk.max
      ),
      links: [],
    },
    text: (
      <div>
        <p>
          Hey 😀 these are some job categories from the{" "}
          <a
            style={{ pointerEvents: "auto" }}
            href="https://noc.esdc.gc.ca/"
            target="_blank"
            rel="noopener noreferrer"
          >
            National Occupational Classification (NOC) dataset (2016)
          </a>
          .
        </p>
        <br />
        <p>
          All of these jobs have {`>=`} 90% chance of having their tasks
          automated in the near future...
        </p>
      </div>
    ),
  },

  {
    graphData: {
      nodes: NOC_NODES.filter(
        (node) => node.automationRisk < 0.1 * NOC_STATS.automationRisk.max
      ),
      links: [],
    },
    text: (
      <p>
        All of these jobs have {`<`} 10% chance of having their tasks automated
        in the near future...
      </p>
    ),
  },
  {
    graphData: {
      nodes: NOC_NODES,
      links: [],
    },
    text: (
      <div>
        Here is the entire{" "}
        <a
          style={{ pointerEvents: "auto" }}
          href="https://noc.esdc.gc.ca/"
          target="_blank"
          rel="noopener noreferrer"
        >
          NOC dataset
        </a>
        .
      </div>
    ),
  },
];
