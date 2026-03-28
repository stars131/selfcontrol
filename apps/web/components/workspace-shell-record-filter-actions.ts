"use client";

import type { UseWorkspaceShellActionsProps } from "./workspace-shell-actions.types";
import { createWorkspaceShellRecordFilterApplyActions } from "./workspace-shell-record-filter-apply-actions";
import { createWorkspaceShellSearchPresetActions } from "./workspace-shell-search-preset-actions";

export function createWorkspaceShellRecordFilterActions(input: UseWorkspaceShellActionsProps) {
  const filterApplyActions = createWorkspaceShellRecordFilterApplyActions(input);
  const searchPresetActions = createWorkspaceShellSearchPresetActions(input);

  return {
    ...filterApplyActions,
    ...searchPresetActions,
  };
}
