import { NOC_STATS_TYPED, StoryStepType } from "./utils/types";
import { NOC_NODES } from "./assets/NOC-node";
import styled from "styled-components";
import { atom, useAtom } from "jotai";
import { GrTest } from "react-icons/gr";
import { IoPlanetOutline } from "react-icons/io5";
import { MdEngineering } from "react-icons/md";
import { GiComputerFan } from "react-icons/gi";
import { BsNewspaper } from "react-icons/bs";
import { FaUserNurse } from "react-icons/fa";

const lightGreen = "#b0f2b870";
const lightRed = "#f2b0b06f";

const StepStyles = styled.div`
  a {
    color: #3381d0;
  }
`;

// the story
const STORY_STEPS_PROD: StoryStepType[] = [
  {
    stepName: "step-1",
    graphType: "3dPile",
    // TODO add colorBy
    graphData: {
      nodes: NOC_NODES.filter(
        (node) => node.automationRisk < 0.1 * NOC_STATS_TYPED.automationRisk.max
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
          All of <em>these</em> jobs have a{" "}
          <span style={{ background: lightGreen }}>{`<`} 10% chance</span> of
          having their tasks automated in the near future...
        </p>
      </StepStyles>
    ),
  },

  {
    stepName: "step-1",
    graphType: "3dPile",
    graphData: {
      nodes: NOC_NODES.filter(
        (node) =>
          node.automationRisk >= 0.9 * NOC_STATS_TYPED.automationRisk.max
      ),
      links: [],
    },
    text: (
      <p>
        On the other hand, all of <em>these</em> jobs have a{" "}
        <span style={{ background: lightRed }}>{`>`} 90% chance</span> of having
        their tasks automated in the near future... 🤖
      </p>
    ),
  },
  {
    stepName: "step-3",
    graphType: "react-force-graph",
    graphData: {
      nodes: NOC_NODES.filter(
        (node) =>
          node.automationRisk >= 0.9 * NOC_STATS_TYPED.automationRisk.max
      ),
      links: [],
    },
    text: (
      <StepStyles>
        Let{"'"}s size each job category by number of workers 👷‍♀️, so we can get
        a better idea about how big each job category is:
      </StepStyles>
    ),
  },
  {
    stepName: "step-4",
    graphType: "react-force-graph",
    graphData: {
      nodes: NOC_NODES,
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
        . It describes <b>{NOC_NODES.length}</b> jobs.
      </StepStyles>
    ),
  },
  {
    stepName: "step-5",
    graphType: "2dScatter",
    graphData: {
      nodes: [],
      // nodes: NOC_NODES,
      links: [],
    },
    text: (
      <StepStyles>
        The dataset comes with a lot of different data. For example,
        <br />
        we can sort jobs by statistics like <em>Salary</em> and{" "}
        <em>Years of Education</em>...
      </StepStyles>
    ),
    xKey: "yearsStudy",
    yKey: "salaryMed",
    yScaleType: "logarithmic",
  },
  {
    stepName: "step-6",
    graphType: "2dScatter",
    graphData: {
      nodes: [],
      // nodes: NOC_NODES,
      links: [],
    },
    text: (
      <StepStyles>
        ...or we could ask a question like {`"`}How does a worker{`'`}s{" "}
        <em>Reading Skill</em> correlate with their job{`'`}s{" "}
        <em>Risk of Automation</em>?{`"`}.
      </StepStyles>
    ),
    xKey: "s10Reading",
    yKey: "automationRisk",
  },
  // TODO: choose your own adventure!
  {
    stepName: "step-7",
    graphType: "2dScatter",
    graphData: {
      nodes: [],
      // nodes: NOC_NODES,
      links: [],
    },
    text: <StepStyles>Here you can compare any two variables:</StepStyles>,
    xKey: "VARIABLE",
    yKey: "VARIABLE",
  },
  {
    stepName: "step-8",
    graphType: "2dScatter",
    graphData: {
      nodes: [],
      // nodes: NOC_NODES,
      links: [],
    },
    text: (
      <StepStyles>
        {`For example, here's how someone seeking one of these jobs might use this visualization:`}
      </StepStyles>
    ),
    nextStepOptions: [
      {
        stepName: "step-1",
        description: "chemistry",
        icon: <GrTest />,
      },
      {
        stepName: "step-1",
        description: "astronomer",
        icon: <IoPlanetOutline />,
      },
      {
        stepName: "step-1",
        description: "engineer",
        icon: <MdEngineering />,
      },
      {
        stepName: "step-1",
        description: "computers",
        icon: <GiComputerFan />,
      },
      {
        stepName: "step-1",
        description: "journalist",
        icon: <BsNewspaper />,
      },
      {
        stepName: "step-1",
        description: "nurse",
        icon: <FaUserNurse />,
      },
    ],
  },
];

const STORY_STEPS_DEV = STORY_STEPS_PROD.slice(6);

export const STORY_STEPS =
  process.env.NODE_ENV === "development" ? STORY_STEPS_DEV : STORY_STEPS_PROD;

// TODO on step 8, add/remove steps to the story via nextStepOptions
const storyStepsAtom = atom<StoryStepType[]>(STORY_STEPS);
export function useStorySteps() {
  return useAtom(storyStepsAtom);
}
