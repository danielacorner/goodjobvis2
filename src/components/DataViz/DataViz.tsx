import { Graph3D } from "../Graph/Graph3D";
import { ChartjsGraph } from "../Graph/ChartjsGraph";
import { useCurrentStepIdx } from "../../App";

export function DataViz() {
  // const [graphType, setGraphType] = useState<"2dScatter" | "3dPile">("3dPile");
  const [currentStepIdx] = useCurrentStepIdx();
  const graphType = "3dPile";
  // const graphType = currentStepIdx === 2 ? "2dScatter" : "3dPile";

  return (
    <>
      {/* {graphType === "2dScatter" && <ChartjsGraph />} */}
      {graphType === "3dPile" && <Graph3D />}
    </>
  );
}
