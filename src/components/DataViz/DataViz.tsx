import { Graph3D } from "../Graph/Graph3D";
import { ChartjsGraph } from "../Graph/ChartjsGraph";
import { useCurrentStepIdx } from "../../store/store";
import { ForceGraph } from "../Graph/ForceGraph";

export function DataViz() {
  const [currentStepIdx] = useCurrentStepIdx();
  const graphType =
    currentStepIdx >= 999
      ? // currentStepIdx >= 3
        "2dScatter"
      : currentStepIdx >= 0
      ? // : currentStepIdx >= 2
        "3dScatter"
      : "3dPile";

  return (
    <>
      {graphType === "2dScatter" && <ChartjsGraph />}
      {graphType === "3dScatter" && <ForceGraph />}
      {graphType === "3dPile" && <Graph3D />}
    </>
  );
}
