"use client";

import { WorkspaceTransferJobCard } from "./workspace-transfer-job-card";
import type { WorkspaceTransferJobsSectionProps } from "./workspace-transfer-jobs-section.types";

export function WorkspaceTransferJobsList({
  copy,
  locale,
  transferJobs,
  onDownloadTransferJob,
}: Pick<
  WorkspaceTransferJobsSectionProps,
  "copy" | "locale" | "transferJobs" | "onDownloadTransferJob"
>) {
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
