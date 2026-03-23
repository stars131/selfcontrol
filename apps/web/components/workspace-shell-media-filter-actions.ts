"use client";

import type { UseWorkspaceShellActionsProps } from "./workspace-shell-actions.types";
import { createWorkspaceShellMediaActions } from "./workspace-shell-media-actions";
import { createWorkspaceShellRecordFilterActions } from "./workspace-shell-record-filter-actions";

export function createWorkspaceShellMediaFilterActions(props: UseWorkspaceShellActionsProps) {
  const mediaActions = createWorkspaceShellMediaActions(props);
  const recordFilterActions = createWorkspaceShellRecordFilterActions(props);

  return {
    ...mediaActions,
    ...recordFilterActions,
  };
}
