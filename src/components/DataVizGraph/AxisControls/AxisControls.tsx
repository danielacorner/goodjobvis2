import styled from "styled-components";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { atom, useAtom } from "jotai";
import { FiltersMenu } from "./FiltersMenu";

const NICE_NAMES = {
  job: "Job Title",
  workers: "Workers",
  yearsStudy: "Years of Education",
  automationRisk: "Automation Risk (%)",
  salaryMed: "Salary ($k/year)",
  skillsComp: "Computer skills",
  skillsLogi: "Logic skills",
  skillsMath: "Math skills",
  skillsLang: "Language skills",
};

export function AxisControls({
  xOptions,
  yOptions,
  xKey,
  setXKey,
  yKey,
  setYKey,
}) {
  return (
    <Styles>
      <Menu>
        <MenuButton as={Button as any} rightIcon={<ChevronDownIcon />}>
          <div style={{ fontWeight: xKey === "VARIABLE" ? "bold" : "normal" }}>
            X Axis:
          </div>
          <div style={{ fontSize: 12 }}>
            {xKey === "VARIABLE" ? "" : NICE_NAMES[xKey]}
          </div>
        </MenuButton>
        <MenuList>
          {xOptions.map((x) => (
            <MenuItem key={x} onClick={() => setXKey(x)}>
              {NICE_NAMES[x] ?? x}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      <Menu>
        <MenuButton as={Button as any} rightIcon={<ChevronDownIcon />}>
          <div style={{ fontWeight: yKey === "VARIABLE" ? "bold" : "normal" }}>
            Y Axis:
          </div>
          <div style={{ fontSize: 12 }}>
            {yKey === "VARIABLE" ? "" : NICE_NAMES[yKey]}
          </div>
        </MenuButton>
        <MenuList>
          {yOptions.map((x) => (
            <MenuItem key={x} onClick={() => setYKey(x)}>
              {NICE_NAMES[x] ?? x}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      <FiltersMenu />
    </Styles>
  );
}
const Styles = styled.div`
  position: fixed;
  top: 8px;
  left: 0;
  right: 0;
  display: flex;
  gap: 1em;
  justify-content: center;
  z-index: 123;
  .chakra-menu__menu-button {
    padding: 0 0.5em 0 1em;
  }
  .chakra-menu__menu-list {
    max-width: calc(100vw - 80px);
    max-height: calc(100vh - 6em);
    overflow-x: hidden;
    overflow-y: auto;
  }
`;
