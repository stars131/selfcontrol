"use client";

import { getWorkspaceExportJobsCopy } from "./workspace-export-jobs-copy";
import { WorkspaceExportJobsList } from "./workspace-export-jobs-list";
import type { WorkspaceExportJobsCardProps } from "./workspace-export-jobs-card.types";
import { useWorkspaceExportJobsController } from "./use-workspace-export-jobs-controller";

export function WorkspaceExportJobsCard({
  token,
  workspaceId,
  locale,
  role,
}: WorkspaceExportJobsCardProps) {
  const copy = getWorkspaceExportJobsCopy(locale);
  const {
    jobs,
    loading,
    actionLoading,
    error,
    message,
    loadJobs,
    handleCreateJob,
    handleDownload,
  } = useWorkspaceExportJobsController({
    token,
    workspaceId,
    loadFailedMessage: "Failed to load jobs",
    createFailedMessage: "Failed to create export job",
    downloadFailedMessage: "Failed to download job artifact",
    queuedMessage: copy.queued,
  });

  return (
    <section className="record-card" style={{ marginTop: 24 }}>
      <div className="action-row" style={{ justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
        <div>
          <div className="eyebrow">{copy.eyebrow}</div>
          <div style={{ fontSize: "1.1rem", fontWeight: 700, marginTop: 8 }}>{copy.title}</div>
          <div className="muted" style={{ marginTop: 8, lineHeight: 1.7 }}>{copy.description}</div>
        </div>
        <div className="action-row">
          <button className="button secondary" disabled={loading || actionLoading} type="button" onClick={() => void loadJobs()}>
            {loading ? copy.loading : copy.refresh}
          </button>
          {role === "owner" ? (
            <button className="button secondary" disabled={actionLoading} type="button" onClick={() => void handleCreateJob()}>
              {actionLoading ? copy.loading : copy.queue}
            </button>
          ) : null}
        </div>
      </div>
      {role !== "owner" ? <div className="notice" style={{ marginTop: 16 }}>{copy.ownerOnly}</div> : null}
      {error ? <div className="notice error" style={{ marginTop: 16 }}>{error}</div> : null}
      {message ? <div className="notice" style={{ marginTop: 16 }}>{message}</div> : null}
      <WorkspaceExportJobsList
        actionLoading={actionLoading}
        downloadLabel={copy.download}
        emptyLabel={copy.empty}
        jobs={jobs}
        locale={locale}
        onDownload={handleDownload}
      />
    </section>
  );
}
