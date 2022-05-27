import { useEffect } from "react";
import { Button } from "@chakra-ui/react";
import styled from "styled-components/macro";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useCurrentStepIdx, useStoryStepIdx } from "../store/store";

export function GUI() {
  const [, setCurrentStepIdx] = useCurrentStepIdx();

  /** Listen to scroll, and direct the story */
  const storyStepIdx = useStoryStepIdx();
  useEffect(() => {
    setCurrentStepIdx(storyStepIdx);
  }, [storyStepIdx, setCurrentStepIdx]);

  return (
    <GuiStyles>
      {/* {currentStepIdx > 0 && <BtnPrev />}
      {currentStepIdx < STORY_STEPS.length - 1 && <BtnNext />} */}
    </GuiStyles>
  );
}
function BtnPrev() {
  const [, setCurrentStepIdx] = useCurrentStepIdx();

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
  const [, setCurrentStepIdx] = useCurrentStepIdx();

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
