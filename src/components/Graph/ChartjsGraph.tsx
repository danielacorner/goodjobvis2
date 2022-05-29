import styled from "styled-components";
import {
  Chart as ChartJS,
  LinearScale,
  LogarithmicScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  BubbleDataPoint,
} from "chart.js";
import { NOC_NODES } from "../../assets/NOC-node";
import { useWindowSize } from "../../hooks/useWindowSize";
import { Bubble } from "react-chartjs-2";
import { useMemo } from "react";
import { NOCDataType } from "../../utils/types";
import { CLUSTER_COLORS } from "../../utils/constants";
import { useState } from "react";
import { STORY_STEPS } from "../../utils/STORY_STEPS";
import { useCurrentStepIdx } from "../../store/store";
import zoomPlugin from "chartjs-plugin-zoom";

// https://www.chartjs.org/docs/latest/

// https://react-chartjs-2.netlify.app/examples/bubble-chart
ChartJS.register(
  LinearScale,
  LogarithmicScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  zoomPlugin
);

export function ChartjsGraph() {
  const { width, height } = useWindowSize();

  const [currentStepIdx] = useCurrentStepIdx();
  const currentStep = STORY_STEPS[currentStepIdx];

  const { xKey, yKey, xScaleType, yScaleType } = {
    xKey: currentStep.xKey ?? null,
    yKey: currentStep.yKey ?? null,
    xScaleType: currentStep.xScaleType ?? null,
    yScaleType: currentStep.yScaleType ?? null,
  };

  const datasets = useMemo(getDatasets(xKey, yKey, width), [xKey, yKey, width]);

  return (
    <ChartStyles>
      <Bubble
        height={height}
        width={width}
        options={{
          // onHover: (event, item, chart) => {
          //   if (!item[0]) {
          //     return;
          //   }
          //   const { datasetIndex, index } = item[0];
          //   const node: NOCDataType = (
          //     datasets[datasetIndex].data[index] as any
          //   ).tooltip.node;
          // },
          scales: {
            x: {
              type: xScaleType ?? "linear",
              title: {
                display: Boolean(xKey),
                text: String(xKey) ?? undefined,
              },
              display: Boolean(xKey),
            },
            y: {
              beginAtZero: true,
              type: yScaleType ?? "linear",
              title: {
                display: Boolean(yKey),
                text: String(yKey) ?? undefined,
              },
              display: Boolean(yKey),
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
            zoom: {
              zoom: {
                wheel: {
                  enabled: false,
                },
                pinch: {
                  enabled: true,
                },
                mode: "xy",
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

function getDatasets(
  xKey: string | null,
  yKey: string | null,
  width: number
): () => { label: string; data: BubbleDataPoint[]; backgroundColor: string }[] {
  return () => {
    const groups = NOC_NODES.reduce((acc, node) => {
      return {
        ...acc,
        [node.industry]: (acc[node.industry] || []).concat(node),
      };
    }, {} as { [key: string]: NOCDataType[] });
    const datasetsFromGroups = Object.entries(groups).map(
      ([industry, nodes]) => {
        const color = CLUSTER_COLORS[nodes[0].cluster];
        const opacity = 0.7;
        return {
          label: industry,
          data: nodes.map((node) => {
            const area = node.workers;
            const scale = 0.4 * (width < 768 ? 0.3 : 1);
            return {
              x: xKey ? node[xKey] : Math.random(),
              y: yKey ? node[yKey] : Math.random(),
              r: Math.sqrt(area / Math.PI) * scale,
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
  };
}
