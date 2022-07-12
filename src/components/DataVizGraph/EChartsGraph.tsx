import ReactECharts from "echarts-for-react";
import { startCase } from "lodash";
import { useEffect, useState } from "react";
import { NOC_NODES, NOC_NODES_CLEANED, NOC_STATS } from "../../assets/NOC-node";
import { useCurrentStoryStep } from "../../store/store";
import { INDUSTRY_COLORS } from "../../utils/constants";
import { AxisControls } from "./AxisControls";
const CATEGORIES = Object.keys(INDUSTRY_COLORS);
// https://github.com/hustcc/echarts-for-react

// https://echarts.apache.org/examples/en/index.html#chart-type-scatter
// https://echarts.apache.org/examples/en/editor.html?c=scatter-simple
// https://echarts.apache.org/examples/en/index.html
export default function EchartsGraph() {
  const { xKey, yKey } = useCurrentStoryStep();

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

  const data =
    xKeyState && yKeyState
      ? NOC_NODES.map((node) => [
          node[xKeyState],
          node[yKeyState],
          node.job,
          node.workers,
        ])
      : [];
  const options = {
    title: {
      text:
        xKey === "VARIABLE"
          ? ""
          : `${startCase(xKeyState)} (x) vs ${startCase(yKeyState)} (y)`,
      left: "center",
      top: 0,
    },
    xAxis: {
      splitLine: { show: false },
    },
    yAxis: {
      splitLine: { show: false },
      scale: true,
    },
    grid: {
      left: 80,
      // right: 130,
    },
    series: [
      {
        name: "NOC_Nodes",
        data,
        type: "scatter",
        symbolSize: function (node: typeof data[0]) {
          if (!node) {
            return;
          }
          const size = radiusFromArea(Number(node[3]) / NOC_STATS.workers.max);
          return size * 20;
        },
        // emphasis: {
        //   focus: "self",
        // },
        // labelLayout: function () {
        //   return {
        //     x: width,
        //     moveOverlap: "shiftY",
        //   };
        // },
        // labelLine: {
        //   show: true,
        //   length2: 5,
        //   lineStyle: {
        //     color: "#bbb",
        //   },
        // },
        // label: {
        //   show: true,
        //   formatter: function (param) {
        //     console.log(
        //       "🌟🚨 ~ file: EChartsGraph.tsx ~ line 50 ~ EchartsGraph ~ param",
        //       param
        //     );
        //     return param.data[2];
        //   },
        //   position: "right",
        //   minMargin: 2,
        // },
      },
    ],
  };

  return (
    <>
      {xKey === "VARIABLE" && (
        <AxisControls
          {...{
            xOptions: Object.keys(NOC_NODES_CLEANED[0]),
            yOptions: Object.keys(NOC_NODES_CLEANED[0]),
            xKey: xKeyState,
            setXKey: (x) => setKeyState((p) => ({ ...p, xKeyState: x })),
            yKey: yKeyState,
            setYKey: (y) => setKeyState((p) => ({ ...p, yKeyState: y })),
          }}
        />
      )}
      <ReactECharts
        option={options}
        style={{ width: "100vw", height: "100vh", position: "fixed", inset: 0 }}
      />
    </>
  );
}

function radiusFromArea(area: number) {
  return Math.sqrt(area / Math.PI) * 2;
}
