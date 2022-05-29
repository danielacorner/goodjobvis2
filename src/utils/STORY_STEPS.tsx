import { StoryStepType } from "./types";
import { NOC_NODES, NOC_STATS } from "../assets/NOC-node";
import styled from "styled-components";

const StepStyles = styled.div`
  a {
    color: #3381d0;
  }
`;

console.log("🌟🚨 ~ file: STORY_STEPS.tsx ~ line 18 ~ NOC_NODES", NOC_NODES);
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
      <StepStyles>
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
      </StepStyles>
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
        On the other hand, all of{" "}
        <span style={{ fontSize: "italic" }}>these</span> jobs have {`>`} 90%
        chance of having their tasks automated in the near future... 🤖
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
      <StepStyles>
        Here is the entire{" "}
        <a
          style={{ pointerEvents: "auto" }}
          href="https://noc.esdc.gc.ca/"
          target="_blank"
          rel="noopener noreferrer"
        >
          NOC dataset
        </a>
        . It describes <b>{NOC_NODES.length}</b> jobs (circle area = number of
        workers)
      </StepStyles>
    ),
  },
  {
    graphData: {
      nodes: [],
      // nodes: NOC_NODES,
      links: [],
    },
    text: (
      <StepStyles>
        The dataset comes with a lot of different data. For example, we can sort
        jobs by common statistics like <em>Salary</em> and{" "}
        <em>Years of Education</em>...
      </StepStyles>
    ),
    xKey: "yearsStudy",
    yKey: "salaryLow",
    yScaleType: "logarithmic",
  },
  {
    graphData: {
      nodes: [],
      // nodes: NOC_NODES,
      links: [],
    },
    text: (
      <StepStyles>
        ...or we could ask a question like {`"`}How does <em>Reading Skill</em>{" "}
        correlate with a job{`'`}s <em>Risk of Automation</em>?{`"`}.
      </StepStyles>
    ),
    xKey: "s10Reading",
    yKey: "automationRisk",
  },
];
