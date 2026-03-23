"use client";

import type { LocaleCode } from "../lib/locale";
import type { WorkspaceTransferJob } from "../lib/types";

type WorkspaceExportJobsListProps = {
  actionLoading: boolean;
  downloadLabel: string;
  emptyLabel: string;
  jobs: WorkspaceTransferJob[];
  locale: LocaleCode;
  onDownload: (jobId: string) => Promise<void>;
};

export function WorkspaceExportJobsList({
  actionLoading,
  downloadLabel,
  emptyLabel,
  jobs,
  locale,
  onDownload,
}: WorkspaceExportJobsListProps) {
  return (
    <div className="record-list compact-list" style={{ marginTop: 16 }}>
      {jobs.length ? (
        jobs.map((job) => (
          <article className="message" key={job.id}>
            <div className="action-row" style={{ justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div className="eyebrow">{job.job_type} / {job.status}</div>
                <div style={{ marginTop: 8, fontWeight: 600 }}>{job.id}</div>
                <div className="muted" style={{ marginTop: 8 }}>
                  {new Date(job.created_at).toLocaleString(locale)}
                </div>
              </div>
              {job.status === "completed" ? (
                <button
                  className="button secondary"
                  disabled={actionLoading}
                  type="button"
                  onClick={() => void onDownload(job.id)}
                >
                  {downloadLabel}
                </button>
              ) : null}
            </div>
            {job.error_message ? <div className="notice error" style={{ marginTop: 12 }}>{job.error_message}</div> : null}
          </article>
        ))
      ) : (
        <div className="notice">{emptyLabel}</div>
      )}
    </div>
  );
}
