"use client";

import { createWorkspaceEntryCreateActions } from "./workspace-entry-create-actions";
import { createWorkspaceEntryImportActions } from "./workspace-entry-import-actions";
import type { CreateWorkspaceEntryWorkspaceActionsInput } from "./workspace-entry-workspace-actions.types";

export function createWorkspaceEntryWorkspaceActions({
  loadTransferJobs,
  router,
  ...state
}: CreateWorkspaceEntryWorkspaceActionsInput) {
  const createActions = createWorkspaceEntryCreateActions({ ...state, router });
  const importActions = createWorkspaceEntryImportActions({ ...state, loadTransferJobs, router });

  return {
    ...createActions,
    ...importActions,
  };
}
