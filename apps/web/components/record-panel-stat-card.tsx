"use client";

import type { RecordPanelStatCardProps } from "./record-panel-stat-card.types";

export function RecordPanelStatCard({ label, value }: RecordPanelStatCardProps) {
  return (
    <div className="stat-card">
      <div className="eyebrow">{label}</div>
      <div className="title" style={{ fontSize: 20 }}>
        {value}
      </div>
    </div>
  );
}
