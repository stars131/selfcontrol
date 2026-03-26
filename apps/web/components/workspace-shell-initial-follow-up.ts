"use client";

import {
  refreshAuditLogItems,
  refreshSearchPresetItems,
} from "../lib/workspace-shell-refresh";
import type { LoadWorkspaceShellInitialFollowUpInput } from "./workspace-shell-initial-follow-up.types";
import { loadWorkspaceShellManagedState } from "./workspace-shell-managed-state-load";

export async function loadWorkspaceShellInitialFollowUp({
  activeToken,
  role,
  setAuditLogs,
  setLatestSharePath,
  setMediaDeadLetterOverview,
  setSearchPresets,
  setShareLinks,
  workspaceId,
}: LoadWorkspaceShellInitialFollowUpInput) {
  await loadWorkspaceShellManagedState({
    activeToken,
    role,
    setLatestSharePath,
    setMediaDeadLetterOverview,
    setShareLinks,
    workspaceId,
  });

  await refreshSearchPresetItems(activeToken, workspaceId, setSearchPresets);
  await refreshAuditLogItems(activeToken, workspaceId, setAuditLogs);
}
