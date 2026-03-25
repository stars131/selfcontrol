"use client";

import type { WorkspaceExportControlsProps } from "./workspace-export-controls.types";

export function WorkspaceExportControls({
  buttonLabel,
  error,
  loading,
  ownerOnlyLabel,
  role,
  success,
  onDownload,
}: WorkspaceExportControlsProps) {
  return (
    <>
      {role === "owner" ? (
        <div className="action-row" style={{ marginTop: 16 }}>
          <button className="button secondary" disabled={loading} type="button" onClick={onDownload}>
            {buttonLabel}
          </button>
        </div>
      ) : (
        <div className="notice" style={{ marginTop: 16 }}>
          {ownerOnlyLabel}
        </div>
      )}
      {error ? (
        <div className="notice error" style={{ marginTop: 16 }}>
          {error}
        </div>
      ) : null}
      {success ? (
        <div className="notice" style={{ marginTop: 16 }}>
          {success}
        </div>
      ) : null}
    </>
  );
}
