"use client";

import { createConversation, listConversations } from "../lib/api";
import { loadConversationMessagesForWorkspace } from "../lib/workspace-shell-refresh";
import { getStoredChatPanelDisplayCopy } from "./chat-panel-display-copy";
import type { LoadWorkspaceShellConversationStateInput, WorkspaceShellLoadRole } from "./workspace-shell-conversation-state-load.types";

function canManageWorkspace(role: WorkspaceShellLoadRole) {
  return role === "owner" || role === "editor";
}

export async function loadWorkspaceShellConversationState({
  activeToken,
  role,
  setActiveConversationId,
  setConversations,
  setMessages,
  workspaceId,
}: LoadWorkspaceShellConversationStateInput) {
  const conversationResult = await listConversations(activeToken, workspaceId);
  let items = conversationResult.items;
  if (!items.length && canManageWorkspace(role)) {
    const created = await createConversation(activeToken, workspaceId, getStoredChatPanelDisplayCopy().initialConversationTitle);
    items = [created.conversation];
  }

  setConversations(items);
  setActiveConversationId(items[0]?.id ?? null);
  if (items[0]) {
    await loadConversationMessagesForWorkspace(activeToken, workspaceId, items[0].id, setMessages);
  } else {
    setMessages([]);
  }
}
