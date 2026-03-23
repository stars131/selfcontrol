"use client";

import type { RouterLike, WorkspaceEntryControllerState } from "./workspace-entry-controller.types";
import { createWorkspaceEntryCreateActions } from "./workspace-entry-create-actions";
import { createWorkspaceEntryImportActions } from "./workspace-entry-import-actions";

export function createWorkspaceEntryWorkspaceActions({
  loadTransferJobs,
  router,
  state,
}: {
  loadTransferJobs: (activeToken: string) => Promise<void>;
  router: RouterLike;
  state: WorkspaceEntryControllerState;
}) {
  const createActions = createWorkspaceEntryCreateActions({ router, state });
  const importActions = createWorkspaceEntryImportActions({ loadTransferJobs, router, state });

  return {
    ...createActions,
    ...importActions,
  };
}
