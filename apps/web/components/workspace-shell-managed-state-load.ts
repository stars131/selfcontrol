"use client";

import {
  refreshMediaDeadLetterOverviewData,
  refreshProviderConfigItems,
  refreshShareLinkItems,
} from "../lib/workspace-shell-refresh";
import type { UseWorkspaceShellEffectsProps } from "./workspace-shell-effects.types";

type WorkspaceRole = "owner" | "editor" | "viewer";

function canManageWorkspace(role: WorkspaceRole) {
  return role === "owner" || role === "editor";
}

export async function loadWorkspaceShellManagedState({
  activeToken,
  role,
  setLatestSharePath,
  setMediaDeadLetterOverview,
  setProviderConfigs,
  setShareLinks,
  workspaceId,
}: {
  activeToken: string;
  role: WorkspaceRole;
  setLatestSharePath: UseWorkspaceShellEffectsProps["setLatestSharePath"];
  setMediaDeadLetterOverview: UseWorkspaceShellEffectsProps["setMediaDeadLetterOverview"];
  setProviderConfigs: UseWorkspaceShellEffectsProps["setProviderConfigs"];
  setShareLinks: UseWorkspaceShellEffectsProps["setShareLinks"];
  workspaceId: string;
}) {
  if (canManageWorkspace(role)) {
    await refreshMediaDeadLetterOverviewData(activeToken, workspaceId, setMediaDeadLetterOverview);
    await refreshProviderConfigItems(activeToken, workspaceId, setProviderConfigs);
    if (role === "owner") {
      await refreshShareLinkItems(activeToken, workspaceId, setShareLinks);
    } else {
      setShareLinks([]);
      setLatestSharePath("");
    }
    return;
  }

  setMediaDeadLetterOverview(null);
  setProviderConfigs([]);
  setShareLinks([]);
  setLatestSharePath("");
}
