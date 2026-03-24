"use client";
import type { RecordPanelLegacyStatsHeaderProps } from "./record-panel-legacy-stats.types";
export function RecordPanelLegacyStatsHeader({ workspaceId, onResetFilter }: RecordPanelLegacyStatsHeaderProps) {
  return (
    <div className="panel-header">
      <div>
        <div className="eyebrow">Workspace</div>
        <h2 className="title" style={{ fontSize: 22 }}>
          Structured Results
        </h2>
        <div className="muted" style={{ marginTop: 8 }}>
          {workspaceId}
        </div>
      </div>
      <button className="button secondary" type="button" onClick={() => void onResetFilter()}>
        Reset list
      </button>
    </div>
  );
}
