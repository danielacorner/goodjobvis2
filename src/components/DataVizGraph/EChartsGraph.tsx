import ReactECharts from "echarts-for-react";
import { NOC_NODES } from "../../assets/NOC-node";
import { INDUSTRY_COLORS } from "../../utils/constants";

export default function EchartsGraph() {
  const options = {
    legend: {
      data: Object.keys(INDUSTRY_COLORS),
    },
    series: [
      {
        type: "graph",
        layout: "force",
        animation: false,
        label: {
          normal: {
            position: "right",
            formatter: "{b}",
          },
        },
        draggable: true,
        data: NOC_NODES,
        categories: Object.keys(INDUSTRY_COLORS),
        force: {
          // initLayout: 'circular'
          // repulsion: 20,
          edgeLength: 5,
          repulsion: 20,
          gravity: 0.2,
        },
        edges: [],
      },
    ],
  };

  return (
    <ReactECharts
      option={options}
      style={{ width: "100vw", height: "100vh" }}
    />
  );
}
