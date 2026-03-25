"use client";

import type { WorkspaceExportControlsActionProps } from "./workspace-export-controls-action.types";

export function WorkspaceExportControlsAction({ buttonLabel, loading, ownerOnlyLabel, role, onDownload }: WorkspaceExportControlsActionProps) {
  return role === "owner" ? (
    <div className="action-row" style={{ marginTop: 16 }}>
      <button className="button secondary" disabled={loading} type="button" onClick={onDownload}>
        {buttonLabel}
      </button>
    </div>
  ) : (
    <div className="notice" style={{ marginTop: 16 }}>{ownerOnlyLabel}</div>
  );
}
