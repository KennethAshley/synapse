# Synapse

Interactive visualizer for a combo-driven ZSA Voyager keyboard layout built on [Graphite](https://github.com/rdavison/graphite-layout) alphas.

## What is this?

Synapse is a Next.js app that renders the kenboard-9000 v2 layout — a QMK firmware configuration where common commands (copy, paste, undo, etc.) fire from natural two-key rolling combos on the base layer. No mod-taps, no input lag, no mode-switching.

The visualizer shows all three layers, 18 combos, and LED indicator states interactively.

## Layout overview

### Design philosophy

Every interaction — typing, commands, navigation — should feel like one continuous flow with zero lag and zero misfires.

- **Clean Graphite alphas** — no dual-function keys on any alpha position
- **Rolling combos** for commands and modifiers — two adjacent keys pressed together within 30ms
- **MO() thumb keys** for layers — hold to activate, release to return
- **QK_REP** on layer thumbs for key repeat

### Base layer (Graphite)

```
___    1     2     3     4     5         6     7     8     9     0     -
TAB    B     L     D     W     Z         '     F     O     U     J     ;
HYPR   N     R     T     S     G         Y     H     A     E     I     ,
LSFT   Q     X     M     C     V         K     P     .     -     /    RSFT
                   MO(1) SPC                 BSPC  MO(2)
```

### Layer 1: Symbols + Numbers (hold left thumb)

```
___    ___   ___   ___   ___   ___       ___   ___   ___   ___   ___   ___
 `     !     @     #     $     &         *     7     8     9     %     |
___    -     :     {     (     [         =     4     5     6     +    ___
___    _     ;     }     )     ]         0     1     2     3     /    ___
                   [held] ___               REP   ___
```

### Layer 2: Vim Navigation (hold right thumb)

```
___    ___   ___   ___   ___   ___       ___   ___   ___   ___   ___   ___
___    ___   ___   ___   ___   ___       ___   ___   ___   ___   ___   ___
___    ___   TAB   ___   ENT   ___       LEFT  DOWN   UP  RIGHT  ___   ___
___    ___   ESC   ___   BSPC  ___       HOME  PGDN  PGUP  END   ___   ___
                   REP   ___               ___   [held]
```

### Combos (18 total)

All combos use adjacent-column, different-finger key pairs on the base layer.

**Modifiers** (hold 150ms to activate):

| Combo | Keys | Output |
|-------|------|--------|
| Left Cmd | T + S | Left GUI |
| Right Cmd | H + A | Right GUI |
| Right Ctrl | A + E | Right Ctrl |

**Escape**:

| Combo | Keys | Output |
|-------|------|--------|
| Escape | L + D | Escape |

**Commands** (tap to fire):

| Combo | Keys | Action |
|-------|------|--------|
| Copy | R + T | Cmd+C |
| Paste | X + M | Cmd+V |
| Cut | M + C | Cmd+X |
| Undo | N + R | Cmd+Z |
| Save | Q + X | Cmd+S |
| Find | S + G | Cmd+F |
| Close Window | B + L | Cmd+W |
| Select All | D + W | Cmd+A |
| Redo | C + V | Cmd+Shift+Z |
| App Switch | E + I | Cmd+Tab |
| New Tab | W + Z | Cmd+T |
| Quick Open | F + O | Cmd+P |
| Toggle Comment | P + . | Cmd+/ |
| Cycle Windows | U + J | Cmd+` |

### LED indicators (Gruvbox palette)

| State | Color | Hex |
|-------|-------|-----|
| Symbols layer | Orange | #fe8019 |
| Nav layer | Blue | #83a598 |
| Cmd held | Yellow | #fabd2f |
| Ctrl held | Aqua | #8ec07c |

### Timing configuration

| Setting | Value | Purpose |
|---------|-------|---------|
| COMBO_TERM | 30ms | Window for both keys to register |
| COMBO_HOLD_TERM | 150ms | Hold threshold for modifier combos |
| COMBO_MUST_HOLD_MODS | enabled | Modifiers require hold, not tap |
| COMBO_STRICT_TIMER | enabled | Timer starts from first key only |
| COMBO_ONLY_FROM_LAYER | 0 | Combos always reference base layer |

### Firmware research

The layout was built in 4 phases of research and implementation:

1. **Foundation** — Clean Graphite base layer with MO() thumbs, combo timing config, build integration. Started from kenboard-3000's clean alpha pattern.
2. **Combos** — 18 two-key combos (14 commands, 3 modifiers, 1 escape). `COMBO_MUST_HOLD_MODS` auto-distinguishes tap commands from hold modifiers. Gruvbox LED indicators via `rgb_matrix_indicators_advanced_user`.
3. **Layers** — Symbols/numbers on left thumb layer (brackets/parens home row, numpad right hand). Vim nav on right thumb layer (h/j/k/l arrows, Home/End/PgUp/PgDn). LED layer colors.
4. **Polish** — QK_REP on both layer thumbs for key repeat. `NO_ALT_REPEAT_KEY` to save firmware space. Final firmware build at 55KB.

Key findings:
- `KEYCODE_IS_MOD` in QMK source correctly distinguishes bare modifier keycodes from modified keycodes like `LGUI(KC_C)`, making the dual tap/hold behavior automatic
- Unsized `combo_t key_combos[]` with `sizeof` introspection replaces manual `COMBO_COUNT`
- All 18 combo pairs were cross-referenced against Graphite bigram frequency data — highest-risk pair (O+U at ~1.5%) intentionally avoided
- QK_REP auto-ignores MO keys and modifiers, so layer switching never overwrites the repeat buffer

## Tech stack

- [Next.js](https://nextjs.org) 16 with static export
- [React](https://react.dev) 19
- [Tailwind CSS](https://tailwindcss.com) 4
- TypeScript 5

## Development

```sh
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```sh
pnpm build
```

Static output in `out/`.

## Related

- [keyboard-layouts](https://github.com/kenboard/keyboard-layouts) — QMK firmware source
- [Graphite layout](https://github.com/rdavison/graphite-layout)
- [QMK Combos](https://docs.qmk.fm/features/combo)
- [ZSA Voyager](https://www.zsa.io/voyager)
