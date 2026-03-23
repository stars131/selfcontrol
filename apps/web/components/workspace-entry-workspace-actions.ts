"use client";

import type { FormEvent } from "react";

import {
  createWorkspace,
  createWorkspaceImportJob,
  importWorkspaceArchive,
  listWorkspaces,
} from "../lib/api";
import {
  getWorkspaceEntryActionErrorMessage,
  slugifyWorkspaceName,
} from "./workspace-entry-controller-helpers";
import type {
  RouterLike,
  WorkspaceEntryControllerState,
} from "./workspace-entry-controller.types";

export function createWorkspaceEntryWorkspaceActions({
  loadTransferJobs,
  router,
  state,
}: {
  loadTransferJobs: (activeToken: string) => Promise<void>;
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
    setQueueingImportJob,
    setWorkspaces,
    setName,
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

  const handleCreate = async (
    event: FormEvent<HTMLFormElement>,
    suggestedSlug: string,
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

  return {
    handleCreate,
    handleImportWorkspace,
    handleQueueImportJob,
  };
}
