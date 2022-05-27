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

// https://react-chartjs-2.netlify.app/examples/scatter-chart
ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

export const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

export const data = {
  datasets: [
    {
      label: "A dataset",
      data: NOC_NODES.map((node) => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
      })),
      backgroundColor: "rgba(255, 99, 132, 1)",
    },
  ],
};

export function ChartjsGraph() {
  return <Scatter options={options} data={data} />;
}
