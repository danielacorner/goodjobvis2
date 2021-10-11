import { usePlane } from "@react-three/cannon";
import { useThree } from "@react-three/fiber";
import { NODE_RADIUS, NODE_RADIUS_COLLISION_MULTIPLIER } from "./Nodes/Nodes";
const FULL_WIDTH = 0.5;
const CENTERED = 0.15;
export const PADDING = 0.08;

export function Collisions() {
  const { viewport } = useThree();
  const width = viewport.width * (FULL_WIDTH - PADDING);
  const height = viewport.height * 0.02;
  const depth = NODE_RADIUS * NODE_RADIUS_COLLISION_MULTIPLIER * 1.3;

  // back, front
  usePlane(() => ({ position: [0, 0, -depth], rotation: [0, 0, 0] }));
  usePlane(() => ({ position: [0, 0, depth], rotation: [0, -Math.PI, 0] }));

  // left, right
  usePlane(() => ({
    position: [width, 0, 0],
    rotation: [0, -Math.PI / 2, 0],
  }));
  usePlane(() => ({
    position: [-width, 0, 0],
    rotation: [0, Math.PI / 2, 0],
  }));

  // top
  // usePlane(() => ({
  //   position: [0, height, 0],
  //   rotation: [Math.PI / 2, 0, 0],
  // }));
  // bottom
  usePlane(() => ({
    position: [0, -height * 20, 0],
    rotation: [-Math.PI / 2, 0, 0],
  }));
  return null;
}
