"use client";

import { WorkspaceTransferJobsList } from "./workspace-transfer-jobs-list";
import type { WorkspaceTransferJobsSectionProps } from "./workspace-transfer-jobs-section.types";

export function WorkspaceTransferJobsSection({
  copy,
  locale,
  token,
  jobsLoading,
  transferJobs,
  onRefreshJobs,
  onDownloadTransferJob,
}: WorkspaceTransferJobsSectionProps) {
  return (
    <section className="record-card" style={{ gridColumn: "1 / -1" }}>
      <div className="action-row" style={{ justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div className="eyebrow">{copy.jobsEyebrow}</div>
          <h2 style={{ margin: "8px 0 12px" }}>{copy.jobsTitle}</h2>
        </div>
        <button
          className="button secondary"
          disabled={jobsLoading || !token}
          type="button"
          onClick={() => (token ? void onRefreshJobs() : undefined)}
        >
          {jobsLoading ? `${copy.refreshJobs}...` : copy.refreshJobs}
        </button>
      </div>
      <WorkspaceTransferJobsList
        copy={copy}
        locale={locale}
        onDownloadTransferJob={onDownloadTransferJob}
        transferJobs={transferJobs}
      />
    </section>
  );
}
