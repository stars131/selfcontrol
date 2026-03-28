"use client";

import {
  createWorkspaceExportJob,
  downloadWorkspaceTransferJob,
  listWorkspaceTransferJobs,
} from "../lib/api";
import { resolveErrorMessage } from "../lib/error-message";
import type { CreateWorkspaceExportJobsActionsInput } from "./workspace-export-jobs-actions.types";

function getActionErrorMessage(caught: unknown, fallbackMessage: string) {
  return resolveErrorMessage(caught, fallbackMessage);
}

export function createWorkspaceExportJobsActions({
  token,
  workspaceId,
  loadFailedMessage,
  createFailedMessage,
  downloadFailedMessage,
  queuedMessage,
  setJobs,
  setLoading,
  setActionLoading,
  setError,
  setMessage,
}: CreateWorkspaceExportJobsActionsInput) {
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
