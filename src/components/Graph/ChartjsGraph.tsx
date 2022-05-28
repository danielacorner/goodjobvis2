import styled from "styled-components/macro";
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

// https://react-chartjs-2.netlify.app/examples/scatter-chart
ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

export function ChartjsGraph() {
  const { width, height } = useWindowSize();
  return (
    <ChartStyles>
      <Scatter
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
        }}
        data={{
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
        }}
      />
    </ChartStyles>
  );
}
const ChartStyles = styled.div`
  position: fixed;
  inset: 0;
`;
