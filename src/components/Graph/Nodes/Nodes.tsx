import { GraphDataType } from "../../../utils/types";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import NodeBillboard from "./NodeBillboard";
import { useTheForce } from "../Graph3D";
import { useSphere } from "@react-three/cannon";
import { WIDTH_SEGMENTS } from "../../../utils/constants";
import { useCurrentStepIdx } from "../../../App";

export const NODE_RADIUS = 0.1;
export const NODE_RADIUS_COLLISION_MULTIPLIER = 1.5;

export function Nodes() {
  const [, , currentStep] = useCurrentStepIdx();
  const graphData = currentStep.graphData;
  const nodes = graphData.nodes.slice(0, 100);
  // const nodes = graphData.nodes

  let group = useRef<any>();

  // useTheForce(group, graphData);

  const [geo, mat, coords] = useMemo(() => {
    const geo = new THREE.SphereBufferGeometry(
      NODE_RADIUS,
      WIDTH_SEGMENTS,
      WIDTH_SEGMENTS
    );
    const mat = new THREE.MeshLambertMaterial({
      color: new THREE.Color("lightblue"),
    });
    const array = [...new Array(nodes.length)];
    const dx = 2;
    const dy = 5;
    const dz = 0;
    const coords = array.map((i) => [
      Math.random() * dx - dx / 2, //x
      Math.random() * dy - dy / 2, //y
      Math.random() * dz - dz / 2, //y
    ]);
    return [geo, mat, coords];
  }, [nodes.length]);

  return (
    <group ref={group}>
      {coords.map(([p1, p2, p3], i) => (
        <Node
          key={i}
          {...{ node: graphData.nodes[i], geo, mat, position: [p1, p2, p3] }}
        />
      ))}
    </group>
  );
}

function Node({ node, geo, mat, position }) {
  const [sphereRef, api] = useSphere(() => ({
    mass: 1,
    position,
    linearDamping: 0.1,
    material: { friction: 0, restitution: 0 },
    geometry: geo,
    args: NODE_RADIUS * NODE_RADIUS_COLLISION_MULTIPLIER,
  }));

  return (
    <mesh ref={sphereRef} geometry={geo} material={mat} position={position}>
      <NodeBillboard node={node} />
    </mesh>
  );
}
