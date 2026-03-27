"use client";

import type { UseWorkspaceShellActionsProps } from "./workspace-shell-actions.types";
import { createWorkspaceShellRecordDeleteActions } from "./workspace-shell-record-delete-actions";
import { createWorkspaceShellRecordSaveActions } from "./workspace-shell-record-save-actions";

export function createWorkspaceShellRecordActions(props: UseWorkspaceShellActionsProps) {
  const recordSaveActions = createWorkspaceShellRecordSaveActions(props);
  const recordDeleteActions = createWorkspaceShellRecordDeleteActions(props);

  return {
    ...recordSaveActions,
    ...recordDeleteActions,
  };
}
