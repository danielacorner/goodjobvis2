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
import { FiFilter } from "react-icons/fi";
import { atom, useAtom } from "jotai";
import { useFilters } from "../../store/store";
import { NOC_STATS } from "../../assets/NOC-node";

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

function FiltersMenu() {
  const [open, setOpen] = useState(false);
  const [, setFilters] = useFilters();
  const MENU_ITEMS = [
    {
      name: "Computer Skills",
      key: "skillsComp",
      icon: MdComputer,
      min: NOC_STATS.skillsComp.min,
      max: NOC_STATS.skillsComp.max,
    },

    {
      name: "Logic Skills",
      key: "skillsLogi",
      icon: GiLogicGateNand,
      min: NOC_STATS.skillsLogi.min,
      max: NOC_STATS.skillsLogi.max,
    },
    {
      name: "Math Skills",
      key: "skillsMath",
      icon: TbMathFunction,
      min: NOC_STATS.skillsMath.min,
      max: NOC_STATS.skillsMath.max,
    },
    {
      name: "Language Skills",
      key: "skillsLang",
      icon: IoLanguage,
      min: NOC_STATS.skillsLang.min,
      max: NOC_STATS.skillsLang.max,
    },
  ];
  return (
    <Menu isOpen={open}>
      <MenuButton
        as={Button as any}
        rightIcon={<ChevronDownIcon />}
        onClick={() => setOpen(!open)}
      >
        <FiFilter />
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
                <Slider
                  defaultValue={0}
                  min={0}
                  max={100}
                  onChangeEnd={(val) => {
                    setFilters((prev) => ({ ...prev, [item.key]: val }));
                  }}
                >
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
