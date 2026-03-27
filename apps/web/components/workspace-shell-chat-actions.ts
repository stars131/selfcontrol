"use client";

import type { UseWorkspaceShellActionsProps } from "./workspace-shell-actions.types";
import { createWorkspaceShellChatConversationActions } from "./workspace-shell-chat-conversation-actions";
import { createWorkspaceShellChatSendActions } from "./workspace-shell-chat-send-actions";

export function createWorkspaceShellChatActions(props: UseWorkspaceShellActionsProps) {
  const chatSendActions = createWorkspaceShellChatSendActions(props);
  const chatConversationActions = createWorkspaceShellChatConversationActions(props);

  return {
    ...chatSendActions,
    ...chatConversationActions,
  };
}
