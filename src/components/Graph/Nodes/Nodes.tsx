import { GraphDataType } from "../../../utils/types";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import NodeBillboard from "./NodeBillboard";
import { useTheForce } from "../Graph3D";
import { useSphere } from "@react-three/cannon";
import { WIDTH_SEGMENTS } from "../../../utils/constants";

export function Nodes({ graphData }: { graphData: GraphDataType }) {
  let group = useRef<any>();

  useTheForce(group, graphData);

  const [geo, mat, coords] = useMemo(() => {
    const geo = new THREE.SphereBufferGeometry(
      NODE_RADIUS,
      WIDTH_SEGMENTS,
      WIDTH_SEGMENTS
    );
    const mat = new THREE.MeshLambertMaterial({
      color: new THREE.Color("lightblue"),
    });
    const array = [...new Array(graphData.nodes.length)];
    const coords = array.map((i) => [
      Math.random() * 50 - 25,
      Math.random() * 50 - 25,
      Math.random() * 50 - 25,
    ]);
    return [geo, mat, coords];
  }, [graphData.nodes.length]);

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

const NODE_RADIUS = 0.1;
const NODE_RADIUS_COLLISION_MULTIPLIER = 1.5;

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
