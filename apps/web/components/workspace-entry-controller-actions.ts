"use client";

import { createWorkspaceEntryJobActions } from "./workspace-entry-job-actions";
import { createWorkspaceEntryShareActions } from "./workspace-entry-share-actions";
import { createWorkspaceEntryWorkspaceActions } from "./workspace-entry-workspace-actions";
import type { CreateWorkspaceEntryControllerActionsInput } from "./workspace-entry-controller-actions.types";

export function createWorkspaceEntryControllerActions({
  router,
  state,
}: CreateWorkspaceEntryControllerActionsInput) {
  const jobActions = createWorkspaceEntryJobActions({
    setError: state.setError,
    setJobsLoading: state.setJobsLoading,
    setTransferJobs: state.setTransferJobs,
    token: state.token,
  });
  const workspaceActions = createWorkspaceEntryWorkspaceActions({
    loadTransferJobs: jobActions.loadTransferJobs,
    router,
    state,
  });
  const shareActions = createWorkspaceEntryShareActions({ ...state, router });

  return {
    ...jobActions,
    ...workspaceActions,
    ...shareActions,
  };
}
