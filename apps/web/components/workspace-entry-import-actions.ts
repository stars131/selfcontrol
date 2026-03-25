"use client";

import {
  createWorkspaceImportJob,
  importWorkspaceArchive,
  listWorkspaces,
} from "../lib/api";
import {
  getWorkspaceEntryActionErrorMessage,
  slugifyWorkspaceName,
} from "./workspace-entry-controller-helpers";
import type { CreateWorkspaceEntryImportActionsInput } from "./workspace-entry-import-actions.types";

export function createWorkspaceEntryImportActions({
  loadTransferJobs,
  router,
  state,
}: CreateWorkspaceEntryImportActionsInput) {
  const {
    fileInputRef,
    importFile,
    importName,
    importSlug,
    setError,
    setImportFile,
    setImportName,
    setImportSlug,
    setImporting,
    setQueueingImportJob,
    setWorkspaces,
    token,
  } = state;

  const resetImportForm = () => {
    setImportName("");
    setImportSlug("");
    setImportFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
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

  return {
    handleImportWorkspace,
    handleQueueImportJob,
  };
}
