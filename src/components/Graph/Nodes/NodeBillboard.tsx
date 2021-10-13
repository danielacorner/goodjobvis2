import styled from "styled-components/macro";
import { Html, Billboard } from "@react-three/drei";
import { animated, useSpring } from "react-spring";
import {
  DISABLE_SELECTION_OF_TEXT_CSS,
  useMounted,
} from "../../../utils/constants";
import { GraphNodeType } from "../../../utils/types";
import { useAtom } from "jotai";
import { tooltipNodeAtom } from "../../../store/store";
import { useRef } from "react";
const MAX_NUM_IMAGES_TO_DISPLAY = 100;

export default function NodeBillboard({
  node,
  idx,
}: {
  node: GraphNodeType;
  idx: number;
}) {
  return (
    <Billboard {...({} as any)} args={[0, 0, 0]}>
      <NodeBillboardHtml {...{ node, idx }} />
    </Billboard>
  );
}
const NODE_WIDTH = 50;

const AnimatedStyles = styled(animated.div)`
  /* pointer-events: none; */
  ${DISABLE_SELECTION_OF_TEXT_CSS}
  position: relative;
  width: ${NODE_WIDTH}px;
`;
export const AvatarStyles = styled.div`
  width: ${NODE_WIDTH}px;
  height: ${NODE_WIDTH}px;
  transform: scale(0.5);
  border-radius: 50%;
  overflow: hidden;
  pointer-events: auto;
  /* opacity: 0.9; */
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;
export function NodeBillboardHtml({ node, idx, ...rest }) {
  const [tooltipNode, setTooltipNode] = useAtom(tooltipNodeAtom);

  const ref = useRef(null as any);

  // fade in on mount
  const mounted = useMounted();
  const springOpacity = useSpring({
    opacity: mounted ? 1 : 0,
    // config: isNotABot ? CONFIG_POP_OUT : CONFIG_FADE_IN,
    clamp: true,
  });
  return (
    <Html transform={false} sprite={false} center={true} {...rest}>
      <AnimatedStyles
        style={springOpacity}
        ref={ref}
        onMouseEnter={() => {
          if (!ref.current) {
            return;
          }
          const rect = ref.current.getBoundingClientRect();

          setTooltipNode({ ...node, position: { x: rect.x, y: rect.y } });
        }}
        onMouseLeave={() => {
          setTooltipNode(null);
        }}
      >
        <AvatarStyles>
          {idx < MAX_NUM_IMAGES_TO_DISPLAY ? (
            <img src={node.imageUrlThumbnail} alt="" />
          ) : null}
        </AvatarStyles>
      </AnimatedStyles>
    </Html>
  );
}
