"use client";

import type { UseWorkspaceShellActionsProps } from "./workspace-shell-actions.types";
import { createWorkspaceShellMediaActions } from "./workspace-shell-media-actions";
import { createWorkspaceShellRecordFilterActions } from "./workspace-shell-record-filter-actions";

export function createWorkspaceShellMediaFilterActions(input: UseWorkspaceShellActionsProps) {
  const mediaActions = createWorkspaceShellMediaActions(input);
  const recordFilterActions = createWorkspaceShellRecordFilterActions(input);

  return {
    ...mediaActions,
    ...recordFilterActions,
  };
}
