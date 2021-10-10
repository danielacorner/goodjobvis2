import styled from "styled-components/macro";
import { STORY_STEPS } from "./utils/STORY_STEPS";

export function StoryCards() {
  return (
    <StoryCardsStyles>
      {STORY_STEPS.map((story, idx) => (
        <StoryStepStyles stepIdx={idx}>{story.text}</StoryStepStyles>
      ))}
    </StoryCardsStyles>
  );
}
const StoryCardsStyles = styled.div`
  pointer-events: none;
  z-index: 9;
  /* position: fixed; */
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: ${STORY_STEPS.length * 100}vh;
  background: none;
`;

const StoryStepStyles = styled.div`
  position: absolute;
  top: ${({ stepIdx }) => stepIdx * 100}vh;
`;
