import { ledStates } from "@/data/leds";

const labelColors: Record<string, string> = {
  symbols: "#fe8019",
  nav: "#83a598",
  cmd: "#fabd2f",
  ctrl: "#8ec07c",
  off: "#484f58",
};

const dotStyles: Record<string, React.CSSProperties> = {
  symbols: {
    background: "#fe8019",
    boxShadow: "0 0 24px rgba(254, 128, 25, 0.4)",
  },
  nav: {
    background: "#83a598",
    boxShadow: "0 0 24px rgba(131, 165, 152, 0.4)",
  },
  cmd: {
    background: "#fabd2f",
    boxShadow: "0 0 24px rgba(250, 189, 47, 0.4)",
  },
  ctrl: {
    background: "#8ec07c",
    boxShadow: "0 0 24px rgba(142, 192, 124, 0.4)",
  },
  off: {
    background: "#161b22",
    border: "1px solid #30363d",
    boxShadow: "none",
  },
};

export function LedPreview() {
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
            background: "var(--kb-badge-led)",
            borderRadius: 4,
            padding: "2px 8px",
            letterSpacing: "0.5px",
          }}
        >
          LEDS
        </span>
        <span
          style={{
            fontSize: 20,
            fontWeight: 600,
            color: "var(--kb-text-bright)",
          }}
        >
          LED Indicators
        </span>
        <span
          style={{
            fontSize: 13,
            color: "var(--kb-text-muted)",
            marginLeft: "auto",
          }}
        >
          Whole-board Gruvbox colors — layers take priority over modifiers
        </span>
      </div>

      <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
        {ledStates.map((state) => (
          <div
            key={state.id}
            className="led-card"
            data-state={state.id}
            style={{ flex: 1, minWidth: 160 }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                margin: "0 auto 12px",
                ...dotStyles[state.id],
              }}
            />
            <div
              style={{
                fontSize: 15,
                fontWeight: 600,
                marginBottom: 4,
                color: labelColors[state.id],
              }}
            >
              {state.label}
            </div>
            <div style={{ fontSize: 11, color: "var(--kb-text-muted)" }}>
              {state.detail}
            </div>
            <div
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: 11,
                color: "var(--kb-text-muted)",
                marginTop: 4,
              }}
            >
              {state.hex ? `${state.hex} — ${state.description}` : state.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
