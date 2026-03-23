"use client";

import {
  createReminder,
  createShareLink,
  deleteReminder,
  reindexKnowledge,
  updateNotification,
  updateProviderConfig,
  updateReminder,
  updateShareLink,
} from "../lib/api";
import type {
  UseWorkspaceShellActionsProps,
  WorkspaceShellProviderConfigInput,
  WorkspaceShellReminderCreateInput,
  WorkspaceShellReminderUpdateInput,
  WorkspaceShellShareLinkInput,
} from "./workspace-shell-actions.types";
import {
  requireManageWorkspaceToken,
  requireShareManagerToken,
  requireWorkspaceToken,
  requireWritableWorkspaceToken,
} from "./workspace-shell-action-guards";

export function createWorkspaceShellAdminActions(props: UseWorkspaceShellActionsProps) {
  const {
    token,
    workspaceId,
    canManageSharing,
    canManageWorkspace,
    canWriteWorkspace,
    selectedRecordId,
    refreshAuditLogs,
    refreshKnowledge,
    refreshNotifications,
    refreshReminders,
    refreshShareLinks,
    setKnowledgeStats,
    setLatestSharePath,
    setProviderConfigs,
    syncDueNotifications,
  } = props;

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

  async function handleReindexKnowledge() {
    const activeToken = requireManageWorkspaceToken(token, canManageWorkspace);
    const result = await reindexKnowledge(activeToken, workspaceId);
    setKnowledgeStats(result.stats);
    await refreshAuditLogs(activeToken);
  }

  async function handleSaveProviderConfig(
    featureCode: string,
    input: WorkspaceShellProviderConfigInput,
  ) {
    const activeToken = requireWorkspaceToken(token);
    const result = await updateProviderConfig(activeToken, workspaceId, featureCode, input);
    setProviderConfigs((current) =>
      current.map((item) => (item.feature_code === featureCode ? result.config : item)),
    );
    await refreshKnowledge(activeToken);
    await refreshAuditLogs(activeToken);
  }

  async function handleCreateShareLink(input: WorkspaceShellShareLinkInput) {
    const activeToken = requireShareManagerToken(token, canManageSharing);
    const result = await createShareLink(activeToken, workspaceId, {
      name: input.name,
      permission_code: input.permission_code,
      max_uses: input.max_uses ?? null,
      expires_at: null,
    });
    setLatestSharePath(result.share_path);
    await refreshShareLinks(activeToken);
    await refreshAuditLogs(activeToken);
  }

  async function handleDisableShareLink(shareLinkId: string) {
    const activeToken = requireShareManagerToken(token, canManageSharing);
    await updateShareLink(activeToken, workspaceId, shareLinkId, { is_enabled: false });
    await refreshShareLinks(activeToken);
    await refreshAuditLogs(activeToken);
  }

  async function handleRefreshAuditLogs() {
    const activeToken = requireWorkspaceToken(token);
    await refreshAuditLogs(activeToken);
  }

  return {
    handleCreateReminder,
    handleUpdateReminder,
    handleDeleteReminder,
    handleSyncNotifications,
    handleMarkNotificationRead,
    handleReindexKnowledge,
    handleSaveProviderConfig,
    handleCreateShareLink,
    handleDisableShareLink,
    handleRefreshAuditLogs,
  };
}
