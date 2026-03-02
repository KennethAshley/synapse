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

The layout was built in 4 phases of research and implementation.

#### Phase 1: Foundation

**Goal:** Clean Graphite base layer that compiles, flashes, and lets the user type all alphas with zero lag.

Key findings:
- Clean Graphite alphas — no `LT()` or `MT()` on any alpha position
- Thumb cluster: `MO(1)`, Space, Backspace, `MO(2)`
- Combo timing defines (`COMBO_TERM 30`, `COMBO_MUST_HOLD_MODS`, `COMBO_STRICT_TIMER`) configured in `config.h` even with zero combos
- Unsized `combo_t key_combos[]` with `sizeof` introspection replaces manual `COMBO_COUNT` define
- Removed all mod-tap artifacts: `PERMISSIVE_HOLD`, `TAPPING_TERM_PER_KEY`, `QUICK_TAP_TERM`
- `ORYX_ENABLE` kept for ZSA live-training compatibility

Risks & notes:
- Empty combo array compilation — GCC handles zero-length arrays as extension (verified safe)
- `SERIAL_NUMBER` kept from old layout for Oryx compatibility

#### Phase 2: Combos

**Goal:** Common commands and bare modifiers fire via natural two-key rolling combos on the base layer.

Key findings:
- 18 combos total: 14 commands (tap), 3 modifiers (hold 150ms), 1 escape
- `COMBO_MUST_HOLD_MODS` auto-distinguishes tap vs hold — `KEYCODE_IS_MOD` checks `IS_MODIFIER_KEYCODE` in QMK source
- Command keycodes like `LGUI(KC_C)` have non-zero basic keycodes, so they fire instantly on tap within 30ms `COMBO_TERM`
- All combo pairs use adjacent-column, different-finger keys — cross-referenced against Graphite bigram data
- O+U pair (~1.5% bigram frequency) intentionally avoided as highest-risk collision
- LED modifier indicators via `rgb_matrix_indicators_advanced_user` with `get_mods() | get_weak_mods()`
- Gruvbox color palette: yellow for Cmd, aqua for Ctrl
- Voyager has 52 addressable RGB LEDs via IS31FL3731 driver

Risks & notes:
- R+T pair ('tr' ~0.3%) assigned to Copy — monitor during daily use
- H+A pair ('ha' ~1.2%) safe for Cmd because hold requirement prevents tap misfires
- LED colors set outside indicator callback get overwritten by animation frames

#### Phase 3: Layers

**Goal:** Full symbols/numbers layout and vim-style navigation accessible without leaving home position.

Key findings:
- Layer 1 (symbols): brackets/parens/braces on left home row, numpad on right
- Layer 2 (nav): vim h/j/k/l arrows on right home row, Home/End/PgUp/PgDn on bottom row
- Convenience keys (Tab, Enter, Escape, Backspace) on left hand of nav layer for one-handed editing
- `COMBO_ONLY_FROM_LAYER 0` means combos work from any active layer — combo resolution always uses base layer keycodes
- `MO()` key positions must be `KC_TRANSPARENT` on their target layer to prevent layer sticking
- Layer LED indicators: orange (Gruvbox `#fe8019`) for symbols, blue (`#83a598`) for nav
- Layer check runs before modifier check in LED indicator chain — layer context takes priority

Risks & notes:
- Shifted keycodes (`KC_LPRN` etc.) internally register/unregister shift — don't hold physical shift simultaneously
- `LAYER_STATE_8BIT` limits total layers to 0-7 (sufficient for this layout)

#### Phase 4: Polish

**Goal:** Daily-driver ready with key repeat and timing tuned from real usage.

Key findings:
- `QK_REP` placed on both layer thumbs — nav layer left inner thumb, symbols layer right inner thumb
- `QK_REP` auto-ignores `MO` keys, modifier keycodes, and itself — layer switching never overwrites repeat buffer
- `QK_REP` remembers modifier state: Shift+A then REP sends Shift+A again
- Can repeat combo outputs: Copy combo (R+T) then REP sends Cmd+C again
- `NO_ALT_REPEAT_KEY` saves ~500 bytes firmware (`QK_AREP` not needed with dedicated nav layer)
- Fixed `build.sh` to use `QMK_HOME` from `qmk config` instead of hardcoded path
- Final firmware binary: 55KB, flashable via Keymapp

Risks & notes:
- `COMBO_TERM` may need adjustment after extended daily use — tune in 2-3ms increments
- Per-combo timing (`COMBO_TERM_PER_COMBO`) available if individual combos need different windows

### Bigram collision analysis

Each combo pair cross-referenced against English bigram frequency on the Graphite layout. Pairs with >0.3% frequency are flagged.

| Pair | Frequency | Risk | Assignment | Note |
|------|-----------|------|------------|------|
| O+U | ~1.5% | high | Avoided | Highest-risk pair — intentionally left unassigned |
| H+A | ~1.2% | safe | Right Cmd | Hold requirement (150ms) prevents tap misfires during fast 'ha' rolls |
| R+T | ~0.3% | medium | Copy | Monitor during daily use at 30ms COMBO_TERM |
| L+D | ~0.3% | safe | Escape | Proven safe with COMBO_STRICT_TIMER |
| F+O | ~0.3% | medium | Quick Open | Cross-finger roll, monitoring recommended |
| E+I | ~0.3% | medium | App Switch | Right hand pair, moderate frequency |
| T+S | ~0.1% | safe | Left Cmd | Low bigram frequency |
| B+L | ~0.1% | safe | Close Window | Low bigram frequency |
| A+E | ~0.02% | safe | Right Ctrl | Very low frequency |
| N+R | ~0.05% | safe | Undo | Very low frequency |
| X+M | ~0% | safe | Paste | 'xm' essentially nonexistent in English |
| M+C | ~0.02% | safe | Cut | Very low frequency |
| C+V | ~0% | safe | Redo | 'cv' does not occur in English |
| Q+X | ~0% | safe | Save | 'qx' does not occur in English |

### Sources

- [QMK Combo Documentation](https://docs.qmk.fm/features/combo)
- [QMK Repeat Key](https://docs.qmk.fm/features/repeat_key)
- [QMK RGB Matrix](https://docs.qmk.fm/features/rgb_matrix)
- [Graphite Layout](https://github.com/rdavison/graphite-layout)
- [Combo Mods Guide](https://jasoncarloscox.com/writing/combo-mods/)
- [ZSA Combos Blog](https://blog.zsa.io/2212-combos/)
- [Symbol Layer Design (getreuer.info)](https://getreuer.info/posts/keyboards/symbol-layer/index.html)
- [Gruvbox Color Palette](https://github.com/morhetz/gruvbox-contrib)

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
