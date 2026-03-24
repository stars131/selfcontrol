"use client";

import { useEffect } from "react";

import { useWorkspaceExportJobsState } from "./use-workspace-export-jobs-state";
import { createWorkspaceExportJobsActions } from "./workspace-export-jobs-actions";

type UseWorkspaceExportJobsControllerProps = {
  token: string;
  workspaceId: string;
  loadFailedMessage: string;
  createFailedMessage: string;
  downloadFailedMessage: string;
  queuedMessage: string;
};

export function useWorkspaceExportJobsController({
  token,
  workspaceId,
  loadFailedMessage,
  createFailedMessage,
  downloadFailedMessage,
  queuedMessage,
}: UseWorkspaceExportJobsControllerProps) {
  const state = useWorkspaceExportJobsState();
  const { loadJobs, handleCreateJob, handleDownload } = createWorkspaceExportJobsActions({
    token,
    workspaceId,
    loadFailedMessage,
    createFailedMessage,
    downloadFailedMessage,
    queuedMessage,
    state,
  });

  useEffect(() => {
    void loadJobs();
  }, [token, workspaceId]);

  return {
    ...state,
    loadJobs,
    handleCreateJob,
    handleDownload,
  };
}
