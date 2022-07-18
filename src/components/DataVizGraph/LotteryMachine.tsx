import {
  useTexture,
  Sky,
  Environment,
  Effects as EffectComposer,
  Sphere,
  useDetectGPU,
} from "@react-three/drei";
import * as THREE from "three";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { Debug, Physics, useSphere } from "@react-three/cannon";
import { SSAOPass } from "three-stdlib";
import { useFilters } from "../../store/store";
import { useEffect, useMemo, useRef, useState } from "react";
import { CLUSTER_COLORS, d3SchemeCategory10 } from "../../utils/constants";
extend({ SSAOPass });

const RADIUS = 0.5;
const rfs = THREE.MathUtils.randFloatSpread;
// const sphereGeometry = new THREE.SphereGeometry(RADIUS, 32, 32);
// const baubleMaterial = new THREE.MeshStandardMaterial({
//   color: "white",
//   roughness: 0,
//   envMapIntensity: 0.2,
//   emissive: "#370037",
// });

export const LotteryMachine = () => (
  <Canvas
    style={{ position: "fixed", inset: 0 }}
    shadows
    dpr={[1, 2]}
    camera={{ position: [0, 0, 20], fov: 35, near: 1, far: 40 }}
  >
    <ambientLight intensity={0.25} />
    <spotLight
      intensity={1}
      angle={0.2}
      penumbra={1}
      position={[30, 30, 30]}
      castShadow
      shadow-mapSize={[512, 512]}
    />
    <directionalLight intensity={5} position={[-10, -10, -10]} color="purple" />
    <Physics gravity={[0, 2, 0]} iterations={10}>
      {/* <DebugInDev> */}
      <ColliderSphere />
      <Clump />
      {/* </DebugInDev> */}
    </Physics>
    <Environment files="/adamsbridge.hdr" />
    <Effects />
    <Sky />
  </Canvas>
);
function DebugInDev({ children }) {
  return process.env.NODE_ENV === "development" ? (
    <Debug>{children}</Debug>
  ) : (
    <>{children}</>
  );
}

const tempObject = new THREE.Object3D();
const tempColor = new THREE.Color();
function useNumNodes() {
  const { tier } = useDetectGPU();
  return tier > 2 ? 60 : 30;
}
function useColliderRadius() {
  const { tier } = useDetectGPU();
  return tier > 2 ? RADIUS * 4 : RADIUS * 3;
}
// const COLORS = [...new Array(NUM_NODES)].map(
//   () => palettes[0][Math.floor(Math.random() * palettes[0].length)]
//   // "hsl(" +
//   // Math.round(360 * Math.random()) +
//   // `, 100%, ${Math.round(Math.random() * 64) + 36}%)`
// );
const COLORS = d3SchemeCategory10;

function Clump({
  mat = new THREE.Matrix4(),
  vec = new THREE.Vector3(),
  ...props
}) {
  const numNodes = useNumNodes();
  const texture = useTexture("/worker.jpg");
  const colorArray = useMemo(
    () =>
      // Float32Array.from(
      new Array(numNodes).fill(null).flatMap((_, i) => {
        // const [h, s, l] = hslStringToHSL(COLORS[i]);
        // const hex = hslToHex(
        //   Number(h),
        //   Number(s.slice(0, -1)),
        //   Number(l.slice(0, -1))
        // );
        // const color = hex;
        const color = COLORS[i];
        return color;
      }),
    // ),
    []
  );

  // const colorArray = useMemo(
  //   () =>
  //     Float32Array.from(
  //       [...new Array(NUM_NODES)].flatMap((_, i) => {
  //         const [h, s, l] = hslStringToHSL(colors[i]);
  //         console.log(
  //           "🌟🚨 ~ file: LotteryMachine.tsx ~ line 82 ~ [...newArray ~ [h, s, l]",
  //           [h, s, l]
  //         );
  //         const hex = hslToHex(
  //           Number(h),
  //           Number(s.slice(0, -1)),
  //           Number(l.slice(0, -1))
  //         );
  //         console.log(
  //           "🌟🚨 ~ file: LotteryMachine.tsx ~ line 91 ~ [...newArray ~ hex",
  //           hex
  //         );
  //         return tempColor.set(hex).toArray();
  //       })
  //     ),
  //   []
  // );
  console.log(
    "🌟🚨 ~ file: LotteryMachine.tsx ~ line 85 ~ colorArray",
    colorArray
  );

  const [ref, api] = useSphere<any>(() => ({
    args: [RADIUS],
    mass: 1,
    angularDamping: 0.1,
    linearDamping: 0.65,
    position: [rfs(20), rfs(20), rfs(20)],
  }));
  const [, , filteredNodes] = useFilters();

  const filteredNodesRandom = useMemo(
    () => shuffleArray([...filteredNodes]).slice(0, numNodes),
    [filteredNodes, numNodes]
  );
  useFrame((state) => {
    for (let i = 0; i < filteredNodesRandom.length; i++) {
      // Get current whereabouts of the instanced sphere
      ref.current.getMatrixAt(i, mat);
      // Normalize the position and multiply by a negative force.
      // This is enough to drive it towards the center-point.
      api
        .at(i)
        .applyForce(
          vec
            .setFromMatrixPosition(mat)
            .normalize()
            .multiplyScalar(-50)
            .toArray(),
          [0, 0, 0]
        );
    }
  });
  useEffect(() => {
    for (let index = 0; index < colorArray.length; index++) {
      const node = filteredNodesRandom[index];
      // const color = colorArray[index];
      const color = CLUSTER_COLORS[node.cluster];
      console.log(
        "🌟🚨 ~ file: LotteryMachine.tsx ~ line 169 ~ useEffect ~ color",
        color
      );
      ref.current.setColorAt(index, new THREE.Color(color));
    }
  });
  // const sphereGeometry = new THREE.SphereGeometry(RADIUS, 32, 32);
  return (
    <instancedMesh
      ref={ref}
      castShadow
      receiveShadow
      args={[undefined, undefined, filteredNodesRandom.length]}
      // geometry={sphereGeometry}
      // material={baubleMaterial}
      // material-map={texture}
    >
      <sphereBufferGeometry args={[RADIUS, 32, 32]}>
        {/* <instancedBufferAttribute
          attach="attributes-color"
          count={filteredNodesRandom.length}
          array={colorArray}
        /> */}
      </sphereBufferGeometry>

      <meshStandardMaterial
        map={texture}
        {...{
          // const baubleMaterial = new THREE.MeshStandardMaterial({
          // color: "white",
          roughness: 0,
          envMapIntensity: 0.2,
          emissive: "#370037",
          // });
        }}
        // transmission={1}
      >
        {/* <instancedBufferAttribute
          attach="attributes-color"
          args={[colorArray, 3]}
        /> */}
      </meshStandardMaterial>
    </instancedMesh>
  );
}
function ColliderSphere() {
  const [shuffling, setShuffling] = useState(false);
  const viewport = useThree((state) => state.viewport);

  const colliderRadius = useColliderRadius();
  const [ref, api] = useSphere<any>(() => ({
    type: "Kinematic",
    args: [colliderRadius],
    position: [0, 0, 0],
  }));
  // subscribe to sphere position
  const position = useRef([0, 0, 0]);
  useEffect(() => api.position.subscribe((v) => (position.current = v)), [api]);

  useFrame((state) =>
    // TODO move randomly during shuffle
    // TODO tooltip
    {
      const nextX = (state.mouse.x * viewport.width) / 2;
      const nextY = (state.mouse.y * viewport.height) / 2;
      const nextXL = THREE.MathUtils.lerp(position.current[0], nextX, 0.2);
      const nextYL = THREE.MathUtils.lerp(position.current[1], nextY, 0.2);

      return api.position.set(nextXL, nextYL, 0);
    }
  );
  return (
    <Sphere ref={ref} args={[colliderRadius]}>
      <meshPhysicalMaterial
        transmission={1}
        thickness={colliderRadius}
        roughness={0}
      />
    </Sphere>
  );
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      sSAOPass: any;
    }
  }
}
function Effects(props) {
  const { scene, camera } = useThree();
  return (
    <EffectComposer {...props}>
      <sSAOPass
        args={[scene, camera, 100, 100]}
        kernelRadius={1.2}
        kernelSize={0}
      />
    </EffectComposer>
  );
}
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function hslStringToHSL(hslString) {
  const [h, s, l] = hslString.slice(4, -1).split(",");
  return [h, s, l];
}

function hslToHex(h, s, l) {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0"); // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}
