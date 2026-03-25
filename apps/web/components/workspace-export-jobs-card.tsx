"use client";

import { getWorkspaceExportJobsCopy } from "./workspace-export-jobs-copy";
import { WorkspaceExportJobsHeader } from "./workspace-export-jobs-header";
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
      <WorkspaceExportJobsHeader
        actionLoading={actionLoading}
        copy={copy}
        loading={loading}
        onCreateJob={() => void handleCreateJob()}
        onLoadJobs={() => void loadJobs()}
        role={role}
      />
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
