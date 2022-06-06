import { NOC_NODES } from "../../assets/NOC-node";
import { ForceGraph2D } from "react-force-graph";
import { useWindowSize } from "../../hooks/useWindowSize";
import styled from "styled-components";
import { useRef } from "react";
import { NOCDataType } from "../../utils/types";
import * as d3 from "d3";
import { useMount } from "../../utils/constants";

export function ForceGraph() {
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
  position: fixed;
  inset: 0;
`;
function useTheForce(ref) {
  const { width, height } = useWindowSize();
  useMount(() => {
    ref.current.d3Force("link", null);
    ref.current.d3Force("charge", null);
    ref.current.d3Force("center", null);

    // gravitate nodes together
    ref.current.d3Force(
      "gravity",
      d3
        .forceManyBody()
        .strength((node, idx, nodes) => {
          return 1;
        })
        // turn off gravity when nodes get close enough together
        .distanceMin(width * 2)
      // so that you can drag nodes apart and have them stop pulling back together, max distance
    );

    // repel nodes from each other
    ref.current.d3Force(
      "charge",
      d3
        .forceManyBody()
        .strength((node, idx, nodes) => {
          return 10;
        })
        // .strength((node) => ((node as Tweet).isUserNode ? -360 : -30))
        // max distance to push other nodes away
        .distanceMax(5)
    );

    // ref.current.d3Force("collide", d3.forceCollide(5));
    // ref.current.d3Force("link", null);

    // ref.current.d3Force("center", d3.forceCenter());
  });
  return null;
}
