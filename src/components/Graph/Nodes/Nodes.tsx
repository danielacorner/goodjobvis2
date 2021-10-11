import * as THREE from "three";
import NodeBillboard from "./NodeBillboard";
import { useSphere } from "@react-three/cannon";
import { WIDTH_SEGMENTS } from "../../../utils/constants";
import { useCurrentStepIdx } from "../../../App";
import { useEffect, useMemo } from "react";
import { NOC_STATS } from "../../../utils/STORY_STEPS";
import { interpolateRdGy } from "d3-scale-chromatic";
// const colors = interpolateRdGy();
// const colorScale =

// instanced physics in r3f/cannon https://codesandbox.io/s/r3f-cannon-instanced-physics-g1s88

export const NODE_RADIUS = 0.1;
export const NODE_RADIUS_COLLISION_MULTIPLIER = 1.5;

export function Nodes() {
  const [, , currentStep] = useCurrentStepIdx();
  const graphData = currentStep?.graphData;
  const nodes = useMemo(() => graphData?.nodes || [], [graphData]);
  // const nodes = useMemo(() => graphData?.nodes || [], [graphData]);

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
  }, [nodes]);

  const isInstanced = true;
  // const isInstanced = nodes.length > 100;

  const [instancedSphereRef, api] = useSphere(() => ({
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

  // useEffect(() => {
  //   if (isInstanced) {
  //     api.position.set(0, -1000, 0);
  //     api.velocity.set(0, 0, 0);
  //     api.wakeUp();
  //   } else {
  //     // api.position.set(0, -1000, 0);
  //     // api.velocity.set(0, 0, 0);
  //     api.sleep();
  //   }
  // }, [isInstanced, api]);

  // change the image at each node
  useEffect(() => {
    // nodes.forEach((node, idx) => {
    //   const sphereNode = api.at(idx);
    //   if (!sphereNode?.sleep) {
    //     return;
    //   }
    //   // sphereNode.position.set(0, idx * 5 + 1000, 0);
    //   // sphereNode.angularVelocity.set(0, 0, 0);
    //   // sphereNode.allowSleep.set(true);
    //   sphereNode.sleep();
    // });
  }, []);

  const colors = useMemo(() => {
    const array = new Float32Array(nodes.length * 3);
    const color = new THREE.Color();
    for (let i = 0; i < nodes.length; i++) {
      const pct = nodes[i].automationRisk / NOC_STATS.automationRisk.max;
      console.log("🌟🚨 ~ colors ~ pct", pct);
      const col = new THREE.Color(interpolateRdGy(pct));
      console.log("🌟🚨 ~ colors ~ col", col);

      color
        .set(col)
        // .convertSRGBToLinear()
        .toArray(array, i * 3);
    }
    return array;
  }, [nodes]);
  console.log("🌟🚨 ~ colors ~ colors", colors);

  return (
    <>
      (
      <instancedMesh
        ref={instancedSphereRef} /* geometry={geo} */
        // castShadow
        // receiveShadow
        args={[null as any, null as any, nodes.length]}
      >
        <sphereBufferGeometry
          attach="geometry"
          args={[NODE_RADIUS, WIDTH_SEGMENTS, WIDTH_SEGMENTS]}
        >
          <instancedBufferAttribute
            attachObject={["attributes", "color"]}
            args={[colors, 3]}
          />
        </sphereBufferGeometry>
        <meshPhongMaterial attach="material"></meshPhongMaterial>
      </instancedMesh>
      )
      {/* {isInstanced ? null : (
        <group>
          {coords.map(([p1, p2, p3], i) => (
            <Node
              key={i}
              {...{
                node: graphData.nodes[i],
                geo,
                mat,
                position: [p1, p2, p3],
                idx: i,
              }}
            />
          ))}
        </group>
      )} */}
    </>
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
