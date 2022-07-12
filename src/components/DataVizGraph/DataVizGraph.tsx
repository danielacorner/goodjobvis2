import { ReactForceGraph } from "./ReactForceGraph";
import { R3FGraph3D } from "./R3FGraph3D";
import { useCurrentStoryStep } from "../../store/store";
import { SigmaForceGraph } from "./SigmaForceGraph";
import EchartsGraph from "./EChartsGraph";
import ErrorBoundary from "../ErrorBoundary";

export function DataVizGraph() {
  const { graphType } = useCurrentStoryStep();
  console.log(
    "🌟🚨 ~ file: DataViz.tsx ~ line 8 ~ DataViz ~ graphType",
    graphType
  );
  return (
    <>
      {graphType === "2dScatter" ? (
        <ErrorBoundary>
          <EchartsGraph />
        </ErrorBoundary>
      ) : graphType === "react-force-graph" ? (
        <ErrorBoundary>
          <ReactForceGraph />
        </ErrorBoundary>
      ) : graphType === "react-sigma" ? (
        <ErrorBoundary>
          <SigmaForceGraph />
        </ErrorBoundary>
      ) : graphType === "3dPile" ? (
        <ErrorBoundary>
          <R3FGraph3D />
        </ErrorBoundary>
      ) : null}
    </>
  );
}
