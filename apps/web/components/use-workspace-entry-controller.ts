"use client";

import type { FormEvent } from "react";

import { createWorkspaceEntryControllerActions } from "./workspace-entry-controller-actions";
import type { RouterLike } from "./workspace-entry-controller.types";
import { useWorkspaceEntryLoad } from "./use-workspace-entry-load";
import { useWorkspaceEntryControllerDerivedData } from "./use-workspace-entry-controller-derived-data";
import { useWorkspaceEntryControllerState } from "./use-workspace-entry-controller-state";

export function useWorkspaceEntryController(router: RouterLike) {
  const state = useWorkspaceEntryControllerState();
  const { normalizedShareToken, suggestedSlug } = useWorkspaceEntryControllerDerivedData({
    name: state.name,
    shareTokenInput: state.shareTokenInput,
  });
  const actions = createWorkspaceEntryControllerActions({ router, state });
  useWorkspaceEntryLoad({
    loadTransferJobs: actions.loadTransferJobs,
    router,
    setError: state.setError,
    setLoading: state.setLoading,
    setToken: state.setToken,
    setUser: state.setUser,
    setWorkspaces: state.setWorkspaces,
  });

  return {
    ...state,
    suggestedSlug,
    normalizedShareToken,
    handleCreate: (event: FormEvent<HTMLFormElement>) =>
      actions.handleCreate(event, suggestedSlug),
    handleImportWorkspace: actions.handleImportWorkspace,
    handleQueueImportJob: actions.handleQueueImportJob,
    handlePreviewShare: () => actions.handlePreviewShare(state.shareTokenInput),
    handleAcceptShare: () => actions.handleAcceptShare(state.shareTokenInput),
    handleLogout: actions.handleLogout,
    handleDownloadTransferJob: actions.handleDownloadTransferJob,
    loadTransferJobs: actions.loadTransferJobs,
  };
}
