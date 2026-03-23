"use client";

import type { FormEvent } from "react";

import {
  acceptShareToken,
  createWorkspace,
  createWorkspaceImportJob,
  downloadWorkspaceTransferJob,
  importWorkspaceArchive,
  listWorkspaceTransferJobs,
  listWorkspaces,
  previewShareToken,
} from "../lib/api";
import { clearStoredSession } from "../lib/auth";
import {
  extractWorkspaceShareToken,
  getWorkspaceEntryActionErrorMessage,
  slugifyWorkspaceName,
} from "./workspace-entry-controller-helpers";
import type {
  RouterLike,
  WorkspaceEntryControllerState,
} from "./workspace-entry-controller.types";

export function createWorkspaceEntryControllerActions({
  router,
  state,
}: {
  router: RouterLike;
  state: WorkspaceEntryControllerState;
}) {
  const {
    fileInputRef,
    importFile,
    importName,
    importSlug,
    name,
    setCreating,
    setError,
    setImportFile,
    setImportName,
    setImportSlug,
    setImporting,
    setJobsLoading,
    setJoining,
    setPreviewing,
    setQueueingImportJob,
    setSharePreview,
    setTransferJobs,
    setWorkspaces,
    token,
  } = state;

  const loadTransferJobs = async (activeToken: string) => {
    setJobsLoading(true);
    try {
      const result = await listWorkspaceTransferJobs(activeToken);
      setTransferJobs(result.items);
    } finally {
      setJobsLoading(false);
    }
  };

  const resetImportForm = () => {
    setImportName("");
    setImportSlug("");
    setImportFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleCreate = async (
    event: FormEvent<HTMLFormElement>,
    suggestedSlug: string,
    setName: WorkspaceEntryControllerState["setName"],
  ) => {
    event.preventDefault();
    if (!token || !name.trim()) {
      return;
    }

    setCreating(true);
    setError("");
    try {
      const result = await createWorkspace(token, {
        name: name.trim(),
        slug: suggestedSlug || `workspace-${Date.now()}`,
      });
      setWorkspaces((current) => [result.workspace, ...current]);
      setName("");
      router.push(`/app/workspaces/${result.workspace.id}`);
    } catch (caught) {
      setError(getWorkspaceEntryActionErrorMessage(caught, "Failed to create workspace"));
    } finally {
      setCreating(false);
    }
  };

  const handleImportWorkspace = async () => {
    if (!token || !importFile) {
      return;
    }

    setImporting(true);
    setError("");
    try {
      const result = await importWorkspaceArchive(token, {
        file: importFile,
        name: importName.trim() || undefined,
        slug: slugifyWorkspaceName(importSlug) || undefined,
      });
      const workspaceResult = await listWorkspaces(token);
      setWorkspaces(workspaceResult.items);
      await loadTransferJobs(token);
      resetImportForm();
      router.push(`/app/workspaces/${result.result.workspace.id}`);
    } catch (caught) {
      setError(getWorkspaceEntryActionErrorMessage(caught, "Failed to import workspace"));
    } finally {
      setImporting(false);
    }
  };

  const handleQueueImportJob = async () => {
    if (!token || !importFile) {
      return;
    }

    setQueueingImportJob(true);
    setError("");
    try {
      await createWorkspaceImportJob(token, {
        file: importFile,
        name: importName.trim() || undefined,
        slug: slugifyWorkspaceName(importSlug) || undefined,
      });
      await loadTransferJobs(token);
      resetImportForm();
    } catch (caught) {
      setError(getWorkspaceEntryActionErrorMessage(caught, "Failed to create import job"));
    } finally {
      setQueueingImportJob(false);
    }
  };

  const handlePreviewShare = async (shareTokenInput: string) => {
    const normalizedShareToken = extractWorkspaceShareToken(shareTokenInput);
    if (!normalizedShareToken) {
      return;
    }

    setPreviewing(true);
    setError("");
    try {
      const result = await previewShareToken(normalizedShareToken);
      setSharePreview(result.preview);
    } catch (caught) {
      setSharePreview(null);
      setError(getWorkspaceEntryActionErrorMessage(caught, "Failed to preview share link"));
    } finally {
      setPreviewing(false);
    }
  };

  const handleAcceptShare = async (shareTokenInput: string) => {
    const normalizedShareToken = extractWorkspaceShareToken(shareTokenInput);
    if (!token || !normalizedShareToken) {
      return;
    }

    setJoining(true);
    setError("");
    try {
      const result = await acceptShareToken(token, normalizedShareToken);
      const workspaceResult = await listWorkspaces(token);
      setWorkspaces(workspaceResult.items);
      router.push(`/app/workspaces/${result.workspace.id}`);
    } catch (caught) {
      setError(getWorkspaceEntryActionErrorMessage(caught, "Failed to join shared workspace"));
    } finally {
      setJoining(false);
    }
  };

  const handleLogout = () => {
    clearStoredSession();
    router.replace("/login");
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
      setError(getWorkspaceEntryActionErrorMessage(caught, "Failed to download transfer job result"));
    }
  };

  return {
    loadTransferJobs,
    handleCreate,
    handleImportWorkspace,
    handleQueueImportJob,
    handlePreviewShare,
    handleAcceptShare,
    handleLogout,
    handleDownloadTransferJob,
  };
}
