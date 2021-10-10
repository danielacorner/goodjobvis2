import * as React from "react";
import { useAtom } from "jotai";
import styled from "styled-components/macro";
import { animated, useSpring } from "react-spring";
import { tooltipNodeAtom, TooltipNodeType } from "./store/store";
import { useWindowSize } from "./hooks/useWindowSize";

const TOOLTIP_WIDTH = 300;
export const TOOLTIP_MIN_HEIGHT = 200;

export function NodeTooltip() {
  const windowSize = useWindowSize();
  const INITIAL_POSITION = {
    x: TOOLTIP_WIDTH / 2,
    y: 0,
  };
  const [tooltipNode, setTooltipNode] = useAtom(tooltipNodeAtom);
  const prevTooltipNodeRef = React.useRef<TooltipNodeType | null>(null);
  React.useEffect(() => {
    if (tooltipNode) {
      prevTooltipNodeRef.current = tooltipNode;
    }
  }, [tooltipNode]);
  console.log("🌟🚨 ~ NodeTooltip ~ tooltipNode", tooltipNode);
  const prevTooltipNode = prevTooltipNodeRef.current;
  const springPosition = useSpring({
    transform: `translate3d(${
      tooltipNode?.position.x ||
      prevTooltipNode?.position.x ||
      INITIAL_POSITION.x
    }px,${
      tooltipNode?.position.y
        ? tooltipNode?.position.y - TOOLTIP_MIN_HEIGHT
        : prevTooltipNode?.position.y
        ? prevTooltipNode?.position.y - TOOLTIP_MIN_HEIGHT
        : INITIAL_POSITION.y
    }px,0px)`,
  });
  return (
    <AnimatedNodeTooltipStyles style={springPosition}>
      <img src={tooltipNode?.imageUrl} alt="" />
    </AnimatedNodeTooltipStyles>
  );
}
const AnimatedNodeTooltipStyles = styled(animated.div)`
  pointer-events: none;
  position: fixed;
  top: 0;
  left: 0;
  width: ${TOOLTIP_WIDTH}px;
  img {
    width: 100%;
  }
`;
