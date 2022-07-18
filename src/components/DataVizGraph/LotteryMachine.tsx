import {
  useTexture,
  Sky,
  Environment,
  Effects as EffectComposer,
} from "@react-three/drei";
import * as THREE from "three";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { Debug, Physics, useSphere } from "@react-three/cannon";
import { SSAOPass } from "three-stdlib";
import { useFilters } from "../../store/store";
import { useMemo, useState } from "react";

extend({ SSAOPass });

const RADIUS = 0.5;
const rfs = THREE.MathUtils.randFloatSpread;
const sphereGeometry = new THREE.SphereGeometry(RADIUS, 32, 32);
const baubleMaterial = new THREE.MeshStandardMaterial({
  color: "red",
  roughness: 0,
  envMapIntensity: 0.2,
  emissive: "#370037",
});

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
      <Debug>
        <ColliderSphere />
        <Clump />
      </Debug>
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
function Clump({
  mat = new THREE.Matrix4(),
  vec = new THREE.Vector3(),
  ...props
}) {
  const texture = useTexture("/cross.jpg");
  const [ref, api] = useSphere<any>(() => ({
    args: [RADIUS],
    mass: 1,
    angularDamping: 0.1,
    linearDamping: 0.65,
    position: [rfs(20), rfs(20), rfs(20)],
  }));
  const [, , filteredNodes] = useFilters();

  const filteredNodesRandom = useMemo(
    () => shuffleArray([...filteredNodes]).slice(0, 30),
    [filteredNodes]
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
  return (
    <instancedMesh
      ref={ref}
      castShadow
      receiveShadow
      args={[undefined, undefined, filteredNodesRandom.length]}
      geometry={sphereGeometry}
      material={baubleMaterial}
      material-map={texture}
    />
  );
}
const COLLIDER_RADIUS = RADIUS * 3;
function ColliderSphere() {
  const [shuffling, setShuffling] = useState(false);
  const viewport = useThree((state) => state.viewport);
  const [, api] = useSphere(() => ({
    type: "Kinematic",
    args: [COLLIDER_RADIUS],
    position: [0, 0, 0],
  }));
  return useFrame((state) =>
    // TODO move randomly during shuffle
    // TODO tooltip
    api.position.set(
      (state.mouse.x * viewport.width) / 2,
      (state.mouse.y * viewport.height) / 2,
      0
    )
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
