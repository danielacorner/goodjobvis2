import styled from "styled-components";
import {
  Chart as ChartJS,
  LinearScale,
  LogarithmicScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  ChartData,
  BubbleDataPoint,
  Chart,
} from "chart.js";
import { Scatter } from "react-chartjs-2";
import { NOC_NODES } from "../../assets/NOC-node";
import { useWindowSize } from "../../hooks/useWindowSize";
import { Bubble } from "react-chartjs-2";
import { useMemo } from "react";
import { NOCDataType } from "../../utils/types";
import { CLUSTER_COLORS } from "../../utils/constants";
import { useControls } from "leva";
import { useState } from "react";

// https://react-chartjs-2.netlify.app/examples/scatter-chart
// https://react-chartjs-2.netlify.app/examples/bubble-chart
ChartJS.register(
  LinearScale,
  LogarithmicScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export function ChartjsGraph() {
  const { width, height } = useWindowSize();

  const [{ xKey, yKey }, setAxes] = useState<{
    xKey: keyof NOCDataType;
    yKey: keyof NOCDataType;
  }>({
    xKey: "yearsStudy",
    yKey: "salaryLow",
  });

  const datasets = useMemo(() => {
    const groups = NOC_NODES.reduce((acc, node) => {
      return {
        ...acc,
        [node.industry]: (acc[node.industry] || []).concat(node),
      };
    }, {} as { [key: string]: NOCDataType[] });
    const datasetsFromGroups = Object.entries(groups).map(
      ([industry, nodes]) => {
        const color = CLUSTER_COLORS[nodes[0].cluster];
        const opacity = 0.3;
        return {
          label: industry,
          data: nodes.map((node) => {
            const area = node.workers;
            const SCALE = 0.4;
            return {
              x: node[xKey],
              y: node[yKey],
              r: Math.sqrt(area / Math.PI) * SCALE,
              tooltip: {
                title: `${node.job}`,
                node,
              },
            };
          }) as BubbleDataPoint[],
          backgroundColor: `${color.slice(0, -2)} ${opacity})`,
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
          onHover: (event, item, chart) => {
            const { datasetIndex, index } = item[0];
            const node: NOCDataType = (
              datasets[datasetIndex].data[index] as any
            ).tooltip.node;
            console.log(
              "🌟🚨 ~ file: ChartjsGraph.tsx ~ line 85 ~ ChartjsGraph ~ node",
              node
            );
          },
          scales: {
            y: {
              beginAtZero: true,
              type: "logarithmic",
              title: { display: true, text: yKey },
              // display: false,
            },
            x: {
              title: { display: true, text: xKey },
              // display: false,
            },
          },
          layout: {
            padding: width * 0.1,
          },
          color: "black",
          plugins: {
            legend: {
              position: "bottom",
              align: "start",
              labels: {
                textAlign: "left",
              },
            },
            tooltip: {},
          },
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
