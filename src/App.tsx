import { STORY_STEPS } from "./STORY_STEPS";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { GUI } from "./components/GUI";
import { NodeTooltip } from "./NodeTooltip";
import { StoryCards, StoryCards2 } from "./StoryScrollyTeller/StoryCards";
import styled from "styled-components";
import { Leva } from "leva";
import { colors } from "./utils/constants";
import { useFadeOut } from "./store/store";
import { Fade } from "@mui/material";
import { DataVizGraph } from "./components/DataVizGraph/DataVizGraph";
import { Route, Router, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { LotteryMachine } from "./components/DataVizGraph/LotteryMachine";
// 2. Extend the theme to include custom colors, fonts, etc
const chakraColors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};
const theme = extendTheme({ colors: chakraColors });

function App() {
  const isScrollEnabled = true;
  return (
    <ChakraProvider {...{ theme }}>
      <AppStyles className="App">
        <div className="app-content">
          <div style={{ pointerEvents: isScrollEnabled ? "auto" : "none" }}>
            {/* <Graph graphData={currentStep.graphData} /> */}
            <FadeInOut>
              <DataVizGraph />
            </FadeInOut>

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
        hidden={process.env.NODE_ENV !== "development"} // default = false, when true the GUI is hidden
      />
    </ChakraProvider>
  );
}

export const AppStyles = styled.div`
  background: ${colors.appBackground};
  overflow: auto scroll;
  height: 100vh;
  .app-content {
    height: ${STORY_STEPS.length * 100}vh;
    position: relative;
  }
`;

const RoutedApp = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}></Route>
      <Route path="/boop" element={<App2 />}></Route>
    </Routes>
  </BrowserRouter>
);

function App2() {
  return <LotteryMachine />;
}

export default RoutedApp;

function FadeInOut({ children }) {
  const [fadeOut] = useFadeOut();
  const open = !fadeOut;
  return (
    <Fade in={open} timeout={300} easing={open ? "ease-in" : "ease-out"}>
      <div>{children}</div>
    </Fade>
  );
}
