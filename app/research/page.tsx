"use client";

import Link from "next/link";

const phases = [
  {
    number: 1,
    name: "Foundation",
    status: "complete" as const,
    goal: "Clean Graphite base layer that compiles, flashes, and lets the user type all alphas with zero lag.",
    findings: [
      "Clean Graphite alphas — no LT() or MT() on any alpha position",
      "Thumb cluster: MO(1), Space, Backspace, MO(2)",
      "Combo timing defines (COMBO_TERM 30, COMBO_MUST_HOLD_MODS, COMBO_STRICT_TIMER) configured in config.h even with zero combos",
      "Unsized combo_t key_combos[] with sizeof introspection replaces manual COMBO_COUNT define",
      "Removed all mod-tap artifacts: PERMISSIVE_HOLD, TAPPING_TERM_PER_KEY, QUICK_TAP_TERM",
      "ORYX_ENABLE kept for ZSA live-training compatibility",
    ],
    risks: [
      "Empty combo array compilation — GCC handles zero-length arrays as extension (verified safe)",
      "SERIAL_NUMBER kept from old layout for Oryx compatibility",
    ],
  },
  {
    number: 2,
    name: "Combos",
    status: "complete" as const,
    goal: "Common commands and bare modifiers fire via natural two-key rolling combos on the base layer.",
    findings: [
      "18 combos total: 14 commands (tap), 3 modifiers (hold 150ms), 1 escape",
      "COMBO_MUST_HOLD_MODS auto-distinguishes tap vs hold — KEYCODE_IS_MOD checks IS_MODIFIER_KEYCODE in QMK source",
      "Command keycodes like LGUI(KC_C) have non-zero basic keycodes, so they fire instantly on tap within 30ms COMBO_TERM",
      "All combo pairs use adjacent-column, different-finger keys — cross-referenced against Graphite bigram data",
      "O+U pair (~1.5% bigram frequency) intentionally avoided as highest-risk collision",
      "LED modifier indicators via rgb_matrix_indicators_advanced_user with get_mods() | get_weak_mods()",
      "Gruvbox color palette: yellow for Cmd, aqua for Ctrl",
      "Voyager has 52 addressable RGB LEDs via IS31FL3731 driver",
    ],
    risks: [
      "R+T pair ('tr' ~0.3%) assigned to Copy — monitor during daily use",
      "H+A pair ('ha' ~1.2%) safe for Cmd because hold requirement prevents tap misfires",
      "LED colors set outside indicator callback get overwritten by animation frames",
    ],
  },
  {
    number: 3,
    name: "Layers",
    status: "complete" as const,
    goal: "Full symbols/numbers layout and vim-style navigation accessible without leaving home position.",
    findings: [
      "Layer 1 (symbols): brackets/parens/braces on left home row, numpad on right",
      "Layer 2 (nav): vim h/j/k/l arrows on right home row, Home/End/PgUp/PgDn on bottom row",
      "Convenience keys (Tab, Enter, Escape, Backspace) on left hand of nav layer for one-handed editing",
      "COMBO_ONLY_FROM_LAYER 0 means combos work from any active layer — combo resolution always uses base layer keycodes",
      "MO() key positions must be KC_TRANSPARENT on their target layer to prevent layer sticking",
      "Layer LED indicators: orange (Gruvbox #fe8019) for symbols, blue (#83a598) for nav",
      "Layer check runs before modifier check in LED indicator chain — layer context takes priority",
    ],
    risks: [
      "Shifted keycodes (KC_LPRN etc.) internally register/unregister shift — don't hold physical shift simultaneously",
      "LAYER_STATE_8BIT limits total layers to 0-7 (sufficient for this layout)",
    ],
  },
  {
    number: 4,
    name: "Polish",
    status: "complete" as const,
    goal: "Daily-driver ready with key repeat and timing tuned from real usage.",
    findings: [
      "QK_REP placed on both layer thumbs — nav layer left inner thumb, symbols layer right inner thumb",
      "QK_REP auto-ignores MO keys, modifier keycodes, and itself — layer switching never overwrites repeat buffer",
      "QK_REP remembers modifier state: Shift+A then REP sends Shift+A again",
      "Can repeat combo outputs: Copy combo (R+T) then REP sends Cmd+C again",
      "NO_ALT_REPEAT_KEY saves ~500 bytes firmware (QK_AREP not needed with dedicated nav layer)",
      "Fixed build.sh to use QMK_HOME from qmk config instead of hardcoded path",
      "Final firmware binary: 55KB, flashable via Keymapp",
    ],
    risks: [
      "COMBO_TERM may need adjustment after extended daily use — tune in 2-3ms increments",
      "Per-combo timing (COMBO_TERM_PER_COMBO) available if individual combos need different windows",
    ],
  },
];

const timingConfig = [
  {
    setting: "COMBO_TERM",
    value: "30ms",
    purpose: "Window for both combo keys to register",
    notes: "25-30ms sweet spot for fast typists. Lower = fewer misfires, harder to trigger.",
  },
  {
    setting: "COMBO_HOLD_TERM",
    value: "150ms",
    purpose: "Hold threshold for modifier combos",
    notes: "125-200ms range. Only affects bare modifier keycodes via COMBO_MUST_HOLD_MODS.",
  },
  {
    setting: "COMBO_MUST_HOLD_MODS",
    value: "enabled",
    purpose: "Modifier combos require hold, not tap",
    notes:
      "KEYCODE_IS_MOD auto-detects bare modifiers. Command keycodes (LGUI(KC_C)) fire on tap.",
  },
  {
    setting: "COMBO_STRICT_TIMER",
    value: "enabled",
    purpose: "Timer starts from first key press only",
    notes: "Prevents second-key-press from resetting the combo window.",
  },
  {
    setting: "COMBO_ONLY_FROM_LAYER",
    value: "0",
    purpose: "Combos always reference base layer keycodes",
    notes: "Combos work identically regardless of active layer.",
  },
];

const bigramAnalysis = [
  { pair: "O+U", freq: "~1.5%", risk: "high", assignment: "Avoided", note: "Highest-risk pair — intentionally left unassigned" },
  { pair: "H+A", freq: "~1.2%", risk: "safe", assignment: "Right Cmd", note: "Hold requirement (150ms) prevents tap misfires during fast 'ha' rolls" },
  { pair: "R+T", freq: "~0.3%", risk: "medium", assignment: "Copy", note: "Monitor during daily use at 30ms COMBO_TERM" },
  { pair: "L+D", freq: "~0.3%", risk: "safe", assignment: "Escape", note: "Proven safe with COMBO_STRICT_TIMER" },
  { pair: "F+O", freq: "~0.3%", risk: "medium", assignment: "Quick Open", note: "Cross-finger roll, monitoring recommended" },
  { pair: "E+I", freq: "~0.3%", risk: "medium", assignment: "App Switch", note: "Right hand pair, moderate frequency" },
  { pair: "T+S", freq: "~0.1%", risk: "safe", assignment: "Left Cmd", note: "Low bigram frequency" },
  { pair: "B+L", freq: "~0.1%", risk: "safe", assignment: "Close Window", note: "Low bigram frequency" },
  { pair: "A+E", freq: "~0.02%", risk: "safe", assignment: "Right Ctrl", note: "Very low frequency" },
  { pair: "N+R", freq: "~0.05%", risk: "safe", assignment: "Undo", note: "Very low frequency" },
  { pair: "X+M", freq: "~0%", risk: "safe", assignment: "Paste", note: "'xm' essentially nonexistent in English" },
  { pair: "M+C", freq: "~0.02%", risk: "safe", assignment: "Cut", note: "Very low frequency" },
  { pair: "C+V", freq: "~0%", risk: "safe", assignment: "Redo", note: "'cv' does not occur in English" },
  { pair: "Q+X", freq: "~0%", risk: "safe", assignment: "Save", note: "'qx' does not occur in English" },
];

const sources = [
  { name: "QMK Combo Documentation", url: "https://docs.qmk.fm/features/combo" },
  { name: "QMK Repeat Key", url: "https://docs.qmk.fm/features/repeat_key" },
  { name: "QMK RGB Matrix", url: "https://docs.qmk.fm/features/rgb_matrix" },
  { name: "Graphite Layout", url: "https://github.com/rdavison/graphite-layout" },
  { name: "Combo Mods Guide", url: "https://jasoncarloscox.com/writing/combo-mods/" },
  { name: "ZSA Combos Blog", url: "https://blog.zsa.io/2212-combos/" },
  { name: "Symbol Layer Design (getreuer.info)", url: "https://getreuer.info/posts/keyboards/symbol-layer/index.html" },
  { name: "Gruvbox Color Palette", url: "https://github.com/morhetz/gruvbox-contrib" },
];

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      style={{
        fontSize: 11,
        fontWeight: 700,
        padding: "2px 8px",
        borderRadius: 4,
        background: status === "complete" ? "#238636" : "var(--kb-badge-empty)",
        color: status === "complete" ? "#fff" : "var(--kb-text-muted)",
        letterSpacing: "0.5px",
        textTransform: "uppercase",
      }}
    >
      {status}
    </span>
  );
}

function RiskBadge({ risk }: { risk: string }) {
  const colors: Record<string, { bg: string; border: string; text: string }> = {
    safe: { bg: "rgba(46, 160, 67, 0.1)", border: "rgba(46, 160, 67, 0.4)", text: "#7ee787" },
    medium: { bg: "rgba(210, 153, 34, 0.1)", border: "rgba(210, 153, 34, 0.4)", text: "#e3b341" },
    high: { bg: "rgba(248, 81, 73, 0.1)", border: "rgba(248, 81, 73, 0.4)", text: "#f85149" },
  };
  const c = colors[risk] ?? colors.medium;
  return (
    <span
      style={{
        fontSize: 11,
        fontWeight: 600,
        padding: "1px 6px",
        borderRadius: 3,
        background: c.bg,
        border: `1px solid ${c.border}`,
        color: c.text,
      }}
    >
      {risk}
    </span>
  );
}

export default function ResearchPage() {
  return (
    <div style={{ padding: 40, maxWidth: 900, margin: "0 auto" }}>
      <Link
        href="/"
        style={{
          fontSize: 13,
          color: "var(--kb-text-muted)",
          textDecoration: "none",
          display: "inline-block",
          marginBottom: 24,
        }}
      >
        &larr; Back to visualizer
      </Link>

      <h1
        style={{
          fontSize: 28,
          fontWeight: 600,
          marginBottom: 6,
          color: "var(--kb-text-bright)",
        }}
      >
        Firmware Research
      </h1>
      <p
        style={{
          fontSize: 14,
          color: "var(--kb-text-muted)",
          marginBottom: 48,
        }}
      >
        Findings from 4 phases of QMK research — combo system, layer design,
        timing, and key repeat.
      </p>

      {/* Phases */}
      <section style={{ marginBottom: 64 }}>
        <h2
          style={{
            fontSize: 20,
            fontWeight: 600,
            color: "var(--kb-text-bright)",
            marginBottom: 24,
          }}
        >
          Build Phases
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          {phases.map((phase) => (
            <div
              key={phase.number}
              style={{
                border: "1px solid var(--kb-border)",
                borderRadius: 8,
                padding: 24,
                background: "var(--kb-surface)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 12,
                }}
              >
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "var(--kb-bg)",
                    background: "var(--kb-badge-active)",
                    borderRadius: 4,
                    padding: "2px 8px",
                    letterSpacing: "0.5px",
                  }}
                >
                  PHASE {phase.number}
                </span>
                <span
                  style={{
                    fontSize: 18,
                    fontWeight: 600,
                    color: "var(--kb-text-bright)",
                  }}
                >
                  {phase.name}
                </span>
                <StatusBadge status={phase.status} />
              </div>

              <p
                style={{
                  fontSize: 14,
                  color: "var(--kb-text)",
                  marginBottom: 16,
                  lineHeight: 1.5,
                }}
              >
                {phase.goal}
              </p>

              <div style={{ marginBottom: 16 }}>
                <h4
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "var(--kb-text-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    marginBottom: 8,
                  }}
                >
                  Key Findings
                </h4>
                <ul
                  style={{
                    margin: 0,
                    paddingLeft: 20,
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                  }}
                >
                  {phase.findings.map((f, i) => (
                    <li
                      key={i}
                      style={{
                        fontSize: 13,
                        color: "var(--kb-text)",
                        lineHeight: 1.5,
                      }}
                    >
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {phase.risks.length > 0 && (
                <div>
                  <h4
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: "var(--kb-text-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      marginBottom: 8,
                    }}
                  >
                    Risks &amp; Notes
                  </h4>
                  <ul
                    style={{
                      margin: 0,
                      paddingLeft: 20,
                      display: "flex",
                      flexDirection: "column",
                      gap: 4,
                    }}
                  >
                    {phase.risks.map((r, i) => (
                      <li
                        key={i}
                        style={{
                          fontSize: 13,
                          color: "var(--kb-text-muted)",
                          lineHeight: 1.5,
                        }}
                      >
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Timing */}
      <section style={{ marginBottom: 64 }}>
        <h2
          style={{
            fontSize: 20,
            fontWeight: 600,
            color: "var(--kb-text-bright)",
            marginBottom: 24,
          }}
        >
          Timing Configuration
        </h2>

        <div
          style={{
            border: "1px solid var(--kb-border)",
            borderRadius: 8,
            overflow: "hidden",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr
                style={{
                  background: "var(--kb-surface)",
                  borderBottom: "1px solid var(--kb-border)",
                }}
              >
                {["Setting", "Value", "Purpose", "Notes"].map((h) => (
                  <th
                    key={h}
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: "var(--kb-text-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      padding: "10px 16px",
                      textAlign: "left",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timingConfig.map((row) => (
                <tr
                  key={row.setting}
                  style={{
                    borderBottom: "1px solid var(--kb-border-dim)",
                  }}
                >
                  <td
                    style={{
                      padding: "10px 16px",
                      fontSize: 13,
                      fontFamily: "var(--font-geist-mono), monospace",
                      color: "var(--kb-text-bright)",
                    }}
                  >
                    {row.setting}
                  </td>
                  <td
                    style={{
                      padding: "10px 16px",
                      fontSize: 13,
                      fontWeight: 600,
                      color: "var(--kb-thumb-text)",
                    }}
                  >
                    {row.value}
                  </td>
                  <td
                    style={{
                      padding: "10px 16px",
                      fontSize: 13,
                      color: "var(--kb-text)",
                    }}
                  >
                    {row.purpose}
                  </td>
                  <td
                    style={{
                      padding: "10px 16px",
                      fontSize: 12,
                      color: "var(--kb-text-muted)",
                    }}
                  >
                    {row.notes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Bigram Analysis */}
      <section style={{ marginBottom: 64 }}>
        <h2
          style={{
            fontSize: 20,
            fontWeight: 600,
            color: "var(--kb-text-bright)",
            marginBottom: 8,
          }}
        >
          Bigram Collision Analysis
        </h2>
        <p
          style={{
            fontSize: 13,
            color: "var(--kb-text-muted)",
            marginBottom: 24,
          }}
        >
          Each combo pair cross-referenced against English bigram frequency on
          the Graphite layout. Pairs with &gt;0.3% frequency are flagged.
        </p>

        <div
          style={{
            border: "1px solid var(--kb-border)",
            borderRadius: 8,
            overflow: "hidden",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr
                style={{
                  background: "var(--kb-surface)",
                  borderBottom: "1px solid var(--kb-border)",
                }}
              >
                {["Pair", "Frequency", "Risk", "Assignment", "Note"].map(
                  (h) => (
                    <th
                      key={h}
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: "var(--kb-text-muted)",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        padding: "10px 16px",
                        textAlign: "left",
                      }}
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {bigramAnalysis.map((row) => (
                <tr
                  key={row.pair}
                  style={{
                    borderBottom: "1px solid var(--kb-border-dim)",
                  }}
                >
                  <td
                    style={{
                      padding: "10px 16px",
                      fontSize: 13,
                      fontFamily: "var(--font-geist-mono), monospace",
                      fontWeight: 600,
                      color: "var(--kb-text-bright)",
                    }}
                  >
                    {row.pair}
                  </td>
                  <td
                    style={{
                      padding: "10px 16px",
                      fontSize: 13,
                      fontFamily: "var(--font-geist-mono), monospace",
                      color: "var(--kb-text)",
                    }}
                  >
                    {row.freq}
                  </td>
                  <td style={{ padding: "10px 16px" }}>
                    <RiskBadge risk={row.risk} />
                  </td>
                  <td
                    style={{
                      padding: "10px 16px",
                      fontSize: 13,
                      color: "var(--kb-text)",
                    }}
                  >
                    {row.assignment}
                  </td>
                  <td
                    style={{
                      padding: "10px 16px",
                      fontSize: 12,
                      color: "var(--kb-text-muted)",
                    }}
                  >
                    {row.note}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Sources */}
      <section style={{ marginBottom: 48 }}>
        <h2
          style={{
            fontSize: 20,
            fontWeight: 600,
            color: "var(--kb-text-bright)",
            marginBottom: 24,
          }}
        >
          Sources
        </h2>
        <ul
          style={{
            margin: 0,
            paddingLeft: 20,
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          {sources.map((s) => (
            <li key={s.name} style={{ fontSize: 13 }}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "var(--kb-thumb-text)",
                  textDecoration: "none",
                }}
              >
                {s.name}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <hr
        style={{
          border: "none",
          borderTop: "1px solid var(--kb-border-dim)",
          margin: "48px 0",
        }}
      />

      <p
        style={{
          fontSize: 12,
          color: "var(--kb-text-dim)",
          textAlign: "center",
        }}
      >
        Research conducted 2026-02-27 &middot; QMK firmware24 branch &middot;
        ZSA Voyager
      </p>
    </div>
  );
}
