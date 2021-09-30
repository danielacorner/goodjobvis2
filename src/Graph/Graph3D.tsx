import { Canvas, useFrame } from "@react-three/fiber";
import { GraphDataType } from "../types";
import { useMemo, useRef } from "react";
import { useWindowSize } from "../hooks/useWindowSize";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

export function Graph3D({ graphData }: { graphData: GraphDataType }) {
  const windowSize = useWindowSize();
  return (
    <Canvas style={{ width: windowSize.width, height: windowSize.height }}>
      <OrbitControls
        autoRotate={false}
        autoRotateSpeed={0.1}
        enableDamping={true}
        enableZoom={true}
        enablePan={true}
        // maxAzimuthAngle={0.5}
        // maxDistance={500}
        // minAzimuthAngle={-0.5}
        // minDistance={50}
        // minPolarAngle={-0.5}
        // minZoom={0.5}
        // maxZoom={0.5}
      />

      <Nodes {...{ graphData }} />
    </Canvas>
  );
}
function Nodes({ graphData }: { graphData: GraphDataType }) {
  let group = useRef<any>();
  useTheForce(group);
  const [geo, mat, coords] = useMemo(() => {
    const geo = new THREE.SphereBufferGeometry(1, 10, 10);
    const mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("lightblue"),
    });
    const array = [...new Array(graphData.nodes.length)];
    const coords = array.map((i) => [
      Math.random() * 800 - 400,
      Math.random() * 800 - 400,
      Math.random() * 800 - 400,
    ]);
    return [geo, mat, coords];
  }, [graphData.nodes.length]);

  return (
    <group ref={group}>
      {coords.map(([p1, p2, p3], i) => (
        <mesh key={i} geometry={geo} material={mat} position={[p1, p2, p3]} />
      ))}
    </group>
  );
}

function useTheForce(group: React.MutableRefObject<any>) {
  let theta = 0;

  useFrame(() => {
    // Some things maybe shouldn't be declarative, we're in the render-loop here with full access to the instance
    const r = 5 * Math.sin((THREE as any).Math.degToRad((theta += 0.1)));
    const s = Math.cos((THREE as any).Math.degToRad(theta * 2));
    group.current.rotation.set(r, r, r);
    group.current.scale.set(s, s, s);
  });
}
