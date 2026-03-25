"use client";

import { WorkspaceTransferJobCard } from "./workspace-transfer-job-card";
import type { WorkspaceTransferJobsListProps } from "./workspace-transfer-jobs-list.types";

export function WorkspaceTransferJobsList({
  copy,
  locale,
  transferJobs,
  onDownloadTransferJob,
}: WorkspaceTransferJobsListProps) {
  return (
    <div className="record-list compact-list">
      {transferJobs.length ? (
        transferJobs.map((job) => (
          <WorkspaceTransferJobCard
            copy={copy}
            job={job}
            key={job.id}
            locale={locale}
            onDownloadTransferJob={onDownloadTransferJob}
          />
        ))
      ) : (
        <div className="notice">{copy.noJobs}</div>
      )}
    </div>
  );
}
