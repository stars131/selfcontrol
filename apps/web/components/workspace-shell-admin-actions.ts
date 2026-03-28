"use client";

import type { UseWorkspaceShellActionsProps } from "./workspace-shell-actions.types";
import { createWorkspaceShellKnowledgeProviderActions } from "./workspace-shell-knowledge-provider-actions";
import { createWorkspaceShellReminderNotificationActions } from "./workspace-shell-reminder-notification-actions";
import { createWorkspaceShellShareActions } from "./workspace-shell-share-actions";

export function createWorkspaceShellAdminActions(input: UseWorkspaceShellActionsProps) {
  const reminderNotificationActions = createWorkspaceShellReminderNotificationActions(input);
  const knowledgeProviderActions = createWorkspaceShellKnowledgeProviderActions(input);
  const shareActions = createWorkspaceShellShareActions(input);

  return {
    ...reminderNotificationActions,
    ...knowledgeProviderActions,
    ...shareActions,
  };
}
