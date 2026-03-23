"use client";

import { createWorkspaceShellAdminActions } from "./workspace-shell-admin-actions";
import type { UseWorkspaceShellActionsProps } from "./workspace-shell-actions.types";
import { createWorkspaceShellChatRecordActions } from "./workspace-shell-chat-record-actions";
import { createWorkspaceShellMediaFilterActions } from "./workspace-shell-media-filter-actions";

export function useWorkspaceShellActions(props: UseWorkspaceShellActionsProps) {
  const chatRecordActions = createWorkspaceShellChatRecordActions(props);
  const mediaFilterActions = createWorkspaceShellMediaFilterActions(props);
  const adminActions = createWorkspaceShellAdminActions(props);

  return {
    ...chatRecordActions,
    ...mediaFilterActions,
    ...adminActions,
  };
}
