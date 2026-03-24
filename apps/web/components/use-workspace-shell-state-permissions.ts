"use client";

import type { Workspace } from "../lib/types";

export function useWorkspaceShellStatePermissions(workspace: Workspace | null) {
  const canWriteWorkspace = workspace?.role === "owner" || workspace?.role === "editor";
  const canManageWorkspace = canWriteWorkspace;
  const canManageSharing = workspace?.role === "owner";

  return {
    canWriteWorkspace,
    canManageWorkspace,
    canManageSharing,
  };
}
