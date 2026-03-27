"use client";

import type { UseWorkspaceShellActionsProps } from "./workspace-shell-actions.types";
import { createWorkspaceShellRecordFilterApplyActions } from "./workspace-shell-record-filter-apply-actions";
import { createWorkspaceShellSearchPresetActions } from "./workspace-shell-search-preset-actions";

export function createWorkspaceShellRecordFilterActions(props: UseWorkspaceShellActionsProps) {
  const filterApplyActions = createWorkspaceShellRecordFilterApplyActions(props);
  const searchPresetActions = createWorkspaceShellSearchPresetActions(props);

  return {
    ...filterApplyActions,
    ...searchPresetActions,
  };
}
