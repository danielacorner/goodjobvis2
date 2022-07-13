import styled from "styled-components";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
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
import { useState } from "react";
import { MdComputer } from "react-icons/md";
import { GiLogicGateNand } from "react-icons/gi";
import { TbMathFunction } from "react-icons/tb";
import { IoLanguage } from "react-icons/io5";

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
  const [open, setOpen] = useState(false);
  const MENU_ITEMS = [
    {
      name: "Computer Skills",
      key: "skillsComp",
      icon: MdComputer,
    },

    {
      name: "Logic Skills",
      key: "skillsLogi",
      icon: GiLogicGateNand,
    },
    {
      name: "Math Skills",
      key: "skillsMath",
      icon: TbMathFunction,
    },
    {
      name: "Language Skills",
      key: "skillsLang",
      icon: IoLanguage,
    },
  ];
  return (
    <Menu isOpen={open}>
      <MenuButton
        as={Button as any}
        rightIcon={<ChevronDownIcon />}
        onClick={() => setOpen(!open)}
      >
        Filters
      </MenuButton>
      <MenuList
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {MENU_ITEMS.map((item) => (
          <MenuItem key={item.name}>
            <Styles2>
              <p>{item.name}</p>
              <div className="slider">
                <Slider defaultValue={0} min={0} max={100}>
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb boxSize={6}>
                    <Box color="steelblue" as={item.icon} />
                  </SliderThumb>
                </Slider>
              </div>
            </Styles2>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
const Styles2 = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;

  .slider {
    padding: 6px 10px 0;
    width: 100%;
  }
`;
