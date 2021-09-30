import * as React from "react";
import "./App.css";
import { Graph3D } from "./Graph/Graph3D";
import useEventListener from "./hooks/useEventListener";
import { useWindowSize } from "./hooks/useWindowSize";
import { NOCImages, NOCThumbnails } from "./NOCImages";
import { STORY_STEPS } from "./STORY_STEPS";

function App() {
  const currentStep = useScrollyTeller();
  const isScrollEnabled = true;
  return (
    <div className="App">
      <div style={{ pointerEvents: isScrollEnabled ? "auto" : "none" }}>
        {/* <Graph graphData={currentStep.graphData} /> */}
        <Graph3D graphData={currentStep.graphData} />
        <NOCImages />
        <NOCThumbnails />
      </div>
    </div>
  );
}

export default App;

/** Listen to scroll, and direct the story */
function useScrollyTeller() {
  const scrollHeightPct = useScrollHeightPct();
  const stepIdx = clamp(
    Math.round(scrollHeightPct * STORY_STEPS.length - 1),
    0,
    STORY_STEPS.length - 1
  );
  const currentStep = STORY_STEPS[stepIdx];

  return currentStep;
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
