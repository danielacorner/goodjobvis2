import * as React from "react";
import { useEffect } from "react";
import { STORY_STEPS } from "../utils/STORY_STEPS";
import { Button } from "@chakra-ui/react";
import { useAtom } from "jotai";
import styled from "styled-components/macro";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useCurrentStepIdx, useStoryStepIdx, currentStepIdxAtom } from "../App";

export function GUI() {
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
  pointer-events: none;
  * {
    pointer-events: auto;
  }
`;
