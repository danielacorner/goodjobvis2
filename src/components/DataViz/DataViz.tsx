import { ReactForceGraph } from "../Graph/ReactForceGraph";
import { R3FGraph3D } from "../Graph/R3FGraph3D";
import { ChartjsGraph } from "../Graph/ChartjsGraph";
import { useCurrentStoryStep } from "../../store/store";
import { SigmaForceGraph } from "../Graph/SigmaForceGraph";

export function DataViz() {
  const { graphType } = useCurrentStoryStep();
  console.log(
    "🌟🚨 ~ file: DataViz.tsx ~ line 8 ~ DataViz ~ graphType",
    graphType
  );
  return (
    <>
      {graphType === "2dScatter" ? (
        <ChartjsGraph />
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
