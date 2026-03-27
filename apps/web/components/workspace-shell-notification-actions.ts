"use client";

import { updateNotification } from "../lib/api";
import type { UseWorkspaceShellActionsProps } from "./workspace-shell-actions.types";
import { requireManageWorkspaceToken } from "./workspace-shell-action-guards";

export function createWorkspaceShellNotificationActions({
  canManageWorkspace,
  refreshNotifications,
  syncDueNotifications,
  token,
  workspaceId,
}: UseWorkspaceShellActionsProps) {
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
    handleSyncNotifications,
    handleMarkNotificationRead,
  };
}
