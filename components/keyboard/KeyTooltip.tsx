import { KeyDef, ComboDef } from "@/data/types";
import { LAYER_NAMES } from "@/data/layout";

interface KeyTooltipProps {
  keyDef: KeyDef;
  combos: ComboDef[];
  activeLayer: number;
}

const typeColors: Record<string, string> = {
  escape: "var(--kb-glow-escape)",
  modifier: "var(--kb-glow-modifier)",
  command: "var(--kb-glow-command)",
};

export function KeyTooltip({ keyDef, combos, activeLayer }: KeyTooltipProps) {
  return (
    <div className="key-tooltip">
      <div
        style={{
          fontSize: 15,
          fontWeight: 600,
          color: "var(--kb-text-bright)",
          marginBottom: 4,
        }}
      >
        {keyDef.label}
      </div>
      <div
        style={{
          fontSize: 11,
          color: "var(--kb-text-muted)",
          marginBottom: combos.length > 0 ? 8 : 0,
        }}
      >
        Layer {activeLayer}: {LAYER_NAMES[activeLayer]}
      </div>
      {combos.length > 0 && (
        <div
          style={{
            borderTop: "1px solid var(--kb-border-dim)",
            paddingTop: 6,
          }}
        >
          <div
            style={{
              fontSize: 10,
              fontWeight: 600,
              color: "var(--kb-text-dim)",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              marginBottom: 4,
            }}
          >
            Combos
          </div>
          {combos.map((combo) => (
            <div
              key={combo.id}
              style={{
                fontSize: 12,
                marginBottom: 3,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontWeight: 600,
                  color: typeColors[combo.type],
                }}
              >
                {combo.keyLabels[0]}+{combo.keyLabels[1]}
              </span>
              <span style={{ color: "var(--kb-text-dim)" }}>&rarr;</span>
              <span style={{ color: typeColors[combo.type] }}>
                {combo.action}
              </span>
              {combo.shortcut && (
                <span
                  style={{
                    fontSize: 10,
                    color: "var(--kb-text-muted)",
                    marginLeft: "auto",
                  }}
                >
                  {combo.shortcut}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
