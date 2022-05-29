import "./App.css";
import { STORY_STEPS } from "./utils/STORY_STEPS";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { GUI } from "./components/GUI";
import { NodeTooltip } from "./NodeTooltip";
import { StoryCards } from "./StoryScrollyTeller/StoryCards";
import styled from "styled-components";
import { Leva } from "leva";
import { DataViz } from "./components/DataViz/DataViz";
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
            <DataViz />

            <GUI />
            {/* <NOCImages /> */}
            {/* <NOCThumbnails /> */}
          </div>
          <StoryCards />
        </div>
      </AppStyles>
      <NodeTooltip />
      <Leva
        oneLineLabels={true}
        // fill             // default = false,  true makes the pane fill the parent dom node it's rendered in
        // flat             // default = false,  true removes border radius and shadow
        // oneLineLabels    // default = false, alternative layout for labels, with labels and fields on separate rows
        // hideTitleBar     // default = false, hides the GUI header
        // collapsed        // default = false, when true the GUI is collpased
        // hidden={true}
        hidden={import.meta.env.NODE_ENV === "production"} // default = false, when true the GUI is hidden
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

export default App;
