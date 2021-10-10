import { atom } from "jotai";
import { GraphNodeType } from "../utils/types";
export const isCoolAtom = atom<boolean>(true);
export type TooltipNodeType = GraphNodeType & {
  position: { x: number; y: number };
};
export const tooltipNodeAtom = atom<TooltipNodeType | null>(null);
