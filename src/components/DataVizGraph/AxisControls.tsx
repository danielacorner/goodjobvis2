import styled from "styled-components";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";

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
          X Axis: {xKey === "VARIABLE" ? "" : xKey}
        </MenuButton>
        <MenuList>
          {xOptions.map((x) => (
            <MenuItem key={x} onClick={() => setXKey(x)}>
              {x}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      <Menu>
        <MenuButton as={Button as any} rightIcon={<ChevronDownIcon />}>
          Y Axis: {yKey === "VARIABLE" ? "" : yKey}
        </MenuButton>
        <MenuList>
          {yOptions.map((x) => (
            <MenuItem key={x} onClick={() => setYKey(x)}>
              {x}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Styles>
  );
}
const Styles = styled.div`
  display: flex;
  gap: 1em;
  justify-content: center;
  margin-top: 2em;
  z-index: 9999;
  position: relative;
  .chakra-menu__menu-list {
    max-width: calc(100vw - 80px);
    max-height: calc(100vh - 6em);
    overflow-x: hidden;
    overflow-y: auto;
  }
`;
