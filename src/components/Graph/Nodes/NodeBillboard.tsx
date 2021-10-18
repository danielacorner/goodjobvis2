import styled from "styled-components/macro";
import { Html, Billboard } from "@react-three/drei";
import { animated, useSpring } from "react-spring";
import {
  DISABLE_SELECTION_OF_TEXT_CSS,
  useMounted,
} from "../../../utils/constants";
import { useAtom } from "jotai";
import { useWindowSize } from "../../../hooks/useWindowSize";
import { TOOLTIP_WIDTH, TOOLTIP_MIN_HEIGHT } from "../../../NodeTooltip";
import { tooltipNodeAtom } from "../../../store/store";

export function NodeBillboardHtml({ node, showImage, setHover }) {
  // fade in on mount
  const mounted = useMounted();
  const springOpacity = useSpring({
    opacity: mounted ? 1 : 0,
    // config: isNotABot ? CONFIG_POP_OUT : CONFIG_FADE_IN,
    clamp: true,
  });
  const windowSize = useWindowSize();
  const [, setTooltipNode] = useAtom(tooltipNodeAtom);

  return (
    <Billboard>
      <Html transform={true} sprite={false} center={true}>
        <AnimatedStyles style={springOpacity}>
          <AvatarStyles>
            {showImage ? <img src={node.imageUrlThumbnail} alt="" /> : null}
          </AvatarStyles>
          <div
            className="mousePadding"
            onMouseEnter={(e) => {
              e.stopPropagation();
              setTooltipNode({
                ...node,
                position: {
                  x: Math.min(e.clientX, windowSize.width - TOOLTIP_WIDTH - 24),
                  y: e.clientY - TOOLTIP_MIN_HEIGHT / 2,
                },
              });
              setHover(true);
            }}
            onMouseLeave={() => {
              setHover(false);
            }}
          ></div>
        </AnimatedStyles>
      </Html>
    </Billboard>
  );
}

const NODE_WIDTH = 7;

const AnimatedStyles = styled(animated.div)`
  ${DISABLE_SELECTION_OF_TEXT_CSS}
  position: relative;
  width: ${NODE_WIDTH}px;
  position: relative;
  .mousePadding {
    position: absolute;
    pointer-events: auto;
    inset: -2px;
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
