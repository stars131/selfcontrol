"use client";

import { WorkspaceExportJobsListItem } from "./workspace-export-jobs-list-item";
import type { WorkspaceExportJobsListProps } from "./workspace-export-jobs-list.types";

export function WorkspaceExportJobsList({ actionLoading, downloadLabel, emptyLabel, jobs, locale, onDownload }: WorkspaceExportJobsListProps) {
  return (
    <div className="record-list compact-list" style={{ marginTop: 16 }}>
      {jobs.length ? (
        jobs.map((job) => (
          <WorkspaceExportJobsListItem actionLoading={actionLoading} downloadLabel={downloadLabel} job={job} key={job.id} locale={locale} onDownload={onDownload} />
        ))
      ) : (
        <div className="notice">{emptyLabel}</div>
      )}
    </div>
  );
}
