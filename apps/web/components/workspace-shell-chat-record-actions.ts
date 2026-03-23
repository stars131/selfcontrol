"use client";

import type { UseWorkspaceShellActionsProps } from "./workspace-shell-actions.types";
import { createWorkspaceShellChatActions } from "./workspace-shell-chat-actions";
import { createWorkspaceShellRecordActions } from "./workspace-shell-record-actions";

export function createWorkspaceShellChatRecordActions(props: UseWorkspaceShellActionsProps) {
  const chatActions = createWorkspaceShellChatActions(props);
  const recordActions = createWorkspaceShellRecordActions(props);

  return {
    ...chatActions,
    ...recordActions,
  };
}
