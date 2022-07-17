import { ReactForceGraph } from "./ReactForceGraph";
import { R3FGraph3D } from "./R3FGraph3D";
import { useCurrentStoryStep } from "../../store/store";
import { SigmaForceGraph } from "./SigmaForceGraph";
import EchartsGraph from "./EChartsGraph";
import ErrorBoundary from "../ErrorBoundary";
import { LotteryMachine } from "./LotteryMachine";

export function DataVizGraph() {
  const { graphType } = useCurrentStoryStep();
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
      ) : graphType === "lotteryMachine" ? (
        <ErrorBoundary>
          <LotteryMachine />
        </ErrorBoundary>
      ) : null}
    </>
  );
}
