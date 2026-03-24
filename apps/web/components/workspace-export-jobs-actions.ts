"use client";

import {
  createWorkspaceExportJob,
  downloadWorkspaceTransferJob,
  listWorkspaceTransferJobs,
} from "../lib/api";
import type { WorkspaceTransferJob } from "../lib/types";

type WorkspaceExportJobsState = {
  setJobs: (value: WorkspaceTransferJob[] | ((current: WorkspaceTransferJob[]) => WorkspaceTransferJob[])) => void;
  setLoading: (value: boolean) => void;
  setActionLoading: (value: boolean) => void;
  setError: (value: string) => void;
  setMessage: (value: string) => void;
};

type CreateWorkspaceExportJobsActionsInput = {
  token: string;
  workspaceId: string;
  loadFailedMessage: string;
  createFailedMessage: string;
  downloadFailedMessage: string;
  queuedMessage: string;
  state: WorkspaceExportJobsState;
};

function getActionErrorMessage(caught: unknown, fallbackMessage: string) {
  return caught instanceof Error ? caught.message : fallbackMessage;
}

export function createWorkspaceExportJobsActions({
  token,
  workspaceId,
  loadFailedMessage,
  createFailedMessage,
  downloadFailedMessage,
  queuedMessage,
  state,
}: CreateWorkspaceExportJobsActionsInput) {
  const { setJobs, setLoading, setActionLoading, setError, setMessage } = state;

  const loadJobs = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await listWorkspaceTransferJobs(token);
      setJobs(result.items.filter((item) => item.job_type === "export" && item.workspace_id === workspaceId));
    } catch (caught) {
      setError(getActionErrorMessage(caught, loadFailedMessage));
    } finally {
      setLoading(false);
    }
  };

  const handleCreateJob = async () => {
    setActionLoading(true);
    setError("");
    setMessage("");
    try {
      await createWorkspaceExportJob(token, workspaceId);
      setMessage(queuedMessage);
      await loadJobs();
    } catch (caught) {
      setError(getActionErrorMessage(caught, createFailedMessage));
    } finally {
      setActionLoading(false);
    }
  };

  const handleDownload = async (jobId: string) => {
    setActionLoading(true);
    setError("");
    try {
      const result = await downloadWorkspaceTransferJob(token, jobId);
      const objectUrl = window.URL.createObjectURL(result.blob);
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = result.filename ?? `workspace-export-${jobId}.zip`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(objectUrl);
    } catch (caught) {
      setError(getActionErrorMessage(caught, downloadFailedMessage));
    } finally {
      setActionLoading(false);
    }
  };

  return {
    loadJobs,
    handleCreateJob,
    handleDownload,
  };
}
