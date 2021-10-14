import styled from "styled-components/macro";
import { Html, Billboard } from "@react-three/drei";
import { animated, useSpring } from "react-spring";
import {
  DISABLE_SELECTION_OF_TEXT_CSS,
  useMounted,
} from "../../../utils/constants";
import { useRef } from "react";

export function NodeBillboardHtml({
  node,
  showImage,
  onPointerOver = (() => {}) as any,
  onPointerOut = (() => {}) as any,
  ...rest
}) {
  const ref = useRef(null as any);

  // fade in on mount
  const mounted = useMounted();
  const springOpacity = useSpring({
    opacity: mounted ? 1 : 0,
    // config: isNotABot ? CONFIG_POP_OUT : CONFIG_FADE_IN,
    clamp: true,
  });
  return (
    <Html center={true} {...rest}>
      <AnimatedStyles style={springOpacity} ref={ref}>
        <AvatarStyles>
          {showImage ? <img src={node.imageUrlThumbnail} alt="" /> : null}
        </AvatarStyles>
        <div
          className="mousePadding"
          onMouseEnter={onPointerOver}
          onMouseLeave={onPointerOut}
        ></div>
      </AnimatedStyles>
    </Html>
  );
}

const NODE_WIDTH = 25;

const AnimatedStyles = styled(animated.div)`
  ${DISABLE_SELECTION_OF_TEXT_CSS}
  position: relative;
  width: ${NODE_WIDTH}px;
  position: relative;
  .mousePadding {
    position: absolute;
    pointer-events: auto;
    inset: -10px;
  }
`;

export const AvatarStyles = styled.div`
  width: ${NODE_WIDTH}px;
  height: ${NODE_WIDTH}px;
  border-radius: 50%;
  overflow: hidden;
  opacity: 0.9;
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;
