"use client";

import type { UseWorkspaceShellActionsProps } from "./workspace-shell-actions.types";
import { createWorkspaceShellKnowledgeProviderActions } from "./workspace-shell-knowledge-provider-actions";
import { createWorkspaceShellReminderNotificationActions } from "./workspace-shell-reminder-notification-actions";
import { createWorkspaceShellShareActions } from "./workspace-shell-share-actions";

export function createWorkspaceShellAdminActions(props: UseWorkspaceShellActionsProps) {
  const reminderNotificationActions = createWorkspaceShellReminderNotificationActions(props);
  const knowledgeProviderActions = createWorkspaceShellKnowledgeProviderActions(props);
  const shareActions = createWorkspaceShellShareActions(props);

  return {
    ...reminderNotificationActions,
    ...knowledgeProviderActions,
    ...shareActions,
  };
}
