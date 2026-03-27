"use client";

import { getWorkspaceExportJobsCopy } from "./workspace-export-jobs-copy";
import type { WorkspaceExportJobsCardProps } from "./workspace-export-jobs-card.types";
import { WorkspaceExportJobsContent } from "./workspace-export-jobs-content";
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
    loadFailedMessage: copy.loadFailed,
    createFailedMessage: copy.createFailed,
    downloadFailedMessage: copy.downloadFailed,
    queuedMessage: copy.queued,
  });

  return (
    <section className="record-card" style={{ marginTop: 24 }}>
      <WorkspaceExportJobsContent
        headerProps={{ actionLoading, copy, loading, onCreateJob: () => void handleCreateJob(), onLoadJobs: () => void loadJobs(), role }}
        listProps={{ actionLoading, downloadLabel: copy.download, emptyLabel: copy.empty, jobs, locale, onDownload: handleDownload }}
        noticesProps={{ error, message, ownerOnlyLabel: copy.ownerOnly, role }}
      />
    </section>
  );
}
