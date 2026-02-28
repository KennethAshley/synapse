import { LedState } from "./types";

export const ledStates: LedState[] = [
  {
    id: "symbols",
    label: "Symbols Layer",
    detail: "Hold left thumb (MO 1)",
    hex: "#fe8019",
    description: "Gruvbox bright orange",
  },
  {
    id: "nav",
    label: "Nav Layer",
    detail: "Hold right thumb (MO 2)",
    hex: "#83a598",
    description: "Gruvbox bright blue",
  },
  {
    id: "cmd",
    label: "Cmd Held",
    detail: "T+S or H+A (hold 150ms)",
    hex: "#fabd2f",
    description: "Gruvbox bright yellow",
  },
  {
    id: "ctrl",
    label: "Ctrl Held",
    detail: "A+E (hold 150ms)",
    hex: "#8ec07c",
    description: "Gruvbox bright aqua",
  },
  {
    id: "off",
    label: "No Modifier",
    detail: "Default state",
    hex: "",
    description: "LEDs off",
  },
];
