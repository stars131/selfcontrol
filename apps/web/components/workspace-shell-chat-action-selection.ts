"use client";

import type { UseWorkspaceShellActionsProps } from "./workspace-shell-actions.types";
type WorkspaceShellConversationSelectionHelpers = Pick<UseWorkspaceShellActionsProps, "loadConversationMessages" | "setActiveConversationId">;

export function selectWorkspaceShellConversation(
  helpers: WorkspaceShellConversationSelectionHelpers,
  token: string | null,
  conversationId: string,
) {
  if (!token) {
    return;
  }
  helpers.setActiveConversationId(conversationId);
  void helpers.loadConversationMessages(token, conversationId);
}
