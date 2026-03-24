"use client";

import { useWorkspaceShellStatePermissions } from "./use-workspace-shell-state-permissions";
import { useWorkspaceShellStateValues } from "./use-workspace-shell-state-values";

export function useWorkspaceShellState() {
  const state = useWorkspaceShellStateValues();
  const permissions = useWorkspaceShellStatePermissions(state.workspace);

  return {
    ...state,
    ...permissions,
  };
}
