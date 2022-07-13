import styled from "styled-components";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";

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
          X Axis: {xKey === "VARIABLE" ? "" : NICE_NAMES[xKey]}
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
          Y Axis: {yKey === "VARIABLE" ? "" : NICE_NAMES[yKey]}
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
  .chakra-menu__menu-list {
    max-width: calc(100vw - 80px);
    max-height: calc(100vh - 6em);
    overflow-x: hidden;
    overflow-y: auto;
  }
`;

function FiltersMenu() {
  return (
    <Menu>
      <MenuButton as={Button as any} rightIcon={<ChevronDownIcon />}>
        Filters
      </MenuButton>
      <MenuList>
        <MenuItem
          onClick={() => {
            return;
          }}
        >
          Computer Skills
          <Slider aria-label="slider-ex-1" defaultValue={30}>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
