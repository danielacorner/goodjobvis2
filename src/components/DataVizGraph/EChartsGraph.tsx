import ReactECharts from "echarts-for-react";
import { useEffect, useState } from "react";
import { NOC_NODES, NOC_NODES_CLEANED } from "../../assets/NOC-node";
import { useCurrentStoryStep, useFilters } from "../../store/store";
import { INDUSTRY_COLORS, NICE_NAMES } from "../../utils/constants";
import { NOCDataType, NOC_STATS_TYPED } from "../../utils/types";
import { AxisControls } from "./AxisControls/AxisControls";
import { AxisLabels } from "./AxisLabels";
const CATEGORIES = Object.keys(INDUSTRY_COLORS);
// https://github.com/hustcc/echarts-for-react
const DEFAULT_COLOR = "steelblue";

// https://echarts.apache.org/examples/en/index.html#chart-type-scatter
// https://echarts.apache.org/examples/en/editor.html?c=scatter-simple
// https://echarts.apache.org/examples/en/index.html
export default function EchartsGraph() {
  const { xKey, yKey } = useCurrentStoryStep();

  const [filters] = useFilters();

  // allow manual control of axis keys
  const [{ xKeyState, yKeyState }, setKeyState] = useState({
    xKeyState: xKey,
    yKeyState: yKey,
  });
  // update when the step changes
  useEffect(() => {
    setKeyState({
      xKeyState: xKey === "VARIABLE" ? "skillsComp" : xKey,
      yKeyState: yKey === "VARIABLE" ? "salaryMed" : yKey,
    });
  }, [xKey, yKey]);
  const xAxisLabel = (xKeyState && NICE_NAMES[xKeyState]) ?? xKeyState;
  const yAxisLabel = (yKeyState && NICE_NAMES[yKeyState]) ?? yKeyState;
  const data =
    xKeyState && yKeyState
      ? NOC_NODES.filter((node) => {
          return Object.entries(filters).every(([skillsKey, filterValue]) =>
            // search filter
            skillsKey === "searchText" && typeof filterValue === "string"
              ? node.job.includes(filterValue)
              : // color-by filter
              skillsKey === "colorBy"
              ? true
              : // skills sliders fiters
                node[skillsKey] > filterValue
          );
        }).map((node) => [
          node[xKeyState],
          node[yKeyState],
          node.job,
          node.workers,
        ])
      : [];
  const grid = {
    top: 72,
    left: 56,
    bottom: 48,
    right: 48,
    // right: 130,
  };
  const options = {
    title: {
      text:
        xKey === "VARIABLE"
          ? ""
          : !xAxisLabel && !yAxisLabel
          ? "_____ vs _____"
          : `${xAxisLabel} vs ${yAxisLabel}`,
      textStyle: {
        fontSize: 14,
      },
      left: 22,
      top: 22,
    },
    toolbox: {
      top: xKey === "VARIABLE" ? 48 : 16,
      right: 16,
      itemSize: 18,
      feature: {
        dataZoom: {
          yAxisIndex: false,
        },
      },
    },
    // https://echarts.apache.org/en/option.html#tooltip
    tooltip: {
      formatter: (nodes, ...rest) => {
        return nodes.reduce((acc, node) => {
          return (
            acc +
            `<div>[${Math.round(node.value[0])}, ${Math.round(
              node.value[1]
            )}] ${node.value[2]}</div>`
          );
        }, ``);
      },
      className: "echarts-tooltip",
      confine: true,
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      // position: function (pos, params, el, elRect, size) {
      //   const obj = { top: 10 };
      //   obj[["left", "right"][+(pos[0] < size.viewSize[0] / 2)]] = 30;
      //   return obj;
      // },
      extraCssText: "width: fit-content",
    },
    xAxis: {
      splitLine: { show: false },
      axisLabel: {
        formatter: (value) => {
          return xKeyState && ["automationRisk"].includes(xKeyState)
            ? `${value * 100}%`
            : value;
        },
      },
    },
    yAxis: {
      splitLine: { show: false },
      scale: true,
      axisLabel: {
        formatter: (value) => {
          return yKeyState && ["automationRisk"].includes(yKeyState)
            ? `${value * 100}%`
            : value;
        },
      },
    },
    grid,
    series: [
      {
        name: "NOC_Nodes",
        data,
        type: "scatter",
        itemStyle: {
          color: (node) => {
            return filters.colorBy
              ? getColorBy(filters.colorBy)(node)
              : DEFAULT_COLOR;
          },
        },
        symbolSize: function (node: typeof data[0]) {
          if (!node) {
            return;
          }
          const size = radiusFromArea(
            Number(node[3]) / NOC_STATS_TYPED.workers.max
          );
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
      <div
        style={{ width: "100vw", height: "100vh", position: "fixed", inset: 0 }}
      >
        <ReactECharts
          option={options}
          style={{
            width: "100vw",
            height: "100vh",
            position: "fixed",
            inset: 0,
          }}
        />
        <AxisLabels {...{ xAxisLabel, yAxisLabel, grid }} />
      </div>
    </>
  );
}
function radiusFromArea(area: number) {
  return Math.sqrt(area / Math.PI) * 2;
}

type EchartsNodeType = {
  dataIndex: number;
};
const COLOR_BY_FUNCTIONS = {
  ...Object.keys(NOC_STATS_TYPED).reduce(
    (acc, key) => ({
      ...acc,
      [key]: (node: EchartsNodeType) => {
        const nocNode = NOC_NODES[node.dataIndex];
        const statPct = nocNode[key] / NOC_STATS_TYPED[key].max;
        return `hsl(210,70%,${100 - 100 * statPct}%)`;
      },
    }),
    {}
  ),
  job: (node: EchartsNodeType) => {
    return `hsl(${Math.random() * 360},70%,50%)`;
  },
  automationRisk: (node: EchartsNodeType) => {
    const nocNode = NOC_NODES[node.dataIndex];
    return `hsl(${120 * nocNode.automationRisk},70%,50%)`;
  },
} as { [sup in keyof NOCDataType]: (node: EchartsNodeType) => string };

function getColorBy(colorBy: string) {
  return (node) => {
    const fn = COLOR_BY_FUNCTIONS[colorBy];
    const color = fn ? fn(node) : DEFAULT_COLOR;
    return color;
  };
}
