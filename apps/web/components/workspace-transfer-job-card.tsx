"use client";

import Link from "next/link";

import type { LocaleCode } from "../lib/locale";
import type { WorkspaceTransferJob } from "../lib/types";
import type { WorkspaceTransferJobsCopy } from "./workspace-transfer-jobs-section.types";

export function WorkspaceTransferJobCard({
  copy,
  job,
  locale,
  onDownloadTransferJob,
}: {
  copy: WorkspaceTransferJobsCopy;
  job: WorkspaceTransferJob;
  locale: LocaleCode;
  onDownloadTransferJob: (jobId: string) => Promise<void>;
}) {
  const importedWorkspaceId =
    job.job_type === "import" && typeof job.result_json.workspace_id === "string"
      ? job.result_json.workspace_id
      : null;

  return (
    <article className="message">
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
            <button className="button secondary" type="button" onClick={() => void onDownloadTransferJob(job.id)}>
              {copy.downloadExportJob}
            </button>
          ) : null}
        </div>
      </div>
    </article>
  );
}
