import { HalfLayout, LayerOverride } from "./types";

export const LAYER_NAMES = ["Graphite Base", "Symbols + Numbers", "Vim Nav"];
export const LAYER_COUNT = 3;

// Per-layer key overrides — keys not listed here are transparent (pass through to base)
export const layerOverrides: Record<number, Record<string, LayerOverride>> = {
  // Layer 1: Symbols (left) + Numpad (right)
  1: {
    // Left half — row 1
    "L-1-0": { label: "`", type: "punct" },
    "L-1-1": { label: "!", type: "punct" },
    "L-1-2": { label: "@", type: "punct" },
    "L-1-3": { label: "#", type: "punct" },
    "L-1-4": { label: "$", type: "punct" },
    "L-1-5": { label: "&", type: "punct" },
    // Left half — row 2
    "L-2-1": { label: "-", type: "punct" },
    "L-2-2": { label: ":", type: "punct" },
    "L-2-3": { label: "{", type: "punct" },
    "L-2-4": { label: "(", type: "punct" },
    "L-2-5": { label: "[", type: "punct" },
    // Left half — row 3
    "L-3-1": { label: "_", type: "punct" },
    "L-3-2": { label: ";", type: "punct" },
    "L-3-3": { label: "}", type: "punct" },
    "L-3-4": { label: ")", type: "punct" },
    "L-3-5": { label: "]", type: "punct" },
    // Right half — row 1
    "R-1-0": { label: "*", type: "punct" },
    "R-1-1": { label: "7", type: "number" },
    "R-1-2": { label: "8", type: "number" },
    "R-1-3": { label: "9", type: "number" },
    "R-1-4": { label: "%", type: "punct" },
    "R-1-5": { label: "|", type: "punct" },
    // Right half — row 2
    "R-2-0": { label: "=", type: "punct" },
    "R-2-1": { label: "4", type: "number" },
    "R-2-2": { label: "5", type: "number" },
    "R-2-3": { label: "6", type: "number" },
    "R-2-4": { label: "+", type: "punct" },
    // Right half — row 3
    "R-3-0": { label: "0", type: "number" },
    "R-3-1": { label: "1", type: "number" },
    "R-3-2": { label: "2", type: "number" },
    "R-3-3": { label: "3", type: "number" },
    "R-3-4": { label: "/", type: "punct" },
    // Right thumb
    "R-T-0": { label: "REP", subLabel: "repeat", type: "thumb" },
  },
  // Layer 2: Vim Navigation
  2: {
    // Left half — row 2
    "L-2-2": { label: "TAB", type: "mod" },
    "L-2-4": { label: "ENT", type: "mod" },
    // Left half — row 3
    "L-3-2": { label: "ESC", type: "mod" },
    "L-3-4": { label: "BSPC", type: "mod" },
    // Left thumb
    "L-T-0": { label: "ALT", subLabel: "option", type: "thumb" },
    // Right half — row 2
    "R-2-0": { label: "\u2190", subLabel: "left", type: "mod" },
    "R-2-1": { label: "\u2193", subLabel: "down", type: "mod" },
    "R-2-2": { label: "\u2191", subLabel: "up", type: "mod" },
    "R-2-3": { label: "\u2192", subLabel: "right", type: "mod" },
    // Right half — row 3
    "R-3-0": { label: "HOME", type: "mod" },
    "R-3-1": { label: "PGDN", type: "mod" },
    "R-3-2": { label: "PGUP", type: "mod" },
    "R-3-3": { label: "END", type: "mod" },
  },
};

export const leftHalf: HalfLayout = {
  rows: [
    [
      { id: "L-0-0", label: "", type: "blank" },
      { id: "L-0-1", label: "1", type: "number" },
      { id: "L-0-2", label: "2", type: "number" },
      { id: "L-0-3", label: "3", type: "number" },
      { id: "L-0-4", label: "4", type: "number" },
      { id: "L-0-5", label: "5", type: "number" },
    ],
    [
      { id: "L-1-0", label: "TAB", type: "mod" },
      { id: "L-1-1", label: "B", type: "alpha" },
      { id: "L-1-2", label: "L", type: "alpha" },
      { id: "L-1-3", label: "D", type: "alpha" },
      { id: "L-1-4", label: "W", type: "alpha" },
      { id: "L-1-5", label: "Z", type: "alpha" },
    ],
    [
      { id: "L-2-0", label: "HYPR", type: "mod" },
      { id: "L-2-1", label: "N", type: "alpha" },
      { id: "L-2-2", label: "R", type: "alpha" },
      { id: "L-2-3", label: "T", type: "alpha" },
      { id: "L-2-4", label: "S", type: "alpha" },
      { id: "L-2-5", label: "G", type: "alpha" },
    ],
    [
      { id: "L-3-0", label: "LSHIFT", type: "mod" },
      { id: "L-3-1", label: "Q", type: "alpha" },
      { id: "L-3-2", label: "X", type: "alpha" },
      { id: "L-3-3", label: "M", type: "alpha" },
      { id: "L-3-4", label: "C", type: "alpha" },
      { id: "L-3-5", label: "V", type: "alpha" },
    ],
  ],
  thumbRow: [
    { id: "L-T-0", label: "MO(1)", subLabel: "symbols", type: "thumb" },
    { id: "L-T-1", label: "SPACE", type: "thumb" },
  ],
};

export const rightHalf: HalfLayout = {
  rows: [
    [
      { id: "R-0-0", label: "6", type: "number" },
      { id: "R-0-1", label: "7", type: "number" },
      { id: "R-0-2", label: "8", type: "number" },
      { id: "R-0-3", label: "9", type: "number" },
      { id: "R-0-4", label: "0", type: "number" },
      { id: "R-0-5", label: "-", type: "punct" },
    ],
    [
      { id: "R-1-0", label: "'", type: "punct" },
      { id: "R-1-1", label: "F", type: "alpha" },
      { id: "R-1-2", label: "O", type: "alpha" },
      { id: "R-1-3", label: "U", type: "alpha" },
      { id: "R-1-4", label: "J", type: "alpha" },
      { id: "R-1-5", label: ";", type: "punct" },
    ],
    [
      { id: "R-2-0", label: "Y", type: "alpha" },
      { id: "R-2-1", label: "H", type: "alpha" },
      { id: "R-2-2", label: "A", type: "alpha" },
      { id: "R-2-3", label: "E", type: "alpha" },
      { id: "R-2-4", label: "I", type: "alpha" },
      { id: "R-2-5", label: ",", type: "punct" },
    ],
    [
      { id: "R-3-0", label: "K", type: "alpha" },
      { id: "R-3-1", label: "P", type: "alpha" },
      { id: "R-3-2", label: ".", type: "punct" },
      { id: "R-3-3", label: "-", type: "punct" },
      { id: "R-3-4", label: "/", type: "punct" },
      { id: "R-3-5", label: "RSHIFT", type: "mod" },
    ],
  ],
  thumbRow: [
    { id: "R-T-0", label: "BSPC", type: "thumb" },
    { id: "R-T-1", label: "MO(2)", subLabel: "nav", type: "thumb" },
  ],
};
