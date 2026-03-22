"use client";

import type { PanelCopy } from "../lib/record-panel-ui";

export function RecordPanelHeader({
  canWriteWorkspace,
  onCreateRecord,
  panelCopy,
  workspaceId,
}: {
  canWriteWorkspace: boolean;
  onCreateRecord: () => void;
  panelCopy: Pick<PanelCopy, "workspace" | "structuredResults" | "newRecord">;
  workspaceId: string;
}) {
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
      <div className="action-row">
        <button className="button secondary" disabled={!canWriteWorkspace} type="button" onClick={onCreateRecord}>
          {panelCopy.newRecord}
        </button>
      </div>
    </div>
  );
}
