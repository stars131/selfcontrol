"use client";

import {
  refreshAuditLogItems,
  refreshSearchPresetItems,
} from "../lib/workspace-shell-refresh";
import type { UseWorkspaceShellEffectsProps } from "./workspace-shell-effects.types";
import { loadWorkspaceShellManagedState } from "./workspace-shell-managed-state-load";

type WorkspaceRole = "owner" | "editor" | "viewer";

export async function loadWorkspaceShellInitialFollowUp({
  activeToken,
  role,
  setAuditLogs,
  setLatestSharePath,
  setMediaDeadLetterOverview,
  setProviderConfigs,
  setSearchPresets,
  setShareLinks,
  workspaceId,
}: {
  activeToken: string;
  role: WorkspaceRole;
  setAuditLogs: UseWorkspaceShellEffectsProps["setAuditLogs"];
  setLatestSharePath: UseWorkspaceShellEffectsProps["setLatestSharePath"];
  setMediaDeadLetterOverview: UseWorkspaceShellEffectsProps["setMediaDeadLetterOverview"];
  setProviderConfigs: UseWorkspaceShellEffectsProps["setProviderConfigs"];
  setSearchPresets: UseWorkspaceShellEffectsProps["setSearchPresets"];
  setShareLinks: UseWorkspaceShellEffectsProps["setShareLinks"];
  workspaceId: string;
}) {
  await loadWorkspaceShellManagedState({
    activeToken,
    role,
    setLatestSharePath,
    setMediaDeadLetterOverview,
    setProviderConfigs,
    setShareLinks,
    workspaceId,
  });

  await refreshSearchPresetItems(activeToken, workspaceId, setSearchPresets);
  await refreshAuditLogItems(activeToken, workspaceId, setAuditLogs);
}
