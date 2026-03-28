"use client";

import type { UseWorkspaceShellActionsProps } from "./workspace-shell-actions.types";
import { createWorkspaceShellChatActions } from "./workspace-shell-chat-actions";
import { createWorkspaceShellRecordActions } from "./workspace-shell-record-actions";

export function createWorkspaceShellChatRecordActions(input: UseWorkspaceShellActionsProps) {
  const chatActions = createWorkspaceShellChatActions(input);
  const recordActions = createWorkspaceShellRecordActions(input);

  return {
    ...chatActions,
    ...recordActions,
  };
}
