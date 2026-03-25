"use client";

import type { RecordPanelStatsProps } from "./record-panel-stats.types";

export function RecordPanelStats({
  visibleRecordsLabel,
  foodLabel,
  avoidLabel,
  visibleRecordCount,
  foodCount,
  avoidCount,
}: RecordPanelStatsProps) {
  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="eyebrow">{visibleRecordsLabel}</div>
        <div className="title" style={{ fontSize: 20 }}>
          {visibleRecordCount}
        </div>
      </div>
      <div className="stat-card">
        <div className="eyebrow">{foodLabel}</div>
        <div className="title" style={{ fontSize: 20 }}>
          {foodCount}
        </div>
      </div>
      <div className="stat-card">
        <div className="eyebrow">{avoidLabel}</div>
        <div className="title" style={{ fontSize: 20 }}>
          {avoidCount}
        </div>
      </div>
    </div>
  );
}
