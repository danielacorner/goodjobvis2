import { useEventListener } from "@chakra-ui/react";
import { atom, SetStateAction, useAtom } from "jotai";
import { useState } from "react";
import { NOC_NODES } from "../assets/NOC-node";
import { useWindowSize } from "../hooks/useWindowSize";
import { STORY_STEPS } from "../STORY_STEPS";
import {
  GraphDataType,
  GraphNodeType,
  NOCDataType,
  StoryStepType,
} from "../utils/types";
export const isCoolAtom = atom<boolean>(true);
export type TooltipNodeType = GraphNodeType & {
  position: { x: number; y: number };
};
export const tooltipNodeAtom = atom<TooltipNodeType | null>(null);

export const currentStepIdxAtom = atom<number>(0);
export function useCurrentStepIdx(): [
  number,
  (update: SetStateAction<number>) => void
] {
  const [currentStepIdx, setCurrentStepIdx] = useAtom(currentStepIdxAtom);
  return [currentStepIdx, setCurrentStepIdx];
}
export function useCurrentStoryStep(): StoryStepType & {
  graphData: GraphDataType;
} {
  const [currentStepIdx] = useCurrentStepIdx();
  const currentStoryStep = STORY_STEPS[currentStepIdx];
  return {
    ...currentStoryStep,
    graphData: currentStoryStep.graphData ?? { nodes: [], links: [] },
  };
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

export const fadeOutAtom = atom<boolean>(false);
export function useFadeOut(): [
  boolean,
  (update: SetStateAction<boolean>) => void
] {
  const [fadeOut, setFadeOut] = useAtom(fadeOutAtom);
  return [fadeOut, setFadeOut];
}

const INITIAL_FILTERS = {
  skillsLang: 0,
  skillsMath: 0,
  skillsLogi: 0,
  skillsComp: 0,
  searchText: "",
  colorBy: "",
};
const filtersAtom = atom(INITIAL_FILTERS);
export function useFilters(): [
  typeof INITIAL_FILTERS,
  (
    update: SetStateAction<{
      skillsLang: number;
      skillsMath: number;
      skillsLogi: number;
      skillsComp: number;
      searchText: string;
      colorBy: string;
    }>
  ) => void,
  NOCDataType[]
] {
  const [filters, setFilters] = useAtom(filtersAtom);
  const filteredNodes = NOC_NODES.filter((node) => {
    return Object.entries(filters).every(([skillsKey, filterValue]) =>
      // search filter
      skillsKey === "searchText" && typeof filterValue === "string"
        ? node.job.includes(filterValue)
        : // color-by filter
        skillsKey === "colorBy"
        ? true
        : // skills sliders fiters
          node[skillsKey] > filterValue
    );
  });
  return [filters, setFilters, filteredNodes];
}
