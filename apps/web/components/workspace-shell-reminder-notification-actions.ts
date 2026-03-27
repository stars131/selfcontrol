"use client";

import type { UseWorkspaceShellActionsProps } from "./workspace-shell-actions.types";
import { createWorkspaceShellNotificationActions } from "./workspace-shell-notification-actions";
import { createWorkspaceShellReminderActions } from "./workspace-shell-reminder-actions";

export function createWorkspaceShellReminderNotificationActions(
  props: UseWorkspaceShellActionsProps,
) {
  const reminderActions = createWorkspaceShellReminderActions(props);
  const notificationActions = createWorkspaceShellNotificationActions(props);

  return {
    ...reminderActions,
    ...notificationActions,
  };
}
