import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { ForceGraph3D } from "react-force-graph";
import { useWindowSize } from "../../hooks/useWindowSize";
import { useCurrentStoryStep, useFadeOut } from "../../store/store";
import { colors } from "../../utils/constants";
import { GraphNodeType } from "../../utils/types";
import ErrorBoundary from "../ErrorBoundary";

const DEG = Math.PI / 360;
export function ReactForceGraph() {
  const [fadeOut, setFadeOut] = useFadeOut();
  const { graphData } = useCurrentStoryStep();

  //
  // use the force (d3 force simulation controls)
  //
  // const graphWithUsers = useGraphWithUsersAndLinks();
  // useTheForce(fgRef.current, graphWithUsers);

  const fgRef = useRef<any>(null);
  const distance = 1400;

  useEffect(() => {
    if (!fgRef.current) {
      return;
    }
    fgRef.current.cameraPosition({ z: distance });

    // camera orbit
    let angle = 0;
    setInterval(() => {
      fgRef.current.cameraPosition({
        x: distance * Math.sin(angle),
        z: distance * Math.cos(angle),
      });
      angle += 0.33 * DEG;
      fgRef.current.zoomToFit();
    }, 1000 / 60);
  }, []);

  const { width, height } = useWindowSize();
  const [done, setDone] = useState(false);
  // whenever we change steps,
  useEffect(() => {
    // 1. fade out, start the simulation
    setFadeOut(true);
    setDone(false);
    setTimeout(() => {
      // 2. fade in, slow down/stop the simulation
      setFadeOut(false);
      setDone(true);
    }, 1000);
  }, [graphData, setFadeOut]);
  return (
    // https://github.com/vasturiano/react-force-graph
    // <ForceGraph2D ref={fgRef} graphData={graphData} {...forceGraphProps} />
    <ReactForceGraphStyles>
      <ErrorBoundary>
        <ForceGraph3D
          ref={fgRef}
          graphData={{
            nodes: graphData.nodes,
            links: graphData.links,
          }}
          {...{
            width,
            height,
            // enablePointerInteraction: true,
            enableNodeDrag: false,
            enableNavigationControls: false,
            // warmupTicks: 1,
            // cooldownTicks: 1000 * 100,
            // cooldownTime: 1000,
            d3AlphaDecay: done ? 1 : 0.1,
            d3VelocityDecay: 0.6,
            // d3AlphaMin: 0.1,
            showNavInfo: false,
            // onBackgroundClick: () => {
            //   setTooltipNode(null);
            // },
            // onNodeClick: (node) => {},
            // onNodeHover: (node) => {
            //   setTooltipNode((p) => ({ ...p, ...(node as any) }));
            // },
            nodeRelSize: 1,
            nodeVal: (node) => {
              return done ? (node as GraphNodeType).workers : 1;
            },
            nodeColor: (node) => {
              //   return INDUSTRY_COLORS[(node as GraphNodeType).industry];
              return (node as GraphNodeType).color /* automationRisk color */;
            },
            backgroundColor: colors.appBackground,
          }}
        />
      </ErrorBoundary>
    </ReactForceGraphStyles>
  );
}
const ReactForceGraphStyles = styled.div`
  position: fixed;
  /* pointer-events: none; */
  inset: 0;
`;
