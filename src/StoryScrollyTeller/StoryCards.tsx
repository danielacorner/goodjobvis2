import { Button } from "@chakra-ui/react";
import styled from "styled-components";
import { STORY_STEPS, STORY_STEPS_PATHS, useStorySteps } from "../STORY_STEPS";
import { useMount } from "../utils/constants";

export function StoryCards() {
  const [storySteps, setStorySteps] = useStorySteps();
  return (
    <StoryCardsStyles>
      {storySteps.map((step, idx) => {
        const Text = step.text;
        return (
          <StoryStepStyles key={idx} stepIdx={idx}>
            <div className="text">
              {typeof Text === "function" ? <Text /> : Text}
            </div>
            {step.nextStepOptions && (
              <div className="options">
                {step.nextStepOptions.map(
                  ({ description, icon, stepPathName }, idx) => (
                    <Button
                      key={idx}
                      leftIcon={icon}
                      className="option"
                      onClick={() => {
                        console.log(
                          "🌟🚨 ~ file: StoryCards.tsx ~ line 19 ~ {STORY_STEPS.map ~ stepPathName",
                          stepPathName,
                          setStorySteps
                        );
                        setStorySteps((prev) => [
                          ...prev.slice(0, -1),
                          ...STORY_STEPS_PATHS[stepPathName],
                        ]);
                      }}
                    >
                      {description}
                    </Button>
                  )
                )}
              </div>
            )}
          </StoryStepStyles>
        );
      })}
    </StoryCardsStyles>
  );
}
export function StoryCards2() {
  const [storySteps, setStorySteps] = useStorySteps();
  useMount(() => {
    setStorySteps(storySteps.slice(-1));
  });
  return <StoryCards />;
}
const StoryCardsStyles = styled.div`
  pointer-events: none;
  z-index: 9;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: calc(
    ${STORY_STEPS.length * 1.5 /* extra height for card text height */ * 100}vh +
      6em
  );
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
  background: #ffffffed;
  padding: 0.5em;
  box-shadow: 1px 2px 4px 0px #00000024;
  border-radius: 8px;
  .options {
    pointer-events: auto;
    display: grid;
    grid-template-columns: auto auto;
    grid-gap: 0.5em;
    margin-top: 0.5em;
  }
`;
