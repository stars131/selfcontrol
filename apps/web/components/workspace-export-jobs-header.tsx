"use client";

import { WorkspaceExportJobsHeaderActions } from "./workspace-export-jobs-header-actions";
import type { WorkspaceExportJobsHeaderProps } from "./workspace-export-jobs-header.types";

export function WorkspaceExportJobsHeader({ actionLoading, copy, loading, onCreateJob, onLoadJobs, role }: WorkspaceExportJobsHeaderProps) {
  return (
    <div className="action-row" style={{ justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
      <div>
        <div className="eyebrow">{copy.eyebrow}</div>
        <div style={{ fontSize: "1.1rem", fontWeight: 700, marginTop: 8 }}>{copy.title}</div>
        <div className="muted" style={{ marginTop: 8, lineHeight: 1.7 }}>{copy.description}</div>
      </div>
      <WorkspaceExportJobsHeaderActions actionLoading={actionLoading} copy={copy} loading={loading} onCreateJob={onCreateJob} onLoadJobs={onLoadJobs} role={role} />
    </div>
  );
}
