"use client";

import type { Conversation } from "../lib/types";
import { getStoredChatPanelDisplayCopy } from "./chat-panel-display-copy";
import type { UseWorkspaceShellActionsProps } from "./workspace-shell-actions.types";

type WorkspaceShellConversationCreationSetters = Pick<
  UseWorkspaceShellActionsProps,
  "setActiveConversationId" | "setConversations" | "setMessages"
>;

export function buildWorkspaceShellConversationTitle(conversationsCount: number) {
  return getStoredChatPanelDisplayCopy().buildConversationTitle(conversationsCount + 1);
}

export function applyWorkspaceShellConversationCreation(
  setters: WorkspaceShellConversationCreationSetters,
  conversation: Conversation,
) {
  setters.setConversations((prev) => [conversation, ...prev]);
  setters.setActiveConversationId(conversation.id);
  setters.setMessages([]);
}
