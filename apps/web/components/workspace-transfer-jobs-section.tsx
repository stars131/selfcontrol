"use client";

import Link from "next/link";

import type { LocaleCode } from "../lib/locale";
import type { WorkspaceTransferJob } from "../lib/types";

type WorkspaceTransferJobsCopy = {
  jobsEyebrow: string;
  jobsTitle: string;
  refreshJobs: string;
  openImportedWorkspace: string;
  downloadExportJob: string;
  noJobs: string;
};

export function WorkspaceTransferJobsSection({
  copy,
  locale,
  token,
  jobsLoading,
  transferJobs,
  onRefreshJobs,
  onDownloadTransferJob,
}: {
  copy: WorkspaceTransferJobsCopy;
  locale: LocaleCode;
  token: string | null;
  jobsLoading: boolean;
  transferJobs: WorkspaceTransferJob[];
  onRefreshJobs: () => Promise<void>;
  onDownloadTransferJob: (jobId: string) => Promise<void>;
}) {
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
      <div className="record-list compact-list">
        {transferJobs.length ? (
          transferJobs.map((job) => {
            const importedWorkspaceId =
              job.job_type === "import" && typeof job.result_json.workspace_id === "string"
                ? job.result_json.workspace_id
                : null;
            return (
              <article className="message" key={job.id}>
                <div className="action-row" style={{ justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div className="eyebrow">{job.job_type} / {job.status}</div>
                    <div style={{ marginTop: 8, fontWeight: 600 }}>{job.id}</div>
                    <div className="muted" style={{ marginTop: 8 }}>
                      {new Date(job.created_at).toLocaleString(locale)}
                    </div>
                    {job.error_message ? (
                      <div className="notice error" style={{ marginTop: 12 }}>{job.error_message}</div>
                    ) : null}
                  </div>
                  <div className="action-row">
                    {job.job_type === "import" && importedWorkspaceId && job.status === "completed" ? (
                      <Link className="button secondary" href={`/app/workspaces/${importedWorkspaceId}`}>
                        {copy.openImportedWorkspace}
                      </Link>
                    ) : null}
                    {job.job_type === "export" && job.status === "completed" ? (
                      <button
                        className="button secondary"
                        type="button"
                        onClick={() => void onDownloadTransferJob(job.id)}
                      >
                        {copy.downloadExportJob}
                      </button>
                    ) : null}
                  </div>
                </div>
              </article>
            );
          })
        ) : (
          <div className="notice">{copy.noJobs}</div>
        )}
      </div>
    </section>
  );
}
