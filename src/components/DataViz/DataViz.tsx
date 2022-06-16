import { Graph3D } from "../Graph/Graph3D";
import { ChartjsGraph } from "../Graph/ChartjsGraph";
import { useCurrentStepIdx } from "../../store/store";
import { ForceGraph } from "../Graph/ForceGraph";

export function DataViz() {
  const [currentStepIdx] = useCurrentStepIdx();
  const graphType =
    currentStepIdx >= 3
      ? "2dScatter"
      : currentStepIdx >= 2
      ? "force"
      : "3dPile";
  currentStepIdx <= 1 ? "3dPile" : currentStepIdx <= 2 ? "force" : "2dScatter";

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
