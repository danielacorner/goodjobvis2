import styled from "styled-components/macro";
import { Html, Billboard } from "@react-three/drei";
import { animated, useSpring } from "react-spring";
import {
  DISABLE_SELECTION_OF_TEXT_CSS,
  useMounted,
} from "../../../utils/constants";
import { GraphNodeType } from "../../../utils/types";

export default function NodeBillboard({ node }: { node: GraphNodeType }) {
  // slowly randomly rotate the billboard content
  // const delay = useRef(Math.random() * Math.PI);
  // const ref = useRef(null as any);
  // useFrame(({ clock }) => {
  //   if (!ref.current) {
  //     return;
  //   }
  //   const turnPercent = 0.08;
  //   const speed = 0.5;
  //   const roty =
  //     Math.sin((clock.getElapsedTime() - delay.current) * speed) *
  //     Math.PI *
  //     turnPercent;
  //   ref.current.rotation.y = roty;
  // });

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
      {/* <mesh ref={ref}> */}
      <Html
        transform={false}
        sprite={false}
        center={true}
        // style={{
        //   width: 0,
        //   height: 0,
        //   marginLeft: -100,
        //   marginTop: -100,
        //   opacity: 0.8,
        // }}
      >
        <AnimatedStyles style={springOpacity}>
          <AvatarStyles>
            <img src={node.imageUrlThumbnail} alt="" />
          </AvatarStyles>
          {/* <TweetsColumn {...{ hasBotScore, tweets, isLight, originalPoster }} /> */}
        </AnimatedStyles>
      </Html>
      {/* </mesh> */}
    </Billboard>
  );
}
const NODE_WIDTH = 10;

const AnimatedStyles = styled(animated.div)`
  pointer-events: none;
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
  pointer-events: none;
  /* opacity: 0.9; */
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;
