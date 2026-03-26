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
  RecordFilterState,
  RecordItem,
  ReminderItem,
  SearchPresetItem,
  ShareLinkItem,
  TimelineDay,
} from "../lib/types";
import type { RecordPanelV2Props, ReminderUpdateInput, SaveRecordInput } from "./record-panel-v2.types";

export type WorkspaceShellPanelsProps = {
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
  onSaveRecord: (input: SaveRecordInput) => Promise<void>;
  onSelectConversation: (conversationId: string) => void;
  onSelectRecord: (recordId: string | null) => void;
  onSendMessage: (message: string) => Promise<void>;
  onSyncNotifications: () => Promise<void>;
  onUpdateReminder: (reminderId: string, input: ReminderUpdateInput) => Promise<void>;
  onUploadMedia: RecordPanelV2Props["onUploadMedia"];
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
};
