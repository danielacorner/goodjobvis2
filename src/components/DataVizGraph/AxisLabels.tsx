import styled from "styled-components";

export function AxisLabels({ xAxisLabel, yAxisLabel, grid }) {
  if (!xAxisLabel || !yAxisLabel) {
    return null;
  }

  const xLabel = xAxisLabel.split("(")[0];
  const xUnit = xAxisLabel.split("(")[1];

  const yLabel = yAxisLabel.split("(")[0];
  const yUnit = yAxisLabel.split("(")[1];

  return (
    <AxisLabelStyles {...{ grid }}>
      <div className="y-axis-label">
        {yLabel}
        {yUnit ? "(" : ""}
        {yUnit ? <span className="unit">{yUnit.slice(0, -1)}</span> : null}
        {yUnit ? ")" : ""}
      </div>
      <div className="x-axis-label">
        {xLabel}
        {xUnit ? "(" : ""}
        {xUnit ? <span className="unit">{xUnit.slice(0, -1)}</span> : null}
        {xUnit ? ")" : ""}
      </div>
    </AxisLabelStyles>
  );
}
const AxisLabelStyles = styled.div`
  pointer-events: none;
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
        ${(p) => p.grid.left - 64}px
      );
    transform-origin: top left;
    justify-self: flex-end;
  }
`;
