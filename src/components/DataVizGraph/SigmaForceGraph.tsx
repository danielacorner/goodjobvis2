import { NOC_NODES } from "../../assets/NOC-node";
import { ForceGraph2D } from "react-force-graph";
import { useWindowSize } from "../../hooks/useWindowSize";
import styled from "styled-components";
import { useEffect, useRef } from "react";
import { NOCDataType } from "../../utils/types";
import * as d3 from "d3";
import { useControls } from "leva";
import {
  Sigma,
  SigmaEnableWebGL,
  RandomizeNodePositions,
  RelativeSize,
  NodeShapes,
  Filter,
} from "react-sigma";
// react-sigma https://dunnock.github.io/react-sigma/?path=/story/plugins--noverlap
// react-sigma https://github.com/dunnock/react-sigma#components-reference

const myGraph = {
  nodes: NOC_NODES,
  edges: [],
  // edges: [{ id: "e1", source: "n1", target: "n2", label: "SEES" }],
};
type Sigma$Node$Shapes =
  | "def"
  | "pacman"
  | "star"
  | "equilateral"
  | "cross"
  | "diamond"
  | "circle"
  | "square";

export function SigmaForceGraph() {
  const { width, height } = useWindowSize();
  function filterNodesFn(node) {
    return true;
  }
  return (
    <ForceGraphStyles>
      <Sigma
        // onSigmaException
        // onClickEdge
        // onOverNode
        // onOutNode
        // onOverEdge
        // onOutEdge
        // onClickStage

        onClickNode={(e) => console.log("click node: " + e.data.node.label)}
        onOverNode={(e) => console.log("Mouse over node: " + e.data.node.label)}
        graph={{
          ...myGraph,
          nodes: myGraph.nodes.map((node) => ({
            ...node,
            size: node.workers,
            x: Math.random() * width,
            y: Math.random() * height,
          })),
        }}
        style={{
          height: "100vh",
          width: "100%",
        }}
        settings={{ drawEdges: false, clone: false, enableZoom: false }}
        renderer="webgl"
        // renderer="canvas"
      >
        <NodeShapes default={"star" as Sigma$Node$Shapes} />
        {/* <SigmaEnableWebGL /> */}
        {/* <RandomizeNodePositions /> */}
        <Filter nodesBy={(node) => filterNodesFn(node)} />
      </Sigma>
    </ForceGraphStyles>
  );
}

export function ForceGraphOld() {
  const { width, height } = useWindowSize();
  const ref = useRef();
  useTheForce(ref);

  return (
    <ForceGraphStyles className="ForceGraphStyles">
      <ForceGraph2D
        nodeLabel={(node) => (node as NOCDataType).job}
        ref={ref}
        enablePointerInteraction={false}
        enablePanInteraction={false}
        enableZoomInteraction={false}
        d3AlphaDecay={0}
        d3VelocityDecay={0.01}
        warmupTicks={0}
        cooldownTime={Infinity}
        graphData={{ nodes: NOC_NODES, links: [] }}
        {...{ width, height }}
      />
    </ForceGraphStyles>
  );
}
const ForceGraphStyles = styled.div`
  pointer-events: none;
  position: fixed;
  inset: 0;
`;
const MULT = 0.001;
function useTheForce(ref) {
  const { width, height } = useWindowSize();
  const { strengthY, strengthX, strengthCharge, strengthCollide } = useControls(
    {
      strengthY: 0,
      strengthX: 0,
      strengthCharge: 0,
      strengthCollide: 0,
    }
  );

  useEffect(() => {
    ref.current.d3Force("link", null);
    ref.current.d3Force("charge", null);
    ref.current.d3Force("center", null);

    // ref.current.d3Force(
    //   "x",
    //   d3
    //     .forceX()
    //     .strength(strengthX * MULT)
    //     .x(function (d, i) {
    //       if (i === 0) {
    //         console.log(
    //           "???????? ~ file: ForceGraph.tsx ~ line 78 ~ ref.current.d3Force ~ d",
    //           d
    //         );
    //       }
    //       const datum = d as NOCDataType;
    //       return datum.automationRisk;
    //     })
    // );
    // ref.current.d3Force(
    //   "y",
    //   d3
    //     .forceY()
    //     .strength(strengthY * MULT)
    //     .y(height / 2)
    // );
    ref.current.d3Force("center", d3.forceCenter().x(0).y(0)); // Attraction to the center of the svg area
    // ref.current.d3Force(
    //   "charge",
    //   d3.forceManyBody().strength(strengthCharge * MULT)
    // ); // Nodes are attracted one each other of value is > 0
    // ref.current.d3Force(
    //   "collide",
    //   d3
    //     .forceCollide()
    //     .strength(strengthCollide * MULT)
    //     .radius(32)
    //     .iterations(1)
    // ); // Force that avoids circle overlapping
  }, [strengthX, strengthY, strengthCharge, strengthCollide, ref]);
  // gravitate nodes together
  // ref.current.d3Force(
  //   "gravity",
  //   d3
  //     .forceManyBody()
  //     .strength((node, idx, nodes) => {
  //       return 1;
  //     })
  //     // turn off gravity when nodes get close enough together
  //     .distanceMin(width * 2)
  //   // so that you can drag nodes apart and have them stop pulling back together, max distance
  // );
  // repel nodes from each other
  // ref.current.d3Force(
  //   "charge",
  //   d3
  //     .forceManyBody()
  //     .strength((node, idx, nodes) => {
  //       return 10;
  //     })
  //     // .strength((node) => ((node as Tweet).isUserNode ? -360 : -30))
  //     // max distance to push other nodes away
  //     .distanceMax(5)
  // );

  // ref.current.d3Force("collide", d3.forceCollide(5));
  // ref.current.d3Force("link", null);

  // ref.current.d3Force("center", d3.forceCenter());

  // var simulation = d3.forceSimulation()

  // https://d3-graph-gallery.com/graph/circularpacking_group.html
  // https://www.npmjs.com/package/react-force-graph
  return null;
}
