"use client";

import { ComboDef } from "@/data/types";

interface ComboRowProps {
  combo: ComboDef;
  isActive: boolean;
  onHover: (comboId: string | null) => void;
}

const typeStyles: Record<
  string,
  { keyColor: string; actionColor: string; badgeBg: string }
> = {
  escape: {
    keyColor: "#7ee787",
    actionColor: "#7ee787",
    badgeBg: "#238636",
  },
  modifier: {
    keyColor: "#fabd2f",
    actionColor: "#fabd2f",
    badgeBg: "#9e6a03",
  },
  command: {
    keyColor: "#58a6ff",
    actionColor: "#58a6ff",
    badgeBg: "#1f6feb",
  },
};

export function ComboRow({ combo, isActive, onHover }: ComboRowProps) {
  const style = typeStyles[combo.type];

  return (
    <div
      className="combo-row"
      data-active={isActive || undefined}
      onMouseEnter={() => onHover(combo.id)}
      onMouseLeave={() => onHover(null)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        cursor: "default",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          minWidth: 80,
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 28,
            height: 28,
            borderRadius: 4,
            fontSize: 13,
            fontWeight: 600,
            border: `1px solid ${style.keyColor}`,
            background: `${style.badgeBg}20`,
            color: style.keyColor,
          }}
        >
          {combo.keyLabels[0]}
        </span>
        <span style={{ color: "#484f58", fontSize: 12 }}>+</span>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 28,
            height: 28,
            borderRadius: 4,
            fontSize: 13,
            fontWeight: 600,
            border: `1px solid ${style.keyColor}`,
            background: `${style.badgeBg}20`,
            color: style.keyColor,
          }}
        >
          {combo.keyLabels[1]}
        </span>
      </div>
      <span style={{ color: "#484f58", margin: "0 4px" }}>&rarr;</span>
      <span
        style={{ fontSize: 13, fontWeight: 500, color: style.actionColor }}
      >
        {combo.action}
      </span>
      <span
        style={{ fontSize: 11, color: "#484f58", marginLeft: "auto" }}
      >
        {combo.behavior}
        {combo.shortcut ? ` \u00b7 ${combo.shortcut}` : ""}
      </span>
    </div>
  );
}
