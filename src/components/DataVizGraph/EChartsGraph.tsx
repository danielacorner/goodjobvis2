import ReactECharts from "echarts-for-react";
import { NOC_NODES } from "../../assets/NOC-node";
import { INDUSTRY_COLORS } from "../../utils/constants";
const CATEGORIES = Object.keys(INDUSTRY_COLORS);
const schema = [
  { name: "Income", index: 0, text: "人均收入", unit: "美元" },
  { name: "LifeExpectancy", index: 1, text: "人均寿命", unit: "岁" },
  { name: "Population", index: 2, text: "总人口", unit: "" },
  { name: "Country", index: 3, text: "国家", unit: "" },
];
// https://echarts.apache.org/examples/en/index.html
export default function EchartsGraph() {
  const options = {
    baseOption: {
      timeline: {
        axisType: "category",
        orient: "vertical",
        autoPlay: true,
        inverse: true,
        playInterval: 1000,
        left: null,
        right: 0,
        top: 20,
        bottom: 20,
        width: 55,
        height: null,
        symbol: "none",
        checkpointStyle: {
          borderWidth: 2,
        },
        controlStyle: {
          showNextBtn: false,
          showPrevBtn: false,
        },
        data: [] as any,
      },
      title: [
        {
          text: NOC_NODES[0].title1,
          textAlign: "center",
          left: "63%",
          top: "55%",
          textStyle: {
            fontSize: 100,
          },
        },
        {
          text: "各国人均寿命与GDP关系演变",
          left: "center",
          top: 10,
          textStyle: {
            fontWeight: "normal",
            fontSize: 20,
          },
        },
      ],
      tooltip: {
        padding: 5,
        borderWidth: 1,
        formatter: function (obj) {
          const value = obj.value;
          // prettier-ignore
          return schema[3].text + '：' + value[3] + '<br>'
                        + schema[1].text + '：' + value[1] + schema[1].unit + '<br>'
                        + schema[0].text + '：' + value[0] + schema[0].unit + '<br>'
                        + schema[2].text + '：' + value[2] + '<br>';
        },
      },
      grid: {
        top: 100,
        containLabel: true,
        left: 30,
        right: "110",
      },
      xAxis: {
        type: "log",
        name: "人均收入",
        max: 100000,
        min: 300,
        nameGap: 25,
        nameLocation: "middle",
        nameTextStyle: {
          fontSize: 18,
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          formatter: "{value} $",
        },
      },
      yAxis: {
        type: "value",
        name: "平均寿命",
        max: 100,
        nameTextStyle: {
          fontSize: 18,
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          formatter: "{value} 岁",
        },
      },
      visualMap: [
        {
          show: false,
          dimension: 3,
          categories: CATEGORIES,
          inRange: {
            color: (function () {
              // prettier-ignore
              const colors = ['#51689b', '#ce5c5c', '#fbc357', '#8fbf8f', '#659d84', '#fb8e6a', '#c77288', '#786090', '#91c4c5', '#6890ba'];
              return colors.concat(colors);
            })(),
          },
        },
      ],
      series: [
        {
          type: "scatter",
          itemStyle: {
            opacity: 0.8,
          },
          data: NOC_NODES,
          symbolSize: function (val) {
            console.log(
              "🌟🚨 ~ file: EChartsGraph.tsx ~ line 128 ~ EchartsGraph ~ val",
              val
            );
            return 10;
            // return sizeFunction(val[2]);
          },
        },
      ],
      animationDurationUpdate: 1000,
      animationEasingUpdate: "quinticInOut",
    },
    options: [] as any,
  };
  for (let n = 0; n < NOC_NODES.length; n++) {
    options.baseOption.timeline.data.push(NOC_NODES[n]);
    options.options.push({
      title: {
        show: true,
        text: NOC_NODES[n].job + "",
      },
      series: {
        name: NOC_NODES[n].job,
        type: "scatter",
        itemStyle: { opacity: 0.8 },
        data: NOC_NODES[n],
        symbolSize: function (val) {
          console.log(
            "🌟🚨 ~ file: EChartsGraph.tsx ~ line 155 ~ EchartsGraph ~ val",
            val
          );
          return 10;
          // return sizeFunction(val[2]);
        },
      },
    });
  }
  return (
    <ReactECharts
      option={options}
      style={{ width: "100vw", height: "100vh", position: "fixed", inset: 0 }}
    />
  );
}
