import { Plane } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { NODE_RADIUS, NODE_RADIUS_COLLISION_MULTIPLIER } from "./Nodes/Nodes";
export const FULL_WIDTH = 0.5;
const CENTERED = 0.15;
export const PADDING = 0.08;

export function Collisions() {
  const { viewport } = useThree();
  const width = viewport.width * (FULL_WIDTH - PADDING);
  const height = viewport.height * 0.02;
  const depth = NODE_RADIUS * NODE_RADIUS_COLLISION_MULTIPLIER * 1.000001;

  // // back, front
  // usePlane(() => ({ position: [0, 0, -depth], rotation: [0, 0, 0] }));
  // usePlane(() => ({ position: [0, 0, depth], rotation: [0, -Math.PI, 0] }));

  // // left, right
  // usePlane(() => ({
  //   position: [width, 0, 0],
  //   rotation: [0, -Math.PI / 2, 0],
  // }));
  // usePlane(() => ({
  //   position: [-width, 0, 0],
  //   rotation: [0, Math.PI / 2, 0],
  // }));

  // top
  // usePlane(() => ({
  //   position: [0, height, 0],
  //   rotation: [Math.PI / 2, 0, 0],
  // }));
  // bottom
  // usePlane(() => ({
  //   position: [0, -height * 20, 0],
  //   rotation: [-Math.PI / 2, 0, 0],
  // }));

  const planeProps = {
    color: "lightblue",
    args: [100, 100, 1, 1] as any,
  };
  return (
    <>
      {/*
  // back, front
   */}
      <RigidBody
        {...{ position: [0, 0, -(depth * 1.25)], rotation: [0, 0, 0] }}
      >
        <Plane {...planeProps} />
      </RigidBody>
      <RigidBody
        {...{ position: [0, 0, depth * 1.25], rotation: [0, -Math.PI, 0] }}
      >
        <Plane {...planeProps} />
      </RigidBody>
      {/*
  // left, right
       */}
      <RigidBody>
        <Plane
          {...planeProps}
          {...{
            position: [width, 0, 0],
            rotation: [0, -Math.PI / 2, 0],
          }}
        />
      </RigidBody>
      <RigidBody
        {...{
          position: [-width, 0, 0],
          rotation: [0, Math.PI / 2, 0],
        }}
      >
        <Plane {...planeProps} />
      </RigidBody>
      {/*
  // bottom
       */}
      <RigidBody
        {...{
          position: [0, -height * 20, 0],
          rotation: [-Math.PI / 2, 0, 0],
        }}
      >
        <Plane {...planeProps} />
      </RigidBody>
    </>
  );
}
