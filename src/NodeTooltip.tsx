import React, { useEffect } from "react";
import { useAtom } from "jotai";
import styled from "styled-components";
import { animated, useSpring } from "react-spring";
import {
  tooltipNodeAtom,
  TooltipNodeType,
  useTooltipNode,
} from "./store/store";

export const TOOLTIP_WIDTH = 300;
export const TOOLTIP_MIN_HEIGHT = 200;
export const TOOLTIP_IMG_MAX_HEIGHT = 240;

export function NodeTooltip() {
  const INITIAL_POSITION = {
    x: TOOLTIP_WIDTH / 2,
    y: 0,
  };
  const [tooltipNode] = useTooltipNode();
  const prevTooltipNodeRef = React.useRef<TooltipNodeType | null>(null);
  useEffect(() => {
    if (tooltipNode) {
      prevTooltipNodeRef.current = tooltipNode;
    }
  }, [tooltipNode]);

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
      <div className="title">{tooltipNode?.job}</div>
    </AnimatedNodeTooltipStyles>
  );
}
const AnimatedNodeTooltipStyles = styled(animated.div)`
  pointer-events: none;
  position: fixed;
  top: 0;
  left: 0;
  width: ${TOOLTIP_WIDTH}px;
  background: #ffffffd6;
  img {
    width: 100%;
    max-height: ${TOOLTIP_IMG_MAX_HEIGHT}px;
    object-fit: cover;
    overflow: hidden;
  }
`;
