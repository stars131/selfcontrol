"use client";

import {
  refreshAuditLogItems,
  refreshKnowledgeStatsData,
  refreshMediaDeadLetterOverviewData,
  refreshMediaProcessingOverviewData,
  refreshMediaStorageSummaryData,
  refreshNotificationItems,
  refreshProviderConfigItems,
  refreshReminderItems,
  refreshSearchPresetItems,
  refreshShareLinkItems,
  syncDueNotificationsAndRefresh,
} from "../lib/workspace-shell-refresh";
import type { WorkspaceShellRefreshersParams } from "./workspace-shell-refreshers.types";

export function createWorkspaceShellManagedRefreshers({
  setAuditLogs,
  setKnowledgeStats,
  setMediaDeadLetterOverview,
  setMediaProcessingOverview,
  setMediaStorageSummary,
  setNotifications,
  setProviderConfigs,
  setReminders,
  setSearchPresets,
  setShareLinks,
  workspaceId,
}: WorkspaceShellRefreshersParams) {
  return {
    refreshAuditLogs: async (activeToken: string) =>
      refreshAuditLogItems(activeToken, workspaceId, setAuditLogs),
    refreshKnowledge: async (activeToken: string) =>
      refreshKnowledgeStatsData(activeToken, workspaceId, setKnowledgeStats),
    refreshMediaDeadLetterOverview: async (activeToken: string) =>
      refreshMediaDeadLetterOverviewData(activeToken, workspaceId, setMediaDeadLetterOverview),
    refreshMediaProcessingOverview: async (activeToken: string) =>
      refreshMediaProcessingOverviewData(activeToken, workspaceId, setMediaProcessingOverview),
    refreshMediaStorageSummary: async (activeToken: string) =>
      refreshMediaStorageSummaryData(activeToken, workspaceId, setMediaStorageSummary),
    refreshNotifications: async (activeToken: string) =>
      refreshNotificationItems(activeToken, workspaceId, setNotifications),
    refreshProviderConfigs: async (activeToken: string) =>
      refreshProviderConfigItems(activeToken, workspaceId, setProviderConfigs),
    refreshReminders: async (activeToken: string, recordId: string | null) =>
      refreshReminderItems(activeToken, workspaceId, recordId, setReminders),
    refreshSearchPresets: async (activeToken: string) =>
      refreshSearchPresetItems(activeToken, workspaceId, setSearchPresets),
    refreshShareLinks: async (activeToken: string) =>
      refreshShareLinkItems(activeToken, workspaceId, setShareLinks),
    syncDueNotifications: async (activeToken: string) =>
      syncDueNotificationsAndRefresh(activeToken, workspaceId, setNotifications),
  };
}
