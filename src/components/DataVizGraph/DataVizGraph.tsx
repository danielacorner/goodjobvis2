import { ReactForceGraph } from "./ReactForceGraph";
import { R3FGraph3D } from "./R3FGraph3D";
import { useCurrentStoryStep } from "../../store/store";
import { SigmaForceGraph } from "./SigmaForceGraph";
import EchartsGraph from "./EChartsGraph";

export function DataVizGraph() {
  const { graphType } = useCurrentStoryStep();
  console.log(
    "🌟🚨 ~ file: DataViz.tsx ~ line 8 ~ DataViz ~ graphType",
    graphType
  );
  return (
    <>
      {graphType === "2dScatter" ? (
        <EchartsGraph />
      ) : graphType === "react-force-graph" ? (
        <ReactForceGraph />
      ) : graphType === "react-sigma" ? (
        <SigmaForceGraph />
      ) : graphType === "3dPile" ? (
        <R3FGraph3D />
      ) : null}
    </>
  );
}
