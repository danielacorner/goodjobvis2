import * as THREE from "three";
import { NodeBillboardHtml } from "./NodeBillboard";
import { useSphere } from "@react-three/cannon";
import {
  MAX_NUM_IMAGES_TO_DISPLAY,
  WIDTH_SEGMENTS,
} from "../../../utils/constants";
import { useCurrentStepIdx } from "../../../App";
import { useEffect, useMemo, useRef, useState } from "react";
import { useAtom } from "jotai";
import { tooltipNodeAtom } from "../../../store/store";
import { Instance, Instances } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useWindowSize } from "../../../hooks/useWindowSize";
import { TOOLTIP_MIN_HEIGHT, TOOLTIP_WIDTH } from "../../../NodeTooltip";
// instanced physics in r3f/cannon https://codesandbox.io/s/r3f-cannon-instanced-physics-g1s88
// instanced nodes https://codesandbox.io/s/r3f-instanced-colors-5o0qu?file=/src/index.js:520-530
// https://codesandbox.io/s/instanced-vertex-colors-8fo01?from-embed=&file=/src/index.js
const tempColor = new THREE.Color();
const tempObject = new THREE.Object3D();

const dx = 2;
const dy = 5;
const dz = 0;

export const NODE_RADIUS = 0.12;
export const NODE_RADIUS_COLLISION_MULTIPLIER = 1.2;

export function Nodes() {
  const [, , currentStep] = useCurrentStepIdx();
  const nodes = useMemo(
    () => currentStep?.graphData?.nodes || [],
    [currentStep]
  );

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

  const positions = useMemo(
    () =>
      nodes.map((n) => [
        Math.random() * dx - dx / 2, //x
        Math.random() * dy - dy / 2, //y
        Math.random() * dz - dz / 2, //y
        // eslint-disable-next-line react-hooks/exhaustive-deps
      ]),
    [nodes]
  );

  return (
    // {/* Instances https://codesandbox.io/s/floating-instanced-shoes-h8o2d?file=/src/App.js */}
    <Instances
      material={mat}
      geometry={geo}
      limit={1000} // Optional: max amount of items (for calculating buffer size)
      range={1000} // Optional: draw-range
    >
      {nodes.map((node, idx) => (
        <Node
          key={node.id}
          {...{
            node,
            nodes,
            showImage: idx < MAX_NUM_IMAGES_TO_DISPLAY,
            position: positions[idx],
          }}
        />
      ))}
    </Instances>
  );
}

const color = new THREE.Color();

function Node({ node, showImage, position }) {
  console.log("🌟🚨 ~ Node ~ node", node);
  const [hovered, setHover] = useState(false);
  const ref = useRef(null as any);

  const [sphereRef, api] = useSphere(
    () => ({
      mass: 1,
      position,
      linearDamping: 0.1,
      // material: { friction: 0, restitution: 0 },
      // geometry: geo,
      args: NODE_RADIUS * NODE_RADIUS_COLLISION_MULTIPLIER,
    }),
    ref
  );

  useFrame(() => {
    // const t = state.clock.getElapsedTime() + random * 10000
    // ref.current.rotation.set(Math.cos(t / 4) / 2, Math.sin(t / 4) / 2, Math.cos(t / 1.5) / 2)
    // ref.current.position.y = Math.sin(t / 1.5) / 2
    ref.current.scale.x =
      ref.current.scale.y =
      ref.current.scale.z =
        THREE.MathUtils.lerp(ref.current.scale.z, hovered ? 1.3 : 1, 0.1);
    ref.current?.color.lerp(
      color.set(hovered ? "white" : node.color),
      hovered ? 1 : 0.1
    );
  });

  // https://github.com/pmndrs/drei#instances
  return (
    <group>
      <Instance ref={sphereRef} color={node.color}>
        <NodeBillboardHtml {...{ node, showImage, setHover }} />
      </Instance>
    </group>
  );
}
