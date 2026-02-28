import { ComboDef } from "@/data/types";
import { combos } from "@/data/combos";

// Reverse index: key position ID → combos that include this key
const lookup = new Map<string, ComboDef[]>();

for (const combo of combos) {
  for (const keyId of combo.keys) {
    const existing = lookup.get(keyId);
    if (existing) {
      existing.push(combo);
    } else {
      lookup.set(keyId, [combo]);
    }
  }
}

export const comboLookup: ReadonlyMap<string, ComboDef[]> = lookup;
