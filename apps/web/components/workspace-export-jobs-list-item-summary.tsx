"use client";

import type { WorkspaceExportJobsListItemSummaryProps } from "./workspace-export-jobs-list-item-summary.types";

export function WorkspaceExportJobsListItemSummary({ job, locale }: WorkspaceExportJobsListItemSummaryProps) {
  return (
    <div>
      <div className="eyebrow">{job.job_type} / {job.status}</div>
      <div style={{ marginTop: 8, fontWeight: 600 }}>{job.id}</div>
      <div className="muted" style={{ marginTop: 8 }}>{new Date(job.created_at).toLocaleString(locale)}</div>
    </div>
  );
}
