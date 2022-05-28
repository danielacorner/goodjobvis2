import styled from "styled-components";
import {
  Chart as ChartJS,
  LinearScale,
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

// https://react-chartjs-2.netlify.app/examples/scatter-chart
// https://react-chartjs-2.netlify.app/examples/bubble-chart
ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

export function ChartjsGraph() {
  const { width, height } = useWindowSize();

  const datasets = useMemo(() => {
    const groups = NOC_NODES.reduce((acc, node) => {
      return {
        ...acc,
        [node.industry]: (acc[node.industry] || []).concat(node),
      };
    }, {} as { [key: string]: NOCDataType[] });
    const datasetsFromGroups = Object.entries(groups).map(
      ([industry, nodes]) => {
        return {
          label: industry,
          data: nodes.map((node) => ({
            x: Math.random() * 100,
            y: Math.random() * 100,
            r: Math.random() * 25,
            tooltip: {
              title: `${node.job}`,
            },
          })) as BubbleDataPoint[],
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
          onHover: (...args) => {
            console.log(
              "🌟🚨 ~ file: ChartjsGraph.tsx ~ line 58 ~ ChartjsGraph ~ args",
              args
            );
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          layout: {
            padding: 50,
          },
          color: "black",
          plugins: {
            tooltip: {
              callbacks: {
                // title: (item) => {
                //   const {
                //     chart,
                //     dataIndex,
                //     dataset,
                //     datasetIndex,
                //     element,
                //     formattedValue,
                //     label,
                //     parsed,
                //     raw,
                //   }: {
                //     chart: Chart;
                //     dataIndex: number;
                //     dataset;
                //     datasetIndex: number;
                //     element: PointElement;
                //     formattedValue: string;
                //     label: string;
                //     parsed: { x: number; y: number; _custom: number };
                //     raw: {
                //       x: number;
                //       y: number;
                //       r: number;
                //       tooltip: { title: string };
                //     };
                //   } = item[0] as any;
                //   const node: NOCDataType = dataset.data[dataIndex];
                //   return `${raw.tooltip.title}`;
                // },
              },
            },
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
