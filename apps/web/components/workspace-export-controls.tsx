"use client";

import { WorkspaceExportControlsAction } from "./workspace-export-controls-action";
import { WorkspaceExportControlsStatus } from "./workspace-export-controls-status";
import type { WorkspaceExportControlsProps } from "./workspace-export-controls.types";

export function WorkspaceExportControls({ buttonLabel, error, loading, ownerOnlyLabel, role, success, onDownload }: WorkspaceExportControlsProps) {
  return (
    <>
      <WorkspaceExportControlsAction buttonLabel={buttonLabel} loading={loading} ownerOnlyLabel={ownerOnlyLabel} role={role} onDownload={onDownload} />
      <WorkspaceExportControlsStatus error={error} success={success} />
    </>
  );
}
