"use client";

import type { WorkspaceExportJobsHeaderActionsProps } from "./workspace-export-jobs-header-actions.types";

export function WorkspaceExportJobsHeaderActions({ actionLoading, copy, loading, onCreateJob, onLoadJobs, role }: WorkspaceExportJobsHeaderActionsProps) {
  return (
    <div className="action-row">
      <button className="button secondary" disabled={loading || actionLoading} type="button" onClick={onLoadJobs}>
        {loading ? copy.loading : copy.refresh}
      </button>
      {role === "owner" ? (
        <button className="button secondary" disabled={actionLoading} type="button" onClick={onCreateJob}>
          {actionLoading ? copy.loading : copy.queue}
        </button>
      ) : null}
    </div>
  );
}
