import styled from "styled-components/macro";
import { Html, Billboard } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { animated, useSpring } from "react-spring";
import {
  DISABLE_SELECTION_OF_TEXT_CSS,
  useMounted,
} from "../../utils/constants";
import { GraphNodeType } from "../../utils/types";

export default function NodeBillboard({ node }: { node: GraphNodeType }) {
  // slowly randomly rotate the billboard content
  const delay = useRef(Math.random() * Math.PI);
  const ref = useRef(null as any);
  useFrame(({ clock }) => {
    if (!ref.current) {
      return;
    }
    const turnPercent = 0.08;
    const speed = 0.5;
    const roty =
      Math.sin((clock.getElapsedTime() - delay.current) * speed) *
      Math.PI *
      turnPercent;
    ref.current.rotation.y = roty;
  });

  const mounted = useMounted();

  // const isNotABot = node.user.isNotABot;
  // fade in on mount
  const springOpacity = useSpring({
    opacity: mounted ? 1 : 0,
    // config: isNotABot ? CONFIG_POP_OUT : CONFIG_FADE_IN,
    clamp: true,
  });

  return (
    <Billboard {...({} as any)} args={[0, 0, 0]}>
      <mesh ref={ref}>
        <Html
          transform={true}
          sprite={false}
          style={{
            width: 0,
            height: 0,
            marginLeft: -100,
            marginTop: -100,
            opacity: 0.8,
          }}
        >
          <AnimatedHtmlStyles style={springOpacity}>
            <AvatarStyles>
              <img src={node?.imageUrl} alt="" />
            </AvatarStyles>
            {/* <TweetsColumn {...{ hasBotScore, tweets, isLight, originalPoster }} /> */}
          </AnimatedHtmlStyles>
        </Html>
      </mesh>
    </Billboard>
  );
}

const AnimatedHtmlStyles = styled(animated.div)`
  pointer-events: none;
  ${DISABLE_SELECTION_OF_TEXT_CSS}
  position: relative;
  width: 200px;
`;
export const AvatarStyles = styled.div`
  width: 100%;
  height: 100%;
  transform: scale(0.5);
  border-radius: 50%;
  overflow: hidden;
  pointer-events: none;
  opacity: 0.7;
  img {
    width: 100%;
    height: auto;
  }
`;
