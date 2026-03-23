"use client";

import type { ComponentProps } from "react";

import { ChatPanel } from "./chat-panel";
import { RecordPanelV2 } from "./record-panel-v2";
import type { WorkspaceShellPanelsProps } from "./workspace-shell-panels.types";

type ChatPanelProps = ComponentProps<typeof ChatPanel>;
type RecordPanelProps = ComponentProps<typeof RecordPanelV2>;

export function buildChatPanelProps(props: WorkspaceShellPanelsProps): ChatPanelProps {
  return {
    activeConversationId: props.activeConversationId,
    auditLogs: props.auditLogs,
    canManageSharing: props.canManageSharing,
    canManageWorkspace: props.canManageWorkspace,
    canWriteWorkspace: props.canWriteWorkspace,
    conversations: props.conversations,
    knowledgeStats: props.knowledgeStats,
    latestSharePath: props.latestSharePath,
    messages: props.messages,
    notifications: props.notifications,
    onCreateConversation: props.onCreateConversation,
    onCreateShareLink: props.onCreateShareLink,
    onDisableShareLink: props.onDisableShareLink,
    onMarkNotificationRead: props.onMarkNotificationRead,
    onRefreshAuditLogs: props.onRefreshAuditLogs,
    onReindexKnowledge: props.onReindexKnowledge,
    onSaveProviderConfig: props.onSaveProviderConfig,
    onSelectConversation: props.onSelectConversation,
    onSendMessage: props.onSendMessage,
    onSyncNotifications: props.onSyncNotifications,
    providerConfigs: props.providerConfigs,
    shareLinks: props.shareLinks,
    workspaceId: props.workspaceId,
    workspaceRole: props.workspaceRole,
  };
}

export function buildRecordPanelProps(props: WorkspaceShellPanelsProps): RecordPanelProps {
  return {
    authToken: props.authToken,
    canWriteWorkspace: props.canWriteWorkspace,
    filteringRecords: props.filteringRecords,
    mediaAssets: props.mediaAssets,
    mediaDeadLetterOverview: props.mediaDeadLetterOverview,
    mediaProcessingOverview: props.mediaProcessingOverview,
    mediaStorageSummary: props.mediaStorageSummary,
    onApplyLocationFilter: props.onApplyLocationFilter,
    onApplyRecordFilter: props.onApplyRecordFilter,
    onBulkRetryMediaDeadLetter: props.onBulkRetryMediaDeadLetter,
    onCreateReminder: props.onCreateReminder,
    onCreateSearchPreset: props.onCreateSearchPreset,
    onDeleteMedia: props.onDeleteMedia,
    onDeleteRecord: props.onDeleteRecord,
    onDeleteReminder: props.onDeleteReminder,
    onDeleteSearchPreset: props.onDeleteSearchPreset,
    onRefreshMediaStatus: props.onRefreshMediaStatus,
    onResetFilter: props.onResetFilter,
    onRetryMedia: props.onRetryMedia,
    onSaveRecord: props.onSaveRecord,
    onSelectRecord: props.onSelectRecord,
    onUpdateReminder: props.onUpdateReminder,
    onUploadMedia: props.onUploadMedia,
    recordFilter: props.recordFilter,
    records: props.records,
    reminders: props.reminders,
    savingSearchPreset: props.savingSearchPreset,
    searchPresets: props.searchPresets,
    selectedRecordId: props.selectedRecordId,
    timelineDays: props.timelineDays,
    workspaceId: props.workspaceId,
  };
}
