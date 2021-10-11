import * as React from "react";
import "./App.css";
import { Graph3D } from "./components/Graph/Graph3D";
import useEventListener from "./hooks/useEventListener";
import { useWindowSize } from "./hooks/useWindowSize";
import { STORY_STEPS } from "./utils/STORY_STEPS";
import { atom, useAtom } from "jotai";
import { StoryStepType } from "./utils/types";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { GUI } from "./components/GUI";
import { NodeTooltip } from "./NodeTooltip";
import { StoryCards } from "./StoryCards";
import styled from "styled-components/macro";
import { Leva } from "leva";

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
  const isScrollEnabled = true;
  return (
    <ChakraProvider {...{ theme }}>
      <AppStyles className="App">
        <div className="app-content">
          <div style={{ pointerEvents: isScrollEnabled ? "auto" : "none" }}>
            {/* <Graph graphData={currentStep.graphData} /> */}
            <Graph3D />
            <GUI />
            {/* <NOCImages /> */}
            {/* <NOCThumbnails /> */}
          </div>
          <StoryCards />
        </div>
        <NodeTooltip />
      </AppStyles>
      <Leva
        oneLineLabels={true}
        // fill             // default = false,  true makes the pane fill the parent dom node it's rendered in
        // flat             // default = false,  true removes border radius and shadow
        // oneLineLabels    // default = false, alternative layout for labels, with labels and fields on separate rows
        // hideTitleBar     // default = false, hides the GUI header
        // collapsed        // default = false, when true the GUI is collpased
        // hidden={true}
        hidden={process.env.NODE_ENV === "production"} // default = false, when true the GUI is hidden
      />
    </ChakraProvider>
  );
}

export const AppStyles = styled.div`
  background: #bbd686;
  overflow: auto scroll;
  height: 100vh;
  .app-content {
    height: ${STORY_STEPS.length * 100}vh;
    position: relative;
  }
`;

export const currentStepIdxAtom = atom<number>(0);
export function useCurrentStepIdx(): [number, Function, StoryStepType] {
  const [currentStepIdx, setCurrentStepIdx] = useAtom(currentStepIdxAtom);
  return [currentStepIdx, setCurrentStepIdx, STORY_STEPS[currentStepIdx]];
}

export default App;

export function useStoryStepIdx() {
  const scrollHeightPct = useScrollHeightPct();
  const step = clamp(
    Math.ceil(scrollHeightPct * STORY_STEPS.length - 1),
    0,
    STORY_STEPS.length - 1
  );
  return step;
}
/** percent (0-1)  */
function useScrollHeightPct() {
  const windowSize = useWindowSize();
  const [scrollHeightPct, setScrollHeightPct] = React.useState(0);
  const $App = document.querySelector(".App");
  // const $Canvas = document.querySelector(".App .app-content canvas");
  useEventListener(
    "scroll",
    (e) => {
      if (!$App) {
        return;
      }
      const scrollHeight = $App.scrollTop;
      const scrollableHeight = $App.scrollHeight - windowSize.height;

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
