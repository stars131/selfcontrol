"use client";

import {
  refreshMediaDeadLetterOverviewData,
  refreshShareLinkItems,
} from "../lib/workspace-shell-refresh";
import type { LoadWorkspaceShellManagedStateInput } from "./workspace-shell-managed-state-load.types";
import type { WorkspaceShellLoadRole } from "./workspace-shell-conversation-state-load.types";

function canManageWorkspace(role: WorkspaceShellLoadRole) {
  return role === "owner" || role === "editor";
}

export async function loadWorkspaceShellManagedState({
  activeToken,
  role,
  setLatestSharePath,
  setMediaDeadLetterOverview,
  setShareLinks,
  workspaceId,
}: LoadWorkspaceShellManagedStateInput) {
  if (canManageWorkspace(role)) {
    await refreshMediaDeadLetterOverviewData(activeToken, workspaceId, setMediaDeadLetterOverview);
    if (role === "owner") {
      await refreshShareLinkItems(activeToken, workspaceId, setShareLinks);
    } else {
      setShareLinks([]);
      setLatestSharePath("");
    }
    return;
  }

  setMediaDeadLetterOverview(null);
  setShareLinks([]);
  setLatestSharePath("");
}
