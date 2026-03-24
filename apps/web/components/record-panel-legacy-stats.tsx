"use client";

import { RecordPanelLegacyStatsGrid } from "./record-panel-legacy-stats-grid";
import { RecordPanelLegacyStatsHeader } from "./record-panel-legacy-stats-header";

export function RecordPanelLegacyStats({
  avoidCount,
  foodCount,
  recordCount,
  workspaceId,
  onResetFilter,
}: {
  avoidCount: number;
  foodCount: number;
  recordCount: number;
  workspaceId: string;
  onResetFilter: () => Promise<void>;
}) {
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
