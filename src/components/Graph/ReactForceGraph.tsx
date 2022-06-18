import styled from "styled-components";
import { useRef } from "react";
import { ForceGraph3D } from "react-force-graph";
import { useWindowSize } from "../../hooks/useWindowSize";
import { useCurrentStoryStep } from "../../store/store";
import { colors, INDUSTRY_COLORS } from "../../utils/constants";
import { GraphNodeType } from "../../utils/types";

export function ReactForceGraph() {
  const { graphData } = useCurrentStoryStep();

  //
  // use the force (d3 force simulation controls)
  //
  // const graphWithUsers = useGraphWithUsersAndLinks();
  // useTheForce(fgRef.current, graphWithUsers);

  const fgRef = useRef();

  const { width, height } = useWindowSize();

  return (
    // <ForceGraph2D ref={fgRef} graphData={graphData} {...forceGraphProps} />
    <ReactForceGraphStyles>
      <ForceGraph3D
        // ref={fgRef}
        graphData={{
          nodes: graphData.nodes,
          links: graphData.links,
        }}
        {...{
          width,
          height,
          enablePointerInteraction: false,
          enableNodeDrag: false,
          enableNavigationControls: false,
          // warmupTicks: 1,
          // cooldownTicks: 1000 * 100,
          // cooldownTime: 1000,
          d3AlphaDecay: 0.1,
          d3VelocityDecay: 0.6,
          // d3AlphaMin: 0.1,
          nodeRelSize: 1,
          nodeVal: (node) => {
            return (node as GraphNodeType).workers;
          },
          nodeColor: (node) => {
            //   return INDUSTRY_COLORS[(node as GraphNodeType).industry];
            return (node as GraphNodeType).color /* automationRisk color */;
          },
          backgroundColor: colors.appBackground,
        }}
      />
    </ReactForceGraphStyles>
  );
}
const ReactForceGraphStyles = styled.div`
  position: fixed;
  inset: 0;
`;
