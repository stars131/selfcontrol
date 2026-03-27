"use client";

import { RecordPanelStatCard } from "./record-panel-stat-card";
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
      <RecordPanelStatCard label={visibleRecordsLabel} value={visibleRecordCount} />
      <RecordPanelStatCard label={foodLabel} value={foodCount} />
      <RecordPanelStatCard label={avoidLabel} value={avoidCount} />
    </div>
  );
}
