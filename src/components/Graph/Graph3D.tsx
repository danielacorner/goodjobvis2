import { Canvas, useFrame } from "@react-three/fiber";
import { GraphDataType } from "../../utils/types";
import { useWindowSize } from "../../hooks/useWindowSize";
import { OrbitControls, Stats } from "@react-three/drei";
import { Nodes } from "./Nodes/Nodes";
import { Collisions } from "./Collisions";
import { Physics } from "@react-three/cannon";
import { useControls } from "leva";

export function Graph3D() {
  const windowSize = useWindowSize();
  const { px, py, pz } = useControls({ px: -2.15, py: 5, pz: 0.1 });

  return (
    <Canvas style={{ width: windowSize.width, height: windowSize.height }}>
      {process.env.NODE_ENV === "development" && <Stats />}
      {process.env.NODE_ENV === "development" && (
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
      )}
      <Physics>
        <Nodes />
        <Collisions />
        <directionalLight position={[px, py, pz]} intensity={4} />
      </Physics>
    </Canvas>
  );
}
export function useTheForce(
  group: React.MutableRefObject<any>,
  graphData: GraphDataType
) {
  // let theta = 0;

  useFrame(() => {
    // Some things maybe shouldn't be declarative, we're in the render-loop here with full access to the instance
    // const r = 5 * Math.sin((THREE as any).Math.degToRad((theta += 0.1)));
    // const s = Math.cos((THREE as any).Math.degToRad(theta * 2));
    // group.current.rotation.set(r, r, r);
    const s = 1;
    group.current.scale.set(s, s, s);
  });
}

function Lighting() {}
