import styled from "styled-components";
import { STORY_STEPS } from "../utils/STORY_STEPS";

export function StoryCards() {
  return (
    <StoryCardsStyles>
      {STORY_STEPS.map((story, idx) => (
        <StoryStepStyles key={idx} stepIdx={idx}>
          {story.text}
        </StoryStepStyles>
      ))}
    </StoryCardsStyles>
  );
}
const StoryCardsStyles = styled.div`
  pointer-events: none;
  z-index: 9;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: ${(STORY_STEPS.length + 2.5) * 100}vh;
  background: none;
`;

const STEP_HEIGHT_MULT = 1.5;

const StoryStepStyles = styled.div`
  position: absolute;
  top: calc(${({ stepIdx }) => stepIdx * 100 * STEP_HEIGHT_MULT}vh + 50vh);
  left: 2em;
  text-align: left;
  max-width: calc(100vw - 4em);
  @media (min-width: 600px) {
    left: 6em;
    max-width: calc(100vw - 12em);
  }
  font-size: 1.2em;
  background: #ffffffc3;
  padding: 0.5em;
  box-shadow: 1px 2px 4px 0px #00000024;
  border-radius: 8px;
`;
