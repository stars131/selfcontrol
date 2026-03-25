"use client";

import type { WorkspaceExportControlsStatusProps } from "./workspace-export-controls-status.types";

export function WorkspaceExportControlsStatus({ error, success }: WorkspaceExportControlsStatusProps) {
  return (
    <>
      {error ? <div className="notice error" style={{ marginTop: 16 }}>{error}</div> : null}
      {success ? <div className="notice" style={{ marginTop: 16 }}>{success}</div> : null}
    </>
  );
}
