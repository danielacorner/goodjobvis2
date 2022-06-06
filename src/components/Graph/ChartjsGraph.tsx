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
import { useEffect, useMemo, useState } from "react";
import { NOCDataType } from "../../utils/types";
import { CLUSTER_COLORS } from "../../utils/constants";
import { STORY_STEPS } from "../../utils/STORY_STEPS";
import { useCurrentStepIdx } from "../../store/store";
import zoomPlugin from "chartjs-plugin-zoom";
import { AxisControls } from "./AxisControls";
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
const NOC_NUMERICAL_KEYS = Object.entries(NOC_NODES[0])
  .filter(([key, val]) => typeof val === "number")
  .map(([key]) => key);
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

  // allow manual control of axis keys
  const [{ xKeyState, yKeyState }, setKeyState] = useState({
    xKeyState: xKey,
    yKeyState: yKey,
  });
  // update when the step changes
  useEffect(() => {
    setKeyState({
      xKeyState: xKey,
      yKeyState: yKey,
    });
  }, [xKey, yKey]);

  const datasets = useMemo(getDatasets(xKeyState, yKeyState, width), [
    xKeyState,
    yKeyState,
    width,
  ]);

  // only allow zoom/pan on the last step?
  const pinchEnabled = currentStepIdx === STORY_STEPS.length - 1;

  return (
    <ChartStyles>
      {xKey === "VARIABLE" && (
        <AxisControls
          {...{
            xOptions: NOC_NUMERICAL_KEYS,
            yOptions: NOC_NUMERICAL_KEYS,
            xKey: xKeyState,
            setXKey: (x) => setKeyState((p) => ({ ...p, xKeyState: x })),
            yKey: yKeyState,
            setYKey: (y) => setKeyState((p) => ({ ...p, yKeyState: y })),
          }}
        />
      )}
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
                display: Boolean(xKeyState),
                text: String(xKeyState) ?? undefined,
              },
              display: Boolean(xKeyState && xKeyState !== "VARIABLE"),
            },
            y: {
              beginAtZero: true,
              type: yScaleType ?? "linear",
              title: {
                display: Boolean(yKeyState),
                text: String(yKeyState) ?? undefined,
              },
              display: Boolean(yKeyState && yKeyState !== "VARIABLE"),
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
            // https://www.chartjs.org/chartjs-plugin-zoom/latest/guide/usage.html
            zoom: {
              zoom: {
                wheel: {
                  enabled: false,
                },
                pinch: {
                  enabled: false,
                  // enabled: pinchEnabled,
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
              x: xKey && xKey !== "VARIABLE" ? node[xKey] : Math.random(),
              y: yKey && yKey !== "VARIABLE" ? node[yKey] : Math.random(),
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
