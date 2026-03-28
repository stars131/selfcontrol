"use client";

import { createWorkspaceShellAdminActions } from "./workspace-shell-admin-actions";
import type { UseWorkspaceShellActionsProps } from "./workspace-shell-actions.types";
import { createWorkspaceShellChatRecordActions } from "./workspace-shell-chat-record-actions";
import { createWorkspaceShellMediaFilterActions } from "./workspace-shell-media-filter-actions";

export function useWorkspaceShellActions(input: UseWorkspaceShellActionsProps) {
  const chatRecordActions = createWorkspaceShellChatRecordActions(input);
  const mediaFilterActions = createWorkspaceShellMediaFilterActions(input);
  const adminActions = createWorkspaceShellAdminActions(input);

  return {
    ...chatRecordActions,
    ...mediaFilterActions,
    ...adminActions,
  };
}
