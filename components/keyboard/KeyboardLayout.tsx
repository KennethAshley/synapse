"use client";

import { ComboType, ComboDef } from "@/data/types";
import { leftHalf, rightHalf } from "@/data/layout";
import { KeyboardHalf } from "./KeyboardHalf";

interface KeyboardLayoutProps {
  activeLayer: number;
  hoveredKeyId: string | null;
  highlights: Map<string, ComboType>;
  comboLookup: ReadonlyMap<string, ComboDef[]>;
  onKeyHover: (keyId: string | null) => void;
}

export function KeyboardLayout({
  activeLayer,
  hoveredKeyId,
  highlights,
  comboLookup,
  onKeyHover,
}: KeyboardLayoutProps) {
  return (
    <div
      style={{
        display: "flex",
        gap: 32,
        justifyContent: "center",
        alignItems: "flex-end",
      }}
    >
      <KeyboardHalf
        half={leftHalf}
        side="left"
        activeLayer={activeLayer}
        hoveredKeyId={hoveredKeyId}
        highlights={highlights}
        comboLookup={comboLookup}
        onKeyHover={onKeyHover}
      />
      <KeyboardHalf
        half={rightHalf}
        side="right"
        activeLayer={activeLayer}
        hoveredKeyId={hoveredKeyId}
        highlights={highlights}
        comboLookup={comboLookup}
        onKeyHover={onKeyHover}
      />
    </div>
  );
}
