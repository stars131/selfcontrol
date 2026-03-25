"use client";

import { downloadWorkspaceTransferJob, listWorkspaceTransferJobs } from "../lib/api";
import { getWorkspaceEntryActionErrorMessage } from "./workspace-entry-controller-helpers";
import type { CreateWorkspaceEntryJobActionsInput } from "./workspace-entry-job-actions.types";

export function createWorkspaceEntryJobActions({
  setError,
  setJobsLoading,
  setTransferJobs,
  token,
}: CreateWorkspaceEntryJobActionsInput) {
  const loadTransferJobs = async (activeToken: string) => {
    setJobsLoading(true);
    try {
      const result = await listWorkspaceTransferJobs(activeToken);
      setTransferJobs(result.items);
    } finally {
      setJobsLoading(false);
    }
  };

  const handleDownloadTransferJob = async (jobId: string) => {
    if (!token) {
      return;
    }

    setError("");
    try {
      const result = await downloadWorkspaceTransferJob(token, jobId);
      const objectUrl = window.URL.createObjectURL(result.blob);
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = result.filename ?? `workspace-transfer-${jobId}.zip`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(objectUrl);
    } catch (caught) {
      setError(
        getWorkspaceEntryActionErrorMessage(
          caught,
          "Failed to download transfer job result",
        ),
      );
    }
  };

  return {
    loadTransferJobs,
    handleDownloadTransferJob,
  };
}
