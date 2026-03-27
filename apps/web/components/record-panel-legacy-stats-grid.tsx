"use client";
import { useStoredLocale } from "../lib/locale";
import { getRecordPanelUiBundle } from "../lib/record-panel-ui";
import type { RecordPanelLegacyStatsGridProps } from "./record-panel-legacy-stats.types";
export function RecordPanelLegacyStatsGrid({ avoidCount, foodCount, recordCount }: RecordPanelLegacyStatsGridProps) {
  const { locale } = useStoredLocale(), { panelCopy } = getRecordPanelUiBundle(locale);
  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="eyebrow">{panelCopy.visibleRecords}</div>
        <div className="title" style={{ fontSize: 20 }}>
          {recordCount}
        </div>
      </div>
      <div className="stat-card">
        <div className="eyebrow">{panelCopy.food}</div>
        <div className="title" style={{ fontSize: 20 }}>
          {foodCount}
        </div>
      </div>
      <div className="stat-card">
        <div className="eyebrow">{panelCopy.avoid}</div>
        <div className="title" style={{ fontSize: 20 }}>
          {avoidCount}
        </div>
      </div>
    </div>
  );
}
