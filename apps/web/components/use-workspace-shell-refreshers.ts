"use client";

import { createWorkspaceShellConversationRefreshers } from "./workspace-shell-conversation-refreshers";
import { createWorkspaceShellManagedRefreshers } from "./workspace-shell-managed-refreshers";
import { createWorkspaceShellRecordMediaRefreshers } from "./workspace-shell-record-media-refreshers";
import type { WorkspaceShellRefreshersParams } from "./workspace-shell-refreshers.types";

export function createWorkspaceShellRefreshers(props: WorkspaceShellRefreshersParams) {
  const conversationRefreshers = createWorkspaceShellConversationRefreshers(props);
  const managedRefreshers = createWorkspaceShellManagedRefreshers(props);
  const recordMediaRefreshers = createWorkspaceShellRecordMediaRefreshers(props);

  return {
    ...conversationRefreshers,
    ...managedRefreshers,
    ...recordMediaRefreshers,
  };
}
