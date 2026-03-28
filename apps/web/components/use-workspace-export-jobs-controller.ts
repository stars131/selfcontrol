"use client";

import { useEffect } from "react";

import type { UseWorkspaceExportJobsControllerProps } from "./use-workspace-export-jobs-controller.types";
import { useWorkspaceExportJobsState } from "./use-workspace-export-jobs-state";
import { createWorkspaceExportJobsActions } from "./workspace-export-jobs-actions";

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
    ...state,
    token,
    workspaceId,
    loadFailedMessage,
    createFailedMessage,
    downloadFailedMessage,
    queuedMessage,
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
