"use client";

import { useEffect, useState } from "react";

import {
  createWorkspaceExportJob,
  downloadWorkspaceTransferJob,
  listWorkspaceTransferJobs,
} from "../lib/api";
import type { WorkspaceTransferJob } from "../lib/types";

type UseWorkspaceExportJobsControllerProps = {
  token: string;
  workspaceId: string;
  loadFailedMessage: string;
  createFailedMessage: string;
  downloadFailedMessage: string;
  queuedMessage: string;
};

function getActionErrorMessage(caught: unknown, fallbackMessage: string) {
  return caught instanceof Error ? caught.message : fallbackMessage;
}

export function useWorkspaceExportJobsController({
  token,
  workspaceId,
  loadFailedMessage,
  createFailedMessage,
  downloadFailedMessage,
  queuedMessage,
}: UseWorkspaceExportJobsControllerProps) {
  const [jobs, setJobs] = useState<WorkspaceTransferJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

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

  useEffect(() => {
    void loadJobs();
  }, [token, workspaceId]);

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
    jobs,
    loading,
    actionLoading,
    error,
    message,
    loadJobs,
    handleCreateJob,
    handleDownload,
  };
}
