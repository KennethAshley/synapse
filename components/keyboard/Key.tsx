"use client";

import { KeyDef, ComboType, ComboDef } from "@/data/types";
import { layerOverrides } from "@/data/layout";
import { KeyTooltip } from "./KeyTooltip";

interface KeyProps {
  keyDef: KeyDef;
  activeLayer: number;
  glowType: ComboType | null;
  isHovered: boolean;
  combos: ComboDef[];
  onHover: (keyId: string | null) => void;
}

export function Key({
  keyDef,
  activeLayer,
  glowType,
  isHovered,
  combos,
  onHover,
}: KeyProps) {
  const override = activeLayer > 0 ? layerOverrides[activeLayer]?.[keyDef.id] : undefined;
  const isTransparent = activeLayer > 0 && !override;
  const displayType = override ? override.type : isTransparent ? "transparent" : keyDef.type;
  const displayLabel = override ? override.label : isTransparent ? "\u25BD" : keyDef.label;
  const displaySubLabel = override?.subLabel ?? (isTransparent ? undefined : keyDef.subLabel);

  return (
    <div
      className="key"
      data-type={displayType}
      data-glow={glowType ?? undefined}
      onMouseEnter={() => onHover(keyDef.id)}
      onMouseLeave={() => onHover(null)}
    >
      <span>{displayLabel}</span>
      {displaySubLabel && (
        <span className="key-sub">{displaySubLabel}</span>
      )}
      {isHovered && (combos.length > 0 || activeLayer === 0) && (
        <KeyTooltip
          keyDef={keyDef}
          combos={combos}
          activeLayer={activeLayer}
        />
      )}
    </div>
  );
}
