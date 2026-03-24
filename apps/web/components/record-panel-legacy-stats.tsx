"use client";

import { RecordPanelLegacyStatsGrid } from "./record-panel-legacy-stats-grid";
import { RecordPanelLegacyStatsHeader } from "./record-panel-legacy-stats-header";
import type { RecordPanelLegacyStatsProps } from "./record-panel-legacy-stats.types";
export function RecordPanelLegacyStats({ avoidCount, foodCount, recordCount, workspaceId, onResetFilter }: RecordPanelLegacyStatsProps) {
  return (
    <>
      <RecordPanelLegacyStatsHeader workspaceId={workspaceId} onResetFilter={onResetFilter} />
      <RecordPanelLegacyStatsGrid
        avoidCount={avoidCount}
        foodCount={foodCount}
        recordCount={recordCount}
      />
    </>
  );
}
