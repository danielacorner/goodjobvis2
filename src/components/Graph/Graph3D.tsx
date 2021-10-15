import { Canvas, useFrame } from "@react-three/fiber";
import { GraphDataType } from "../../utils/types";
import { useWindowSize } from "../../hooks/useWindowSize";
import { OrbitControls, Stats } from "@react-three/drei";
import { Nodes } from "./Nodes/Nodes";
import { Collisions } from "./Collisions";
import { Debug, Physics } from "@react-three/cannon";
import { useControls } from "leva";
import { useEffect, useState } from "react";
import { useCurrentStepIdx } from "../../App";
import { tooltipNodeAtom } from "../../store/store";
import { useAtom } from "jotai";

export function Graph3D() {
  const windowSize = useWindowSize();
  const { px, py, pz, showStats } = useControls({
    px: -2.15,
    py: 5,
    pz: 0.1,
    showStats: true,
  });

  // flicker the nodes when the step changes
  // so that the instances can reboot
  const [flicker, setFlicker] = useState(true);
  const [currentStepIdx] = useCurrentStepIdx();
  const [, setTooltipNode] = useAtom(tooltipNodeAtom);
  useEffect(() => {
    setFlicker(false);
    setTimeout(() => {
      setFlicker(true);
    });
  }, [currentStepIdx]);

  return (
    <Canvas
      style={{
        width: windowSize.width,
        height: windowSize.height,
        position: "fixed",
        inset: 0,
      }}
      // orthographic={false}
      // children                      // Either a function child (which receives state) or regular children
      // gl                            // Props that go into the default webGL-renderer
      // camera                        // Props that go into the default camera
      // raycaster                     // Props that go into the default raycaster
      // shadowMap                     // Props that go into gl.shadowMap, can also be set true for PCFsoft
      // colorManagement = false       // Auto sRGBEncoding encoding for all colors and textures + ACESFilmic
      // vr = false                    // Switches renderer to VR mode, then uses gl.setAnimationLoop
      // gl2 = false                   // Enables webgl2
      // concurrent = false            // Enables React concurrent mode
      // concurrent = false            // Enables React concurrent mode
      // resize = undefined            // Resize config, see react-use-measure's options
      // orthographic = false          // Creates an orthographic camera if true
      // noEvents = false              // Switch off raytracing and event support
      // pixelRatio = undefined        // You could provide window.devicePixelRatio if you like
      // invalidateFrameloop = false   // When true it only renders on changes, when false it's a game loop
      // updateDefaultCamera = true    // Adjusts default camera on size changes
      // onCreated                     // Callback when vdom is ready (you can block first render via promise)
      onPointerMissed={() => setTooltipNode(null)}
      gl={{ alpha: true, stencil: false, depth: true, antialias: false }}
      camera={{
        position: [0, 0, -10],
        fov: 35,
        near: 0.1,
        far: 2000,
      }}
    >
      {process.env.NODE_ENV === "development" && showStats && <Stats />}
      {process.env.NODE_ENV === "development" && (
        <OrbitControls
          autoRotate={false}
          autoRotateSpeed={0.1}
          enableDamping={true}
          enableZoom={false}
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
      <Physics
        // shouldInvalidate={isPaused}
        // {...{ gravity: [0, 0, 0] }}

        defaultContactMaterial={{
          contactEquationStiffness: 1e6,
          // friction: 1000000,
          restitution: 0.1,
          // contactEquationRelaxation: 0,
          // frictionEquationStiffness: 0,
          // frictionEquationRelaxation: 0,
        }}
      >
        {flicker && <Nodes />}
        <Collisions />
        <ambientLight intensity={0.4} />
        <pointLight position={[150, 150, 150]} intensity={0.3} />
        {/* <directionalLight position={[px, py, pz]} intensity={1} />
        <ambientLight intensity={0.1} /> */}
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
