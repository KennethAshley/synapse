"use client";

import { HalfLayout, ComboType, ComboDef } from "@/data/types";
import { Key } from "./Key";

interface KeyboardHalfProps {
  half: HalfLayout;
  side: "left" | "right";
  activeLayer: number;
  hoveredKeyId: string | null;
  highlights: Map<string, ComboType>;
  comboLookup: ReadonlyMap<string, ComboDef[]>;
  onKeyHover: (keyId: string | null) => void;
}

export function KeyboardHalf({
  half,
  side,
  activeLayer,
  hoveredKeyId,
  highlights,
  comboLookup,
  onKeyHover,
}: KeyboardHalfProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {half.rows.map((row, rowIdx) => (
        <div key={rowIdx} style={{ display: "flex", gap: 4 }}>
          {row.map((keyDef) => (
            <Key
              key={keyDef.id}
              keyDef={keyDef}
              activeLayer={activeLayer}
              glowType={highlights.get(keyDef.id) ?? null}
              isHovered={hoveredKeyId === keyDef.id}
              combos={comboLookup.get(keyDef.id) ?? []}
              onHover={onKeyHover}
            />
          ))}
        </div>
      ))}
      <div
        style={{
          display: "flex",
          gap: 4,
          marginTop: 8,
          justifyContent: side === "left" ? "flex-end" : "flex-start",
        }}
      >
        {half.thumbRow.map((keyDef) => (
          <Key
            key={keyDef.id}
            keyDef={keyDef}
            activeLayer={activeLayer}
            glowType={highlights.get(keyDef.id) ?? null}
            isHovered={hoveredKeyId === keyDef.id}
            combos={comboLookup.get(keyDef.id) ?? []}
            onHover={onKeyHover}
          />
        ))}
      </div>
    </div>
  );
}
