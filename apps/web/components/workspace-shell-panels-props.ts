"use client";
import { ChatPanel } from "./chat-panel";
import { RecordPanelV2 } from "./record-panel-v2";
import type { ChatPanelProps } from "./chat-panel.types";
import type { RecordPanelV2Props } from "./record-panel-v2.types";
import type { WorkspaceShellPanelsProps } from "./workspace-shell-panels.types";

export function buildChatPanelProps(input: WorkspaceShellPanelsProps): ChatPanelProps {
  return {
    activeConversationId: input.activeConversationId,
    auditLogs: input.auditLogs,
    canManageSharing: input.canManageSharing,
    canManageWorkspace: input.canManageWorkspace,
    canWriteWorkspace: input.canWriteWorkspace,
    conversations: input.conversations,
    knowledgeStats: input.knowledgeStats,
    latestSharePath: input.latestSharePath,
    messages: input.messages,
    notifications: input.notifications,
    onCreateConversation: input.onCreateConversation,
    onCreateShareLink: input.onCreateShareLink,
    onDisableShareLink: input.onDisableShareLink,
    onMarkNotificationRead: input.onMarkNotificationRead,
    onRefreshAuditLogs: input.onRefreshAuditLogs,
    onReindexKnowledge: input.onReindexKnowledge,
    onSelectConversation: input.onSelectConversation,
    onSendMessage: input.onSendMessage,
    onSyncNotifications: input.onSyncNotifications,
    shareLinks: input.shareLinks,
    workspaceId: input.workspaceId,
    workspaceRole: input.workspaceRole,
  };
}

export function buildRecordPanelProps(input: WorkspaceShellPanelsProps): RecordPanelV2Props {
  return {
    authToken: input.authToken,
    canWriteWorkspace: input.canWriteWorkspace,
    filteringRecords: input.filteringRecords,
    mediaAssets: input.mediaAssets,
    mediaDeadLetterOverview: input.mediaDeadLetterOverview,
    mediaProcessingOverview: input.mediaProcessingOverview,
    mediaStorageSummary: input.mediaStorageSummary,
    onApplyLocationFilter: input.onApplyLocationFilter,
    onApplyRecordFilter: input.onApplyRecordFilter,
    onBulkRetryMediaDeadLetter: input.onBulkRetryMediaDeadLetter,
    onCreateReminder: input.onCreateReminder,
    onCreateSearchPreset: input.onCreateSearchPreset,
    onDeleteMedia: input.onDeleteMedia,
    onDeleteRecord: input.onDeleteRecord,
    onDeleteReminder: input.onDeleteReminder,
    onDeleteSearchPreset: input.onDeleteSearchPreset,
    onRefreshMediaStatus: input.onRefreshMediaStatus,
    onResetFilter: input.onResetFilter,
    onRetryMedia: input.onRetryMedia,
    onSaveRecord: input.onSaveRecord,
    onSelectRecord: input.onSelectRecord,
    onUpdateReminder: input.onUpdateReminder,
    onUploadMedia: input.onUploadMedia,
    recordFilter: input.recordFilter,
    records: input.records,
    reminders: input.reminders,
    savingSearchPreset: input.savingSearchPreset,
    searchPresets: input.searchPresets,
    selectedRecordId: input.selectedRecordId,
    timelineDays: input.timelineDays,
    workspaceId: input.workspaceId,
  };
}
