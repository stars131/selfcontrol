"use client";

import { WorkspaceExportJobsHeaderActions } from "./workspace-export-jobs-header-actions";
import { WorkspaceExportJobsHeaderIntro } from "./workspace-export-jobs-header-intro";
import type { WorkspaceExportJobsHeaderProps } from "./workspace-export-jobs-header.types";

export function WorkspaceExportJobsHeader({ actionLoading, copy, loading, onCreateJob, onLoadJobs, role }: WorkspaceExportJobsHeaderProps) {
  return (
    <div className="action-row" style={{ justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
      <WorkspaceExportJobsHeaderIntro copy={copy} />
      <WorkspaceExportJobsHeaderActions actionLoading={actionLoading} copy={copy} loading={loading} onCreateJob={onCreateJob} onLoadJobs={onLoadJobs} role={role} />
    </div>
  );
}
