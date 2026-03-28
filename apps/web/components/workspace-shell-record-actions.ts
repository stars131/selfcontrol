"use client";

import type { UseWorkspaceShellActionsProps } from "./workspace-shell-actions.types";
import { createWorkspaceShellRecordDeleteActions } from "./workspace-shell-record-delete-actions";
import { createWorkspaceShellRecordSaveActions } from "./workspace-shell-record-save-actions";

export function createWorkspaceShellRecordActions(input: UseWorkspaceShellActionsProps) {
  const recordSaveActions = createWorkspaceShellRecordSaveActions(input);
  const recordDeleteActions = createWorkspaceShellRecordDeleteActions(input);

  return {
    ...recordSaveActions,
    ...recordDeleteActions,
  };
}
