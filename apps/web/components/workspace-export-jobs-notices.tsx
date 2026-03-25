"use client";

import type { WorkspaceExportJobsNoticesProps } from "./workspace-export-jobs-notices.types";

export function WorkspaceExportJobsNotices({ error, message, ownerOnlyLabel, role }: WorkspaceExportJobsNoticesProps) {
  return (
    <>
      {role !== "owner" ? <div className="notice" style={{ marginTop: 16 }}>{ownerOnlyLabel}</div> : null}
      {error ? <div className="notice error" style={{ marginTop: 16 }}>{error}</div> : null}
      {message ? <div className="notice" style={{ marginTop: 16 }}>{message}</div> : null}
    </>
  );
}
