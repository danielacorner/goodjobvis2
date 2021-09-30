import * as React from "react";
import { useEffect } from "react";
import "./App.css";
import { Graph3D } from "./Graph/Graph3D";
import useEventListener from "./hooks/useEventListener";
import { useWindowSize } from "./hooks/useWindowSize";
import { STORY_STEPS } from "./STORY_STEPS";
import { Button } from "@chakra-ui/react";
import { atom, useAtom } from "jotai";
import { StoryStepType } from "./types";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import styled from "styled-components/macro";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};
const theme = extendTheme({ colors });

function App() {
  const [, , currentStep] = useCurrentStepIdx();
  const isScrollEnabled = true;
  return (
    <ChakraProvider {...{ theme }}>
      <div className="App">
        <div style={{ pointerEvents: isScrollEnabled ? "auto" : "none" }}>
          {/* <Graph graphData={currentStep.graphData} /> */}
          <Graph3D graphData={currentStep.graphData} />
          <GUI />
          {/* <NOCImages /> */}
          {/* <NOCThumbnails /> */}
        </div>
      </div>
    </ChakraProvider>
  );
}
const currentStepIdxAtom = atom<number>(0);
function useCurrentStepIdx(): [number, Function, StoryStepType] {
  const [currentStepIdx, setCurrentStepIdx] = useAtom(currentStepIdxAtom);
  return [currentStepIdx, setCurrentStepIdx, STORY_STEPS[currentStepIdx]];
}

function GUI() {
  const [currentStepIdx, setCurrentStepIdx] = useCurrentStepIdx();

  /** Listen to scroll, and direct the story */
  const storyStepIdx = useStoryStepIdx();
  useEffect(() => {
    setCurrentStepIdx(storyStepIdx);
  }, [storyStepIdx, setCurrentStepIdx]);

  return (
    <GuiStyles>
      {currentStepIdx > 0 && <BtnPrev />}
      {currentStepIdx < STORY_STEPS.length - 1 && <BtnNext />}
    </GuiStyles>
  );
}
function BtnPrev() {
  const [, setCurrentStepIdx] = useAtom(currentStepIdxAtom);

  return (
    <Button
      leftIcon={<ChevronLeftIcon />}
      colorScheme="blue"
      variant="outlined"
      onClick={() => {
        setCurrentStepIdx((p) => p - 1);
      }}
    >
      prev
    </Button>
  );
}
function BtnNext() {
  const [, setCurrentStepIdx] = useAtom(currentStepIdxAtom);

  return (
    <Button
      rightIcon={<ChevronRightIcon />}
      colorScheme="blue"
      onClick={() => {
        setCurrentStepIdx((p) => p + 1);
      }}
    >
      next
    </Button>
  );
}

const GuiStyles = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
`;

export default App;

function useStoryStepIdx() {
  const scrollHeightPct = useScrollHeightPct();
  return clamp(
    Math.round(scrollHeightPct * STORY_STEPS.length - 1),
    0,
    STORY_STEPS.length - 1
  );
}
/** percent (0-1)  */
function useScrollHeightPct() {
  const windowSize = useWindowSize();
  const [scrollHeightPct, setScrollHeightPct] = React.useState(0);
  const $App = document.querySelector(".App");
  useEventListener(
    "scroll",
    (e) => {
      const scrollHeight = e.target.scrollTop;
      const scrollableHeight = e.target.scrollHeight - windowSize.height;
      const newScrollHeightPct = scrollHeight / scrollableHeight;
      setScrollHeightPct(newScrollHeightPct);
    },
    $App || (window as any)
  );

  return scrollHeightPct;
}

function clamp(value, min, max) {
  return Math.max(Math.min(value, max), min);
}
