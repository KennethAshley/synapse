"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { KeyboardLayout } from "@/components/keyboard/KeyboardLayout";
import { ComboPanel } from "@/components/combos/ComboPanel";
import { LedPreview } from "@/components/leds/LedPreview";
import { LayerSwitcher } from "@/components/ui/LayerSwitcher";
import { Legend } from "@/components/ui/Legend";
import { combos } from "@/data/combos";
import { comboLookup } from "@/lib/combo-lookup";
import { ComboType } from "@/data/types";

export default function Home() {
  const [activeLayer, setActiveLayer] = useState(0);
  const [hoveredKeyId, setHoveredKeyId] = useState<string | null>(null);
  const [hoveredComboId, setHoveredComboId] = useState<string | null>(null);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement) return;
      if (e.key === "1") setActiveLayer(0);
      if (e.key === "2") setActiveLayer(1);
      if (e.key === "3") setActiveLayer(2);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const { highlights, activeComboIds } = useMemo(() => {
    const highlights = new Map<string, ComboType>();
    let activeComboIds: string[] = [];

    if (hoveredComboId) {
      const combo = combos.find((c) => c.id === hoveredComboId);
      if (combo) {
        combo.keys.forEach((k) => highlights.set(k, combo.type));
        activeComboIds = [hoveredComboId];
      }
    } else if (hoveredKeyId) {
      const keyCombos = comboLookup.get(hoveredKeyId) ?? [];
      for (const combo of keyCombos) {
        for (const keyId of combo.keys) {
          if (!highlights.has(keyId)) {
            highlights.set(keyId, combo.type);
          }
        }
      }
      activeComboIds = keyCombos.map((c) => c.id);
    }

    return { highlights, activeComboIds };
  }, [hoveredKeyId, hoveredComboId]);

  return (
    <div
      style={{
        padding: 40,
        maxWidth: 1100,
        margin: "0 auto",
      }}
    >
      <h1
        style={{
          fontSize: 28,
          fontWeight: 600,
          marginBottom: 6,
          color: "var(--kb-text-bright)",
        }}
      >
        Synapse
      </h1>
      <p
        style={{
          fontSize: 14,
          color: "var(--kb-text-muted)",
          marginBottom: 40,
        }}
      >
        ZSA Voyager / Graphite Layout / Interactive Visualizer
      </p>

      <Legend />

      <div style={{ marginTop: 8, marginBottom: 16 }}>
        <LayerSwitcher
          activeLayer={activeLayer}
          onLayerChange={setActiveLayer}
        />
      </div>

      <div style={{ marginBottom: 48 }}>
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
              background:
                activeLayer === 0
                  ? "var(--kb-badge-active)"
                  : "var(--kb-badge-empty)",
              borderRadius: 4,
              padding: "2px 8px",
              letterSpacing: "0.5px",
            }}
          >
            LAYER {activeLayer}
          </span>
          <span
            style={{
              fontSize: 20,
              fontWeight: 600,
              color: "var(--kb-text-bright)",
            }}
          >
            {["Graphite Base", "Symbols + Numbers", "Vim Nav"][activeLayer]}
          </span>
          <span
            style={{
              fontSize: 13,
              color: "var(--kb-text-muted)",
              marginLeft: "auto",
            }}
          >
            {activeLayer === 0
              ? "All plain keycodes \u2014 combos fire from this layer"
              : activeLayer === 1
              ? "Hold left thumb \u2014 symbols on left, numpad on right"
              : "Hold right thumb \u2014 h/j/k/l arrows, Home/End/PgUp/PgDn"}
          </span>
        </div>

        <KeyboardLayout
          activeLayer={activeLayer}
          hoveredKeyId={hoveredKeyId}
          highlights={highlights}
          comboLookup={comboLookup}
          onKeyHover={setHoveredKeyId}
        />
      </div>

      <hr
        style={{
          border: "none",
          borderTop: "1px solid var(--kb-border-dim)",
          margin: "48px 0",
        }}
      />

      <div style={{ marginBottom: 48 }}>
        <ComboPanel
          activeComboIds={activeComboIds}
          onComboHover={setHoveredComboId}
        />
      </div>

      <hr
        style={{
          border: "none",
          borderTop: "1px solid var(--kb-border-dim)",
          margin: "48px 0",
        }}
      />

      <LedPreview />

      <div style={{ marginTop: 48, textAlign: "center" }}>
        <Link
          href="/research"
          style={{
            fontSize: 13,
            color: "var(--kb-text-muted)",
            textDecoration: "none",
          }}
        >
          Firmware Research &rarr;
        </Link>
      </div>
    </div>
  );
}
