import { STORY_STEPS } from "./utils/STORY_STEPS";
import styled from "styled-components/macro";

export const AppStyles = styled.div`
  background: #bbd686;
  overflow: auto scroll;
  height: 100vh;
  .app-content {
    height: ${STORY_STEPS.length * 100}vh;
  }
`;
