import * as THREE from "three";
import NodeBillboard from "./NodeBillboard";
import { useSphere } from "@react-three/cannon";
import { WIDTH_SEGMENTS } from "../../../utils/constants";
import { useCurrentStepIdx } from "../../../App";
import { useEffect, useMemo, useRef, useState } from "react";
import { NOC_STATS } from "../../../utils/STORY_STEPS";
import { interpolateRdGy } from "d3-scale-chromatic";
import { useFrame } from "@react-three/fiber";
// const colors = interpolateRdGy();
// const colorScale =

// instanced physics in r3f/cannon https://codesandbox.io/s/r3f-cannon-instanced-physics-g1s88
// instanced nodes https://codesandbox.io/s/r3f-instanced-colors-5o0qu?file=/src/index.js:520-530
// https://codesandbox.io/s/instanced-vertex-colors-8fo01?from-embed=&file=/src/index.js
const tempColor = new THREE.Color();
const tempObject = new THREE.Object3D();

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

  const meshRef = useRef(null as any);
  const prevRef = useRef(null as any);
  const [instancedSphereRef, api] = useSphere(
    () => ({
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
    }),
    meshRef
  );

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
  // const tempObject = new THREE.Object3D()
  const colors = [...new Array(nodes.length)].map((_, idx) =>
    getNodeColor(nodes, idx)
  );

  // const [hovered, set] = useState()
  const colorArray = useMemo(
    () =>
      Float32Array.from(
        [...new Array(nodes.length)].flatMap((_, i) => {
          const colHex = getNodeColor(nodes, i);

          return tempColor.set(colHex).toArray();
        })
      ),
    [nodes]
  );
  const [hovered, setHoveredId] = useState<number | undefined>(undefined);

  useFrame((state) => {
    if (!meshRef.current) {
      return;
    }
    const time = state.clock.getElapsedTime();
    for (let i = 0; i < nodes.length; i++) {
      if (hovered !== prevRef.current) {
        const nodeColor = i === hovered ? "white" : getNodeColor(nodes, i);
        console.log("🌟🚨 ~ useFrame ~ nodeColor", nodeColor);
        tempColor.set(nodeColor).toArray(colorArray, i * 3);
        meshRef.current.geometry.attributes.color.needsUpdate = true;
      }

      // tempObject.position.set(5 - i, 5 - 2, 5 - 6);
      // tempObject.rotation.y =
      //   Math.sin(i / 4 + time) +
      //   Math.sin(1 / 4 + time) +
      //   Math.sin(3 / 4 + time);
      // tempObject.rotation.z = tempObject.rotation.y * 2;
      // const scale = (data[id].scale = THREE.MathUtils.lerp(
      //   data[id].scale,
      //   id === hovered ? 3 : 1,
      //   0.1
      // ));
      // tempObject.scale.setScalar(scale);
      tempObject.updateMatrix();
      // meshRef.current.setMatrixAt(i, tempObject.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      (
      <instancedMesh
        onPointerEnter={(e) => {
          console.log("🌟🚨 ~ Nodes ~ PointerEnter e", e);
          setHoveredId(e.instanceId);
        }}
        onPointerOut={(e) => setHoveredId(undefined)}
        ref={instancedSphereRef} /* geometry={geo} */
        // castShadow
        // receiveShadow
        args={[null as any, null as any, nodes.length]}
      >
        <sphereBufferGeometry
          args={[NODE_RADIUS, WIDTH_SEGMENTS, WIDTH_SEGMENTS]}
        >
          <instancedBufferAttribute
            attachObject={["attributes", "color"]}
            args={[colorArray, 3]}
          />
        </sphereBufferGeometry>
        <meshPhongMaterial
          attach="material"
          vertexColors={true}
        ></meshPhongMaterial>
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

function getNodeColor(nodes: any, i: number) {
  const pct = nodes[i].automationRisk / NOC_STATS.automationRisk.max;
  const col = interpolateRdGy(pct);
  const rgb = col.slice(`rgb(`.length, -`)`.length).split(", ");
  const [r, g, b] = rgb.map(Number);
  const colHex = rgbToHex(r, g, b);
  return colHex;
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

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
