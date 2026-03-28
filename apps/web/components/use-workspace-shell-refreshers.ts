"use client";

import { createWorkspaceShellConversationRefreshers } from "./workspace-shell-conversation-refreshers";
import { createWorkspaceShellManagedRefreshers } from "./workspace-shell-managed-refreshers";
import { createWorkspaceShellRecordMediaRefreshers } from "./workspace-shell-record-media-refreshers";
import type { WorkspaceShellRefreshersParams } from "./workspace-shell-refreshers.types";

export function createWorkspaceShellRefreshers(input: WorkspaceShellRefreshersParams) {
  const conversationRefreshers = createWorkspaceShellConversationRefreshers(input);
  const managedRefreshers = createWorkspaceShellManagedRefreshers(input);
  const recordMediaRefreshers = createWorkspaceShellRecordMediaRefreshers(input);

  return {
    ...conversationRefreshers,
    ...managedRefreshers,
    ...recordMediaRefreshers,
  };
}
