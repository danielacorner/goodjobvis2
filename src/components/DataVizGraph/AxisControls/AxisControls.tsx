import styled from "styled-components";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { MdSwapHoriz } from "react-icons/md";
import { FiltersMenu } from "./FiltersMenu";
import { NICE_NAMES } from "../../../utils/constants";

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
        <div style={{ position: "relative" }}>
          <MenuButton as={Button as any} rightIcon={<ChevronDownIcon />}>
            <div
              style={{ fontWeight: xKey === "VARIABLE" ? "bold" : "normal" }}
            >
              X Axis:
            </div>
            <div style={{ fontSize: 12 }}>
              {xKey === "VARIABLE" ? "" : NICE_NAMES[xKey]}
            </div>
          </MenuButton>
          <IconButton
            aria-label="swap"
            variant="ghost"
            icon={<MdSwapHoriz />}
            size="sm"
            onClick={() => {
              setXKey(yKey);
              setYKey(xKey);
            }}
            className="btnSwap"
          />
        </div>
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
const GAP = 1.5;
const WIDTH = 32;
const Styles = styled.div`
  position: fixed;
  top: 8px;
  left: 0;
  right: 0;
  display: flex;
  gap: ${GAP}em;
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
  .btnSwap {
    background: none !important;
    position: absolute;
    z-index: 1;
    bottom: 0;
    top: 0;
    height: 100%;
    right: calc(${-GAP / 2}em + ${-WIDTH / 2}px);
  }
`;
