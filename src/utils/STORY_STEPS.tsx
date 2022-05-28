import React from "react";
import { StoryStepType } from "./types";
import { NOC_NODES, NOC_STATS } from "../assets/NOC-node";
// the story
export const STORY_STEPS: StoryStepType[] = [
  {
    graphData: {
      nodes: NOC_NODES.filter(
        (node) => node.automationRisk < 0.1 * NOC_STATS.automationRisk.max
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
          👷‍♀️ All of these jobs have {`<`} 10% chance of having their tasks
          automated in the near future...
        </p>
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
    text: (
      <p>
        🤖 All of these jobs have {`>=`} 90% chance of having their tasks
        automated in the near future...
      </p>
    ),
  },
  {
    graphData: {
      nodes: [],
      // nodes: NOC_NODES,
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
