import { Canvas, useFrame } from "@react-three/fiber";
import { ForceGraph2D } from "react-force-graph";
import { GraphDataType, NOCDataType } from "../types";
import { useForceGraphProps } from "./useForceGraphProps";
import { Instances, Instance } from "./Instances";
import { useRef } from "react";

export function Graph({ graphData }: { graphData: GraphDataType }) {
  const { fgRef, forceGraphProps } = useForceGraphProps();

  //
  // use the force (d3 force simulation controls)
  //
  // const graphWithUsers = useGraphWithUsersAndLinks();
  // useTheForce(fgRef.current, graphWithUsers);

  return (
    <ForceGraph2D ref={fgRef} graphData={graphData} {...forceGraphProps} />
  );
}

export function Graph3D({ graphData }: { graphData: GraphDataType }) {
  return (
    <Canvas>
      {graphData.nodes.map((node) => (
        <Node {...{ node }} />
      ))}
    </Canvas>
  );
}

function Node({ node }: { node: NOCDataType }) {
  return (
    <Instances>
      <boxBufferGeometry attach="geometry" />
      <meshPhongMaterial attach="material" color="lightblue" />
      <Instance position={[1, 1, 0]} rotation={[0, 0, Math.PI / 3]}>
        <group rotation={[Math.PI / 10, 0, 0]}>
          <Instance position={[1, 1, 0]} rotation={[0, 0, -Math.PI / 3]}>
            <Instance position={[0, -5, 0]} rotation={[0, 0, -Math.PI / 3]}>
              <group position={[0, 0, 2]}>
                <Test />
              </group>
            </Instance>
          </Instance>
        </group>
      </Instance>
    </Instances>
  );
}

function Test() {
  const instance = useRef(null as any);
  useFrame(() => {
    instance.current.rotation.x =
      instance.current.rotation.y =
      instance.current.rotation.z +=
        0.025;
    instance.current.update();
  });
  return <Instance position={[-3, 0, 0]} ref={instance} />;
}
