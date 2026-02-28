"use client";

import { LAYER_NAMES } from "@/data/layout";

interface LayerSwitcherProps {
  activeLayer: number;
  onLayerChange: (layer: number) => void;
}

export function LayerSwitcher({
  activeLayer,
  onLayerChange,
}: LayerSwitcherProps) {
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      {LAYER_NAMES.map((name, i) => (
        <button
          key={i}
          className="layer-tab"
          data-active={i === activeLayer ? "true" : "false"}
          onClick={() => onLayerChange(i)}
        >
          {i} {name}
        </button>
      ))}
      <span
        style={{
          fontSize: 11,
          color: "var(--kb-text-dim)",
          marginLeft: 12,
        }}
      >
        Press 1/2/3 to switch
      </span>
    </div>
  );
}
