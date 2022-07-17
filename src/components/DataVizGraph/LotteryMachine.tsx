import { Canvas } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  Sphere,
  useAspect,
  useTexture,
} from "@react-three/drei";
import { useCurrentStoryStep } from "../../store/store";
import { Debug, Physics, usePlane, useSphere } from "@react-three/cannon";
import { Mesh } from "three";
import { GraphNodeType } from "../../utils/types";

export function LotteryMachine() {
  return (
    <Canvas style={{ position: "fixed", inset: 0 }}>
      <Physics>
        <Debug>
          <BallsAndCollisions />
        </Debug>
      </Physics>

      <Environment preset="warehouse" />
      <Background position={[0, 0, -5]} />
      {process.env.NODE_ENV === "development" && <OrbitControls />}
    </Canvas>
  );
}
const Background = (props) => (
  <mesh scale={useAspect(5000, 3800, 3)} {...props}>
    <planeGeometry />
    <meshBasicMaterial map={useTexture("/bg.jpg")} />
  </mesh>
);
const PI = Math.PI;
const GLASS_BALL_RADIUS = 1;
function BallsAndCollisions() {
  const { graphData } = useCurrentStoryStep();
  const [glassBallRef, api] = usePlane<Mesh>(() => ({
    args: [GLASS_BALL_RADIUS],
    position: [0, -GLASS_BALL_RADIUS, 0],
    rotation: [PI / 2, 0, 0],
  }));
  return (
    <>
      <mesh ref={glassBallRef}></mesh>
      <Sphere args={[GLASS_BALL_RADIUS, 16, 16]}>
        <meshPhysicalMaterial
          transmission={1}
          roughness={0}
          thickness={1}
          envMapIntensity={1}
        />
      </Sphere>
      {graphData.nodes.slice(0, 1).map((node) => (
        <Gumball key={node.id} {...{ node }} />
      ))}
    </>
  );
}
const GUMBALL_RADIUS = 0.1;
function Gumball({ node }: { node: GraphNodeType }) {
  const [ref, api] = useSphere<Mesh>(() => ({
    args: [GUMBALL_RADIUS],
    position: [0, 1, 0],
    mass: 1,
  }));
  return (
    <mesh ref={ref}>
      <Sphere key={node.id} args={[GUMBALL_RADIUS, 8, 8]}>
        <meshPhysicalMaterial
          transmission={0}
          roughness={0}
          thickness={0.01}
          envMapIntensity={1}
        />
      </Sphere>
    </mesh>
  );
}
