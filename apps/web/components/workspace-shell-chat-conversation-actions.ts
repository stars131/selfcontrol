"use client";

import { createConversation } from "../lib/api";
import type { UseWorkspaceShellActionsProps } from "./workspace-shell-actions.types";
import { requireWritableWorkspaceToken } from "./workspace-shell-action-guards";
import { applyWorkspaceShellConversationCreation, buildWorkspaceShellConversationTitle } from "./workspace-shell-chat-action-conversations";
import { selectWorkspaceShellConversation } from "./workspace-shell-chat-action-selection";

export function createWorkspaceShellChatConversationActions({
  canWriteWorkspace,
  conversationsCount,
  loadConversationMessages,
  setActiveConversationId,
  setConversations,
  setMessages,
  token,
  workspaceId,
}: UseWorkspaceShellActionsProps) {
  async function handleCreateConversation() {
    const activeToken = requireWritableWorkspaceToken(token, canWriteWorkspace);
    const result = await createConversation(activeToken, workspaceId, buildWorkspaceShellConversationTitle(conversationsCount));
    applyWorkspaceShellConversationCreation({ setConversations, setActiveConversationId, setMessages }, result.conversation);
  }

  function handleSelectConversation(conversationId: string) {
    selectWorkspaceShellConversation({ setActiveConversationId, loadConversationMessages }, token, conversationId);
  }

  return { handleCreateConversation, handleSelectConversation };
}
