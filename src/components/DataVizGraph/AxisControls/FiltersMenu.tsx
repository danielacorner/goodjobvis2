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
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import { MdComputer } from "react-icons/md";
import { GiLogicGateNand } from "react-icons/gi";
import { TbMathFunction } from "react-icons/tb";
import { IoLanguage } from "react-icons/io5";
import { FiFilter } from "react-icons/fi";
import { AiOutlineBgColors } from "react-icons/ai";
import { useFilters } from "../../../store/store";
import { NOC_STATS_TYPED } from "../../../utils/types";
import { NICE_NAMES } from "../../../utils/constants";

export function FiltersMenu() {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useFilters();
  const MENU_ITEMS = [
    {
      name: "Computer Skills",
      key: "skillsComp",
      icon: MdComputer,
      min: NOC_STATS_TYPED.skillsComp.min,
      max: NOC_STATS_TYPED.skillsComp.max,
    },

    {
      name: "Logic Skills",
      key: "skillsLogi",
      icon: GiLogicGateNand,
      min: NOC_STATS_TYPED.skillsLogi.min,
      max: NOC_STATS_TYPED.skillsLogi.max,
    },
    {
      name: "Math Skills",
      key: "skillsMath",
      icon: TbMathFunction,
      min: NOC_STATS_TYPED.skillsMath.min,
      max: NOC_STATS_TYPED.skillsMath.max,
    },
    {
      name: "Language Skills",
      key: "skillsLang",
      icon: IoLanguage,
      min: NOC_STATS_TYPED.skillsLang.min,
      max: NOC_STATS_TYPED.skillsLang.max,
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
        {/* color by box */}
        <MenuItem>
          <ColorByBox />
        </MenuItem>
        {/* search box */}
        <MenuItem>
          <Styles2>
            <Input
              className="text1q23"
              value={filters.searchText}
              placeholder="Search job titles"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                // setTimeout(() => {
                //   document
                //     .querySelector<HTMLInputElement>(".text1q23")
                //     ?.click();
                // }, 100);
              }}
              onChange={(e) => {
                setFilters((prev) => ({ ...prev, searchText: e.target.value }));
              }}
            />
          </Styles2>
        </MenuItem>
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

function ColorByBox() {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useFilters();

  return (
    <ColorByBoxStyles>
      <Menu isOpen={open}>
        <MenuButton
          as={Button as any}
          rightIcon={<ChevronDownIcon />}
          onClick={() => setOpen(!open)}
        >
          <div className="sup">
            <div>
              <AiOutlineBgColors />{" "}
            </div>
            <div>
              {filters.colorBy ? NICE_NAMES[filters.colorBy] : "Color By"}
            </div>
          </div>
        </MenuButton>
        <MenuList
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {Object.entries({ "": "--", ...NICE_NAMES }).map(
            ([itemKey, itemName]) => (
              <MenuItem
                key={itemKey}
                onClick={() => {
                  setFilters((prev) => ({ ...prev, colorBy: itemKey }));
                  setOpen(false);
                }}
              >
                <Styles3>{itemName}</Styles3>
              </MenuItem>
            )
          )}
        </MenuList>
      </Menu>
    </ColorByBoxStyles>
  );
}

const ColorByBoxStyles = styled.div`
  .chakra-menu__menu-button {
    width: 100%;
  }
  .sup {
    display: flex;
    gap: 8px;
    align-items: center;
  }
`;
const Styles3 = styled.div`
  display: flex;
  text-align: right;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;

  .slider {
    padding: 6px 10px 0;
    width: 100%;
  }
`;
