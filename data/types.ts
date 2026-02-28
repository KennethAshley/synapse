export type KeyType =
  | "alpha"
  | "punct"
  | "number"
  | "mod"
  | "thumb"
  | "transparent"
  | "blank";

export type ComboType = "escape" | "modifier" | "command";

export type Hand = "left" | "right";

export interface KeyDef {
  id: string;
  label: string;
  subLabel?: string;
  type: KeyType;
}

export interface HalfLayout {
  rows: KeyDef[][];
  thumbRow: KeyDef[];
}

export interface ComboDef {
  id: string;
  name: string;
  keys: [string, string];
  keyLabels: [string, string];
  action: string;
  shortcut?: string;
  type: ComboType;
  behavior: string;
  hand: Hand;
}

export interface LayerOverride {
  label: string;
  subLabel?: string;
  type: KeyType;
}

export interface LedState {
  id: string;
  label: string;
  detail: string;
  hex: string;
  description: string;
}
