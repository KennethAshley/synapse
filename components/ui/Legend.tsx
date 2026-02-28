const items = [
  { label: "Alpha", bg: "#1c2333", border: "#388bfd40" },
  { label: "Punctuation", bg: "#1c2128", border: "#a371f740" },
  { label: "Number", bg: "#1c2128", border: "#3fb95040" },
  { label: "Modifier", bg: "#1c2128", border: "#f0883e40" },
  { label: "Thumb", bg: "#1a2233", border: "#58a6ff60" },
  { label: "Transparent", bg: "#0d111780", border: "#21262d" },
];

export function Legend() {
  return (
    <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
      {items.map((item) => (
        <div
          key={item.label}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 12,
            color: "var(--kb-text-muted)",
          }}
        >
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: 3,
              background: item.bg,
              border: `1px solid ${item.border}`,
            }}
          />
          {item.label}
        </div>
      ))}
    </div>
  );
}
