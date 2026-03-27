"use client";

import {
  createReminder,
  deleteReminder,
  updateNotification,
  updateReminder,
} from "../lib/api";
import type {
  WorkspaceShellReminderCreateInput,
  WorkspaceShellReminderUpdateInput,
} from "./workspace-shell-action-inputs.types";
import type { UseWorkspaceShellActionsProps } from "./workspace-shell-actions.types";
import {
  requireManageWorkspaceToken,
  requireWritableWorkspaceToken,
} from "./workspace-shell-action-guards";

export function createWorkspaceShellReminderNotificationActions({
  canManageWorkspace,
  canWriteWorkspace,
  refreshNotifications,
  refreshReminders,
  selectedRecordId,
  syncDueNotifications,
  token,
  workspaceId,
}: UseWorkspaceShellActionsProps) {
  async function handleCreateReminder(input: WorkspaceShellReminderCreateInput) {
    const activeToken = requireManageWorkspaceToken(token, canManageWorkspace);
    await createReminder(activeToken, workspaceId, input.recordId, {
      title: input.title,
      message: input.message,
      remind_at: input.remind_at,
      channel_code: input.channel_code ?? "in_app",
      is_enabled: true,
      metadata_json: {},
    });
    await refreshReminders(activeToken, input.recordId);
  }

  async function handleUpdateReminder(
    reminderId: string,
    input: WorkspaceShellReminderUpdateInput,
  ) {
    const activeToken = requireWritableWorkspaceToken(token, canWriteWorkspace);
    await updateReminder(activeToken, workspaceId, reminderId, input);
    await refreshReminders(activeToken, selectedRecordId);
  }

  async function handleDeleteReminder(reminderId: string) {
    const activeToken = requireWritableWorkspaceToken(token, canWriteWorkspace);
    await deleteReminder(activeToken, workspaceId, reminderId);
    await refreshReminders(activeToken, selectedRecordId);
  }

  async function handleSyncNotifications() {
    const activeToken = requireManageWorkspaceToken(token, canManageWorkspace);
    await syncDueNotifications(activeToken);
  }

  async function handleMarkNotificationRead(notificationId: string) {
    const activeToken = requireManageWorkspaceToken(token, canManageWorkspace);
    await updateNotification(activeToken, workspaceId, notificationId, { is_read: true });
    await refreshNotifications(activeToken);
  }

  return {
    handleCreateReminder,
    handleUpdateReminder,
    handleDeleteReminder,
    handleSyncNotifications,
    handleMarkNotificationRead,
  };
}
