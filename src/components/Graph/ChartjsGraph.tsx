import styled from "styled-components";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Scatter } from "react-chartjs-2";
import { NOC_NODES } from "../../assets/NOC-node";
import { useWindowSize } from "../../hooks/useWindowSize";
import { Bubble } from "react-chartjs-2";
import { useMemo } from "react";
import { NOCDataType } from "../../utils/types";
import { CLUSTER_COLORS } from "../../utils/constants";

// https://react-chartjs-2.netlify.app/examples/scatter-chart
// https://react-chartjs-2.netlify.app/examples/bubble-chart
ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

export function ChartjsGraph() {
  const { width, height } = useWindowSize();

  const datasets = useMemo(() => {
    const groups = NOC_NODES.reduce((acc, node) => {
      return { ...acc, [node.cluster]: (acc[node.cluster] || []).concat(node) };
    }, {} as { [key: string]: NOCDataType[] });
    const datasetsFromGroups = Object.entries(groups).map(
      ([cluster, nodes]) => {
        console.log(
          "🌟🚨 ~ file: ChartjsGraph.tsx ~ line 31 ~ datasets ~ cluster",
          cluster
        );
        return {
          label: cluster,
          data: nodes.map((node) => ({
            x: Math.random() * 100,
            y: Math.random() * 100,
            r: Math.random() * 25,
          })),
          backgroundColor: CLUSTER_COLORS[nodes[0].cluster],
        };
      }
    );
    return datasetsFromGroups;
  }, []);

  return (
    <ChartStyles>
      <Bubble
        height={height}
        width={width}
        options={{
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          layout: {
            padding: 50,
          },
          color: "black",
        }}
        data={{
          datasets,
        }}
      />
    </ChartStyles>
  );
}
const ChartStyles = styled.div`
  position: fixed;
  inset: 0;
`;
