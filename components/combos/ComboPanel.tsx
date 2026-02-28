"use client";

import { combos } from "@/data/combos";
import { ComboRow } from "./ComboRow";

interface ComboPanelProps {
  activeComboIds: string[];
  onComboHover: (comboId: string | null) => void;
}

export function ComboPanel({ activeComboIds, onComboHover }: ComboPanelProps) {
  const leftCombos = combos.filter((c) => c.hand === "left");
  const rightCombos = combos.filter((c) => c.hand === "right");

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 12,
          marginBottom: 16,
        }}
      >
        <span
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: "var(--kb-bg)",
            background: "var(--kb-badge-combo)",
            borderRadius: 4,
            padding: "2px 8px",
            letterSpacing: "0.5px",
          }}
        >
          COMBOS
        </span>
        <span
          style={{
            fontSize: 20,
            fontWeight: 600,
            color: "var(--kb-text-bright)",
          }}
        >
          18 Two-Key Combos
        </span>
        <span
          style={{
            fontSize: 13,
            color: "var(--kb-text-muted)",
            marginLeft: "auto",
          }}
        >
          Tap for commands, hold for modifiers (150ms)
        </span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 32,
        }}
      >
        <div>
          <h4
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "var(--kb-text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              marginBottom: 8,
            }}
          >
            Left Hand ({leftCombos.length} combos)
          </h4>
          {leftCombos.map((combo) => (
            <ComboRow
              key={combo.id}
              combo={combo}
              isActive={activeComboIds.includes(combo.id)}
              onHover={onComboHover}
            />
          ))}
        </div>

        <div>
          <h4
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "var(--kb-text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              marginBottom: 8,
            }}
          >
            Right Hand ({rightCombos.length} combos)
          </h4>
          {rightCombos.map((combo) => (
            <ComboRow
              key={combo.id}
              combo={combo}
              isActive={activeComboIds.includes(combo.id)}
              onHover={onComboHover}
            />
          ))}

          <div
            style={{
              marginTop: 24,
              padding: 12,
              background: "var(--kb-surface)",
              borderRadius: 6,
              border: "1px solid var(--kb-border-dim)",
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: "var(--kb-text-dim)",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                marginBottom: 8,
              }}
            >
              Timing
            </div>
            <div style={{ fontSize: 12, color: "var(--kb-text-muted)" }}>
              <code style={codeStyle}>COMBO_TERM 30ms</code> &mdash; tap
              detection
              <br />
              <code style={codeStyle}>COMBO_HOLD_TERM 150ms</code> &mdash;
              modifier hold
              <br />
              <code style={codeStyle}>COMBO_STRICT_TIMER</code> &mdash; from
              first key
              <br />
              <code style={codeStyle}>COMBO_MUST_HOLD_MODS</code> &mdash;
              auto-detect
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const codeStyle: React.CSSProperties = {
  background: "var(--kb-bg)",
  padding: "1px 5px",
  borderRadius: 3,
  fontSize: 11,
  color: "var(--kb-text)",
  fontFamily: "var(--font-geist-mono), monospace",
};
