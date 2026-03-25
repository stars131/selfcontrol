"use client";

import { WorkspaceExportJobsListItemSummary } from "./workspace-export-jobs-list-item-summary";
import type { WorkspaceExportJobsListItemProps } from "./workspace-export-jobs-list-item.types";

export function WorkspaceExportJobsListItem({ actionLoading, downloadLabel, job, locale, onDownload }: WorkspaceExportJobsListItemProps) {
  return (
    <article className="message">
      <div className="action-row" style={{ justifyContent: "space-between", alignItems: "flex-start" }}>
        <WorkspaceExportJobsListItemSummary job={job} locale={locale} />
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
