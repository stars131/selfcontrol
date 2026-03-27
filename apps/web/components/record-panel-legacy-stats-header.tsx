"use client";
import { useStoredLocale } from "../lib/locale";
import { getRecordPanelUiBundle } from "../lib/record-panel-ui";
import type { RecordPanelLegacyStatsHeaderProps } from "./record-panel-legacy-stats.types";
export function RecordPanelLegacyStatsHeader({ workspaceId, onResetFilter }: RecordPanelLegacyStatsHeaderProps) {
  const { locale } = useStoredLocale(), { panelCopy } = getRecordPanelUiBundle(locale);
  return (
    <div className="panel-header">
      <div>
        <div className="eyebrow">{panelCopy.workspace}</div>
        <h2 className="title" style={{ fontSize: 22 }}>
          {panelCopy.structuredResults}
        </h2>
        <div className="muted" style={{ marginTop: 8 }}>
          {workspaceId}
        </div>
      </div>
      <button className="button secondary" type="button" onClick={() => void onResetFilter()}>
        {panelCopy.resetList}
      </button>
    </div>
  );
}
