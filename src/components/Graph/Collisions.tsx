import { usePlane } from "@react-three/cannon";
import { useThree } from "@react-three/fiber";

const DEPTH = 9;
export function Collisions() {
  const { viewport } = useThree();
  const width = viewport.width * 0.15;
  const height = viewport.height * 0.1;

  // back, front
  usePlane(() => ({ position: [0, 0, -DEPTH], rotation: [0, 0, 0] }));
  usePlane(() => ({ position: [0, 0, DEPTH], rotation: [0, -Math.PI, 0] }));

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
  usePlane(() => ({
    position: [0, height, 0],
    rotation: [Math.PI / 2, 0, 0],
  }));
  // bottom
  usePlane(() => ({
    position: [0, -height * 20, 0],
    rotation: [-Math.PI / 2, 0, 0],
  }));
  return null;
}
