import { Graph3D } from "../Graph/Graph3D";
import { ChartjsGraph } from "../Graph/ChartjsGraph";
import { useCurrentStoryStep } from "../../store/store";
import { ForceGraph } from "../Graph/ForceGraph";

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
      ) : graphType === "force" ? (
        <ForceGraph />
      ) : graphType === "3dPile" ? (
        <Graph3D />
      ) : null}
    </>
  );
}
