"use client";

import { createWorkspaceEntryJobActions } from "./workspace-entry-job-actions";
import { createWorkspaceEntryShareActions } from "./workspace-entry-share-actions";
import type { RouterLike, WorkspaceEntryControllerState } from "./workspace-entry-controller.types";
import { createWorkspaceEntryWorkspaceActions } from "./workspace-entry-workspace-actions";

export function createWorkspaceEntryControllerActions({
  router,
  state,
}: {
  router: RouterLike;
  state: WorkspaceEntryControllerState;
}) {
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
  const shareActions = createWorkspaceEntryShareActions({ router, state });

  return {
    ...jobActions,
    ...workspaceActions,
    ...shareActions,
  };
}
