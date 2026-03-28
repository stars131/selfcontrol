"use client";

import { createWorkspaceEntryJobActions } from "./workspace-entry-job-actions";
import { createWorkspaceEntryShareActions } from "./workspace-entry-share-actions";
import { createWorkspaceEntryWorkspaceActions } from "./workspace-entry-workspace-actions";
import type { CreateWorkspaceEntryControllerActionsInput } from "./workspace-entry-controller-actions.types";

export function createWorkspaceEntryControllerActions({
  router,
  setError,
  setJobsLoading,
  setTransferJobs,
  token,
  ...state
}: CreateWorkspaceEntryControllerActionsInput) {
  const stateProps = { ...state, setError, setJobsLoading, setTransferJobs, token };
  const jobActions = createWorkspaceEntryJobActions({
    setError,
    setJobsLoading,
    setTransferJobs,
    token,
  });
  const workspaceActions = createWorkspaceEntryWorkspaceActions({
    ...stateProps,
    loadTransferJobs: jobActions.loadTransferJobs,
    router,
  });
  const shareActions = createWorkspaceEntryShareActions({ ...stateProps, router });

  return {
    ...jobActions,
    ...workspaceActions,
    ...shareActions,
  };
}
