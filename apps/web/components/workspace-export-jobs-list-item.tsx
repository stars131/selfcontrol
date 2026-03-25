"use client";

import type { WorkspaceExportJobsListItemProps } from "./workspace-export-jobs-list-item.types";

export function WorkspaceExportJobsListItem({ actionLoading, downloadLabel, job, locale, onDownload }: WorkspaceExportJobsListItemProps) {
  return (
    <article className="message">
      <div className="action-row" style={{ justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div className="eyebrow">{job.job_type} / {job.status}</div>
          <div style={{ marginTop: 8, fontWeight: 600 }}>{job.id}</div>
          <div className="muted" style={{ marginTop: 8 }}>{new Date(job.created_at).toLocaleString(locale)}</div>
        </div>
        {job.status === "completed" ? (
          <button className="button secondary" disabled={actionLoading} type="button" onClick={() => void onDownload(job.id)}>
            {downloadLabel}
          </button>
        ) : null}
      </div>
      {job.error_message ? <div className="notice error" style={{ marginTop: 12 }}>{job.error_message}</div> : null}
    </article>
  );
}
