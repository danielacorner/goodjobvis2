import { ForceGraph2D } from "react-force-graph";
import { GraphDataType } from "../../utils/types";
import { useForceGraphProps } from "./useForceGraphProps";

export function Graph({ graphData }: { graphData: GraphDataType }) {
  const { fgRef, forceGraphProps } = useForceGraphProps();

  //
  // use the force (d3 force simulation controls)
  //
  // const graphWithUsers = useGraphWithUsersAndLinks();
  // useTheForce(fgRef.current, graphWithUsers);

  return (
    <ForceGraph2D ref={fgRef} graphData={graphData} {...forceGraphProps} />
  );
}
