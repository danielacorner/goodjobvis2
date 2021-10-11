import { useMemo, useRef } from "react";
import * as THREE from "three";
import NodeBillboard from "./NodeBillboard";
import { useSphere } from "@react-three/cannon";
import { WIDTH_SEGMENTS } from "../../../utils/constants";
import { useCurrentStepIdx } from "../../../App";

// instanced physics in r3f/cannon https://codesandbox.io/s/r3f-cannon-instanced-physics-g1s88

export const NODE_RADIUS = 0.1;
export const NODE_RADIUS_COLLISION_MULTIPLIER = 1.5;

export function Nodes() {
  const [, , currentStep] = useCurrentStepIdx();
  const graphData = currentStep?.graphData;
  const nodes = graphData?.nodes || [];

  // Make instanced objects known in cannons physics world
  // const data = useMemo(() => [...new Array(nodes.length)].map(() => [Math.random() - 0.5, Math.random() * 2, Math.random() - 0.5]), [nodes])
  // const bodies = useCannonInstanced(ref, { mass: 1 }, (body, index) => {
  //   body.addShape(new CANNON.Box(new CANNON.Vec3(0.05, 0.05, 0.05)))
  //   body.position.set(...data[index])
  // })

  // let group = useRef<any>();

  // useTheForce(group, graphData);

  const dx = 2;
  const dy = 5;
  const dz = 0;

  const [geo, mat, coords] = useMemo(() => {
    const geo = new THREE.SphereBufferGeometry(
      NODE_RADIUS,
      WIDTH_SEGMENTS,
      WIDTH_SEGMENTS
    );
    const mat = new THREE.MeshPhongMaterial({
      color: new THREE.Color("lightblue"),
    });
    const array = [...new Array(nodes.length)];
    const coords = array.map((i) => [
      Math.random() * dx - dx / 2, //x
      Math.random() * dy - dy / 2, //y
      Math.random() * dz - dz / 2, //y
    ]);
    return [geo, mat, coords];
  }, [nodes.length]);

  const [sphereRef, api] = useSphere(() => ({
    mass: 1,
    position: [
      Math.random() * dx - dx / 2, //x
      Math.random() * dy - dy / 2, //y
      Math.random() * dz - dz / 2, //y
    ],
    linearDamping: 0.1,
    // material: { friction: 0, restitution: 0 },
    // geometry: geo,
    args: NODE_RADIUS * NODE_RADIUS_COLLISION_MULTIPLIER,
  }));

  return (
    <instancedMesh
      ref={sphereRef} /* geometry={geo} */
      args={[null as any, null as any, nodes.length]}
    >
      <sphereBufferGeometry
        attach="geometry"
        args={[NODE_RADIUS, WIDTH_SEGMENTS, WIDTH_SEGMENTS]}
      >
        {/* <instancedBufferAttribute
          attachObject={["attributes", "color"]}
          args={[, 3]}
        /> */}
      </sphereBufferGeometry>
      <meshPhongMaterial
        color={new THREE.Color("lightblue")}
      ></meshPhongMaterial>

      {/* <NodeBillboard node={node} idx={idx} /> */}
    </instancedMesh>
    // {/* {coords.map(([p1, p2, p3], i) => (
    //   <Node
    //     key={i}
    //     {...{
    //       node: graphData.nodes[i],
    //       geo,
    //       mat,
    //       position: [p1, p2, p3],
    //       idx: i,
    //     }}
    //   />
    // ))} */}
  );
}

function Node({ node, geo, mat, position, idx }) {
  const [sphereRef, api] = useSphere(() => ({
    mass: 1,
    position,
    linearDamping: 0.1,
    // material: { friction: 0, restitution: 0 },
    geometry: geo,
    args: NODE_RADIUS * NODE_RADIUS_COLLISION_MULTIPLIER,
  }));

  return (
    <mesh ref={sphereRef} geometry={geo} material={mat} position={position}>
      <NodeBillboard node={node} idx={idx} />
    </mesh>
  );
}
