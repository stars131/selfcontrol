"use client";

import type { UseWorkspaceShellActionsProps } from "./workspace-shell-actions.types";
import { createWorkspaceShellChatConversationActions } from "./workspace-shell-chat-conversation-actions";
import { createWorkspaceShellChatSendActions } from "./workspace-shell-chat-send-actions";

export function createWorkspaceShellChatActions(input: UseWorkspaceShellActionsProps) {
  const chatSendActions = createWorkspaceShellChatSendActions(input);
  const chatConversationActions = createWorkspaceShellChatConversationActions(input);

  return {
    ...chatSendActions,
    ...chatConversationActions,
  };
}
