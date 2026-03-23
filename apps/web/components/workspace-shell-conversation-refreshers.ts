"use client";

import { loadConversationMessagesForWorkspace } from "../lib/workspace-shell-refresh";
import type { WorkspaceShellRefreshersParams } from "./workspace-shell-refreshers.types";

export function createWorkspaceShellConversationRefreshers({
  setMessages,
  workspaceId,
}: WorkspaceShellRefreshersParams) {
  return {
    loadConversationMessages: async (activeToken: string, conversationId: string) =>
      loadConversationMessagesForWorkspace(activeToken, workspaceId, conversationId, setMessages),
  };
}
