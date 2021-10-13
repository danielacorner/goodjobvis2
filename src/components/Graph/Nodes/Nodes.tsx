import * as THREE from "three";
import NodeBillboard, { NodeBillboardHtml } from "./NodeBillboard";
import { useSphere } from "@react-three/cannon";
import { WIDTH_SEGMENTS } from "../../../utils/constants";
import { useCurrentStepIdx } from "../../../App";
import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { NOC_NODES } from "../../../assets/NOC-node";
import { useAtom } from "jotai";
import { tooltipNodeAtom } from "../../../store/store";
import { Html, Instance, Instances } from "@react-three/drei";
// const colors = interpolateRdGy();
// const colorScale =
let first = true;
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
  const colors = nodes.map((n) => n.color);

  // const [hovered, set] = useState()
  const colorArray = useMemo(
    () =>
      Float32Array.from(
        nodes.flatMap((n, i) => {
          return tempColor.set(n.color || "tomato").toArray();
        })
      ),
    [nodes]
  );
  const [hovered, setHoveredId] = useState<number | undefined>(undefined);

  useFrame((state) => {
    if (!meshRef.current) {
      return;
    }
    // const time = state.clock.getElapsedTime();
    for (let i = 0; i < nodes.length; i++) {
      if (hovered !== prevRef.current) {
        const nodeColor = i === hovered ? "white" : nodes[i].color;
        tempColor.set(nodeColor || "tomato").toArray(colorArray, i * 3);
        if (meshRef.current?.geometry?.attributes?.color) {
          meshRef.current.geometry.attributes.color.needsUpdate = true;
        }

        const scale = (nodes[i].scale = THREE.MathUtils.lerp(
          nodes[i].scale || 0,
          i === hovered ? 3 : 1,
          0.1
        ));
        tempObject.scale.setScalar(scale);

        // const scale = i === hovered ? 3 : 1;
        tempObject.scale.setScalar(scale);
        // meshRef.current.geometry.attributes.scale.needsUpdate = true;
        tempObject.updateMatrix();
      }

      // tempObject.position.set(5 - i, 5 - 2, 5 - 6);
      // tempObject.rotation.y =
      //   Math.sin(i / 4 + time) +
      //   Math.sin(1 / 4 + time) +
      //   Math.sin(3 / 4 + time);
      // tempObject.rotation.z = tempObject.rotation.y * 2;
      // meshRef.current.setMatrixAt(i, tempObject.matrix);
    }
    if (meshRef.current?.instancedMatrix) {
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  const positions = useMemo(
    () =>
      nodes.map((n) => [
        Math.random() * dx - dx / 2, //x
        Math.random() * dy - dy / 2, //y
        Math.random() * dz - dz / 2, //y
        // eslint-disable-next-line react-hooks/exhaustive-deps
      ]),
    [
      // nodes
    ]
  );
  const positionsRef = useRef(positions);
  useEffect(() => {
    nodes.forEach(
      (_, idx) => {
        api.at(idx).position.subscribe((v) => {
          positionsRef.current[idx] = v;
        });
      },
      [api]
    );
  });
  // useEffect(() => api.velocity.subscribe((v) => (velocity.current = v)), [api]);

  const [tooltipNode, setTooltipNode] = useAtom(tooltipNodeAtom);
  return (
    <>
      (
      {/* Instances https://codesandbox.io/s/floating-instanced-shoes-h8o2d?file=/src/App.js */}
      <Instances
        material={mat}
        geometry={geo}
        limit={1000} // Optional: max amount of items (for calculating buffer size)
        range={1000} // Optional: draw-range
      >
        <instancedMesh
          // onPointerEnter={(e) => {
          //   console.log("🌟🚨 ~ Nodes ~ PointerEnter e", e);
          //   const node =
          //     e.instanceId || e.instanceId === 0
          //       ? nodes[e.instanceId]
          //       : undefined;
          //   if (node) {
          //     setTooltipNode({ ...node, position: { x: e.pageX, y: e.pageY } });
          //   }
          //   setHoveredId(e.instanceId);
          // }}
          // onPointerOut={(e) => setHoveredId(undefined)}
          ref={instancedSphereRef} /* geometry={geo} */
          // // castShadow
          // // receiveShadow
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
        {nodes.map((node, idx) => (
          <group
            onPointerEnter={(e) => {
              console.log("🌟🚨 ~ Nodes ~ PointerEnter e", e);
              const node =
                e.instanceId || e.instanceId === 0
                  ? nodes[e.instanceId]
                  : undefined;
              if (node) {
                setTooltipNode({
                  ...node,
                  position: { x: e.pageX, y: e.pageY },
                });
              }
              setHoveredId(e.instanceId);
            }}
            onPointerOut={(e) => setHoveredId(undefined)}
          >
            <Node
              {...{
                node,
                idx,
                position: positions[idx],
              }}
            />
            <Html
              position={positions[idx] as any}
              key={Math.random()}
              // transform={true}
              // sprite={true}
              calculatePosition={(el, camera, size) => {
                if (first) {
                  first = false;
                  console.log("🌟🚨 ~ Nodes ~ positionsRef", positionsRef);
                  console.log("🌟🚨 ~ Nodes ~ el", el);
                  console.log("🌟🚨 ~ Nodes ~ api", api);
                  console.log("🌟🚨 ~ Nodes ~ api.at", api.at(idx));
                  console.log(
                    "🌟🚨 ~ Nodes ~ instancedSphereRef",
                    instancedSphereRef
                  );
                }
                return positionsRef.current[idx];
              }}
            >
              hi hi hi
            </Html>
          </group>
        ))}
      </Instances>
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
const color = new THREE.Color();

function Node({ node, idx, position, ...props }) {
  const ref = useRef(null as any);
  const groupRef = useRef(null as any);
  const [hovered, setHover] = useState(false);
  useFrame((state) => {
    // const t = state.clock.getElapsedTime() + random * 10000
    // ref.current.rotation.set(Math.cos(t / 4) / 2, Math.sin(t / 4) / 2, Math.cos(t / 1.5) / 2)
    // ref.current.position.y = Math.sin(t / 1.5) / 2
    // ref.current.scale.x = ref.current.scale.y = ref.current.scale.z = THREE.MathUtils.lerp(ref.current.scale.z, hovered ? 1.4 : 1, 0.1)
    ref.current?.color.lerp(
      color.set(hovered ? "red" : "white"),
      hovered ? 1 : 0.1
    );

    groupRef.current?.position.set(
      ref.current.position.x,
      ref.current.position.y,
      ref.current.position.z
    );
  });
  return (
    <group {...props} position={position}>
      <Instance
        ref={ref}
        onPointerOver={(e) => {
          // e.stopPropagation();
          setHover(true);
        }}
        onPointerOut={() => setHover(false)}
      >
        <NodeBillboardHtml node={node} idx={idx} />
      </Instance>
    </group>
  );
}
// function Node({ node, geo, mat, position, idx }) {
//   const [sphereRef, api] = useSphere(() => ({
//     mass: 1,
//     position,
//     linearDamping: 0.1,
//     // material: { friction: 0, restitution: 0 },
//     geometry: geo,
//     args: NODE_RADIUS * NODE_RADIUS_COLLISION_MULTIPLIER,
//   }));

//   return (
//     <mesh ref={sphereRef} geometry={geo} material={mat} position={position}>
//       <NodeBillboard node={node} idx={idx} />
//     </mesh>
//   );
// }

// const oldInstancedMesh = <instancedMesh
// onPointerEnter={(e) => {
//   console.log("🌟🚨 ~ Nodes ~ PointerEnter e", e);
//   const node =
//     e.instanceId || e.instanceId === 0
//       ? nodes[e.instanceId]
//       : undefined;
//   if (node) {
//     setTooltipNode({ ...node, position: { x: e.pageX, y: e.pageY } });
//   }
//   setHoveredId(e.instanceId);
// }}
// onPointerOut={(e) => setHoveredId(undefined)}
// ref={instancedSphereRef} /* geometry={geo} */
// // castShadow
// // receiveShadow
// args={[null as any, null as any, nodes.length]}
// >
// <sphereBufferGeometry
//   args={[NODE_RADIUS, WIDTH_SEGMENTS, WIDTH_SEGMENTS]}
// >
//   <instancedBufferAttribute
//     attachObject={["attributes", "color"]}
//     args={[colorArray, 3]}
//   />
// </sphereBufferGeometry>
// <meshPhongMaterial
//   attach="material"
//   vertexColors={true}
// ></meshPhongMaterial>
// </instancedMesh>
