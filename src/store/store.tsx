import { useEventListener } from "@chakra-ui/react";
import { atom, SetStateAction, useAtom } from "jotai";
import { useState } from "react";
import { useWindowSize } from "../hooks/useWindowSize";
import { STORY_STEPS } from "../utils/STORY_STEPS";
import { GraphNodeType, StoryStepType } from "../utils/types";
export const isCoolAtom = atom<boolean>(true);
export type TooltipNodeType = GraphNodeType & {
  position: { x: number; y: number };
};
export const tooltipNodeAtom = atom<TooltipNodeType | null>(null);

export const currentStepIdxAtom = atom<number>(0);
export function useCurrentStepIdx(): [
  number,
  (update: SetStateAction<number>) => void,
  StoryStepType
] {
  const [currentStepIdx, setCurrentStepIdx] = useAtom(currentStepIdxAtom);
  return [currentStepIdx, setCurrentStepIdx, STORY_STEPS[currentStepIdx]];
}

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
  const [scrollHeightPct, setScrollHeightPct] = useState(0);
  const $App = document.querySelector(".App");
  // const $Canvas = document.querySelector(".App .app-content canvas");
  useEventListener(
    "scroll",
    (e) => {
      if (!$App) {
        return;
      }
      const scrollHeight = $App.scrollTop;
      const scrollableHeight = $App.scrollHeight;

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
export function useTooltipNode() {
  return useAtom(tooltipNodeAtom);
}
