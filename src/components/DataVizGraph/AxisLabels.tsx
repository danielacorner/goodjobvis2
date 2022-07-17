import { useWindowSize } from "react-use";
import styled from "styled-components";

export function AxisLabels({ xAxisLabel, yAxisLabel, grid }) {
  console.log(
    "🌟🚨 ~ file: AxisLabels.tsx ~ line 4 ~ AxisLabels ~ xAxisLabel",
    xAxisLabel
  );
  const { width, height } = useWindowSize();

  const xLabel = xAxisLabel.split("(")[0];

  const xUnit = xAxisLabel.split("(")[1];

  const yLabel = yAxisLabel.split("(")[0];
  const yUnit = yAxisLabel.split("(")[1];

  return (
    <AxisLabelStyles {...{ width, height, grid }}>
      <div className="y-axis-label">
        {xLabel}
        {xUnit ? "(" : ""}
        {xUnit ? <span className="unit">{xUnit.slice(0, -1)}</span> : null}
        {xUnit ? ")" : ""}
      </div>
      <div className="x-axis-label">
        {yLabel}
        {yUnit ? "(" : ""}
        {yUnit ? <span className="unit">{yUnit.slice(0, -1)}</span> : null}
        {yUnit ? ")" : ""}
      </div>
    </AxisLabelStyles>
  );
}
const AxisLabelStyles = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 1em;
  .unit {
    font-style: italic;
    font-size: 0.8em;
  }
  padding: 0.5em;

  .x-axis-label {
    align-self: center;
  }
  .y-axis-label {
    transform: rotate(-90deg)
      translate(
        calc(-100% - ${(p) => p.grid.top}px),
        ${(p) => p.grid.left - 56}px
      );
    transform-origin: top left;
    justify-self: flex-end;
  }
`;
