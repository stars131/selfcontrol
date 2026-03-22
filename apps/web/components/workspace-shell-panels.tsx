"use client";

import type {
  AuditLogItem,
  ChatMessage,
  Conversation,
  KnowledgeStats,
  MediaAsset,
  MediaDeadLetterOverview,
  MediaProcessingOverview,
  MediaStorageSummary,
  NotificationItem,
  ProviderFeatureConfig,
  RecordFilterState,
  RecordItem,
  ReminderItem,
  SearchPresetItem,
  ShareLinkItem,
  TimelineDay,
} from "../lib/types";
import type { RecordPanelV2Props, ReminderUpdateInput, SaveRecordInput } from "./record-panel-v2.types";
import { ChatPanel } from "./chat-panel";
import { RecordPanelV2 } from "./record-panel-v2";

export function WorkspaceShellPanels({
  activeConversationId,
  auditLogs,
  authToken,
  canManageSharing,
  canManageWorkspace,
  canWriteWorkspace,
  conversations,
  filteringRecords,
  knowledgeStats,
  latestSharePath,
  mediaAssets,
  mediaDeadLetterOverview,
  mediaProcessingOverview,
  mediaStorageSummary,
  messages,
  notifications,
  onApplyLocationFilter,
  onApplyRecordFilter,
  onBulkRetryMediaDeadLetter,
  onCreateConversation,
  onCreateReminder,
  onCreateSearchPreset,
  onCreateShareLink,
  onDeleteMedia,
  onDeleteRecord,
  onDeleteReminder,
  onDeleteSearchPreset,
  onDisableShareLink,
  onMarkNotificationRead,
  onRefreshAuditLogs,
  onRefreshMediaStatus,
  onReindexKnowledge,
  onResetFilter,
  onRetryMedia,
  onSaveProviderConfig,
  onSaveRecord,
  onSelectConversation,
  onSelectRecord,
  onSendMessage,
  onSyncNotifications,
  onUpdateReminder,
  onUploadMedia,
  providerConfigs,
  recordFilter,
  records,
  reminders,
  savingSearchPreset,
  searchPresets,
  selectedRecordId,
  shareLinks,
  timelineDays,
  workspaceId,
  workspaceRole,
}: {
  activeConversationId: string | null;
  auditLogs: AuditLogItem[];
  authToken: string | null;
  canManageSharing: boolean;
  canManageWorkspace: boolean;
  canWriteWorkspace: boolean;
  conversations: Conversation[];
  filteringRecords: boolean;
  knowledgeStats: KnowledgeStats | null;
  latestSharePath: string;
  mediaAssets: MediaAsset[];
  mediaDeadLetterOverview: MediaDeadLetterOverview | null;
  mediaProcessingOverview: MediaProcessingOverview | null;
  mediaStorageSummary: MediaStorageSummary | null;
  messages: ChatMessage[];
  notifications: NotificationItem[];
  onApplyLocationFilter: RecordPanelV2Props["onApplyLocationFilter"];
  onApplyRecordFilter: RecordPanelV2Props["onApplyRecordFilter"];
  onBulkRetryMediaDeadLetter: RecordPanelV2Props["onBulkRetryMediaDeadLetter"];
  onCreateConversation: () => Promise<void>;
  onCreateReminder: RecordPanelV2Props["onCreateReminder"];
  onCreateSearchPreset: RecordPanelV2Props["onCreateSearchPreset"];
  onCreateShareLink: (input: {
    name?: string;
    permission_code: string;
    max_uses?: number | null;
  }) => Promise<void>;
  onDeleteMedia: (mediaId: string) => Promise<void>;
  onDeleteRecord: RecordPanelV2Props["onDeleteRecord"];
  onDeleteReminder: (reminderId: string) => Promise<void>;
  onDeleteSearchPreset: (presetId: string) => Promise<void>;
  onDisableShareLink: (shareLinkId: string) => Promise<void>;
  onMarkNotificationRead: (notificationId: string) => Promise<void>;
  onRefreshAuditLogs: () => Promise<void>;
  onRefreshMediaStatus: (mediaId: string) => Promise<void>;
  onReindexKnowledge: () => Promise<void>;
  onResetFilter: () => Promise<void>;
  onRetryMedia: (mediaId: string) => Promise<void>;
  onSaveProviderConfig: (
    featureCode: string,
    input: {
      provider_code: string;
      model_name?: string | null;
      is_enabled: boolean;
      api_base_url?: string | null;
      api_key_env_name?: string | null;
      options_json?: Record<string, unknown>;
    },
  ) => Promise<void>;
  onSaveRecord: (input: SaveRecordInput) => Promise<void>;
  onSelectConversation: (conversationId: string) => void;
  onSelectRecord: (recordId: string | null) => void;
  onSendMessage: (message: string) => Promise<void>;
  onSyncNotifications: () => Promise<void>;
  onUpdateReminder: (reminderId: string, input: ReminderUpdateInput) => Promise<void>;
  onUploadMedia: RecordPanelV2Props["onUploadMedia"];
  providerConfigs: ProviderFeatureConfig[];
  recordFilter: RecordFilterState;
  records: RecordItem[];
  reminders: ReminderItem[];
  savingSearchPreset: boolean;
  searchPresets: SearchPresetItem[];
  selectedRecordId: string | null;
  shareLinks: ShareLinkItem[];
  timelineDays: TimelineDay[];
  workspaceId: string;
  workspaceRole: "owner" | "editor" | "viewer";
}) {
  return (
    <div className="workspace-shell">
      <ChatPanel
        activeConversationId={activeConversationId}
        auditLogs={auditLogs}
        canManageSharing={canManageSharing}
        canManageWorkspace={canManageWorkspace}
        canWriteWorkspace={canWriteWorkspace}
        conversations={conversations}
        knowledgeStats={knowledgeStats}
        latestSharePath={latestSharePath}
        messages={messages}
        notifications={notifications}
        onCreateConversation={onCreateConversation}
        onCreateShareLink={onCreateShareLink}
        onDisableShareLink={onDisableShareLink}
        onMarkNotificationRead={onMarkNotificationRead}
        onRefreshAuditLogs={onRefreshAuditLogs}
        onReindexKnowledge={onReindexKnowledge}
        onSaveProviderConfig={onSaveProviderConfig}
        onSelectConversation={onSelectConversation}
        onSendMessage={onSendMessage}
        onSyncNotifications={onSyncNotifications}
        providerConfigs={providerConfigs}
        shareLinks={shareLinks}
        workspaceId={workspaceId}
        workspaceRole={workspaceRole}
      />
      <RecordPanelV2
        authToken={authToken}
        canWriteWorkspace={canWriteWorkspace}
        filteringRecords={filteringRecords}
        mediaAssets={mediaAssets}
        mediaDeadLetterOverview={mediaDeadLetterOverview}
        mediaProcessingOverview={mediaProcessingOverview}
        mediaStorageSummary={mediaStorageSummary}
        onApplyLocationFilter={onApplyLocationFilter}
        onApplyRecordFilter={onApplyRecordFilter}
        onBulkRetryMediaDeadLetter={onBulkRetryMediaDeadLetter}
        onCreateReminder={onCreateReminder}
        onCreateSearchPreset={onCreateSearchPreset}
        onDeleteMedia={onDeleteMedia}
        onDeleteRecord={onDeleteRecord}
        onDeleteReminder={onDeleteReminder}
        onDeleteSearchPreset={onDeleteSearchPreset}
        onRefreshMediaStatus={onRefreshMediaStatus}
        onResetFilter={onResetFilter}
        onRetryMedia={onRetryMedia}
        onSaveRecord={onSaveRecord}
        onSelectRecord={onSelectRecord}
        onUpdateReminder={onUpdateReminder}
        onUploadMedia={onUploadMedia}
        recordFilter={recordFilter}
        records={records}
        reminders={reminders}
        savingSearchPreset={savingSearchPreset}
        searchPresets={searchPresets}
        selectedRecordId={selectedRecordId}
        timelineDays={timelineDays}
        workspaceId={workspaceId}
      />
    </div>
  );
}
