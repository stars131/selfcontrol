"use client";

export function MapPanelUnavailableNotice() {
  return (
    <section className="record-card" style={{ marginTop: 20 }}>
      <div className="eyebrow">Map</div>
      <div className="notice" style={{ marginTop: 12 }}>
        AMap key is not configured. Add `NEXT_PUBLIC_AMAP_KEY` to `.env`.
      </div>
    </section>
  );
}
