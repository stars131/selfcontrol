"use client";

import type { BuildWorkspaceShellRefreshersInput } from "./workspace-shell-client-refreshers-input.types";

export function buildWorkspaceShellRefreshersInput({
  setAuditLogs,
  setKnowledgeStats,
  setMediaAssets,
  setMediaDeadLetterOverview,
  setMediaProcessingOverview,
  setMediaStorageSummary,
  setMessages,
  setNotifications,
  setRecords,
  setReminders,
  setSearchPresets,
  setSelectedRecordId,
  setShareLinks,
  setTimelineDays,
  setVisibleRecords,
  workspaceId,
}: BuildWorkspaceShellRefreshersInput) {
  return {
    workspaceId,
    setAuditLogs,
    setKnowledgeStats,
    setMediaAssets,
    setMediaDeadLetterOverview,
    setMediaProcessingOverview,
    setMediaStorageSummary,
    setMessages,
    setNotifications,
    setRecords,
    setReminders,
    setSearchPresets,
    setSelectedRecordId,
    setShareLinks,
    setTimelineDays,
    setVisibleRecords,
  };
}
