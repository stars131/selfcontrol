"use client";

import {
  bulkRetryMediaDeadLetter,
  createConversation,
  createRecord,
  createReminder,
  createSearchPreset,
  createShareLink,
  deleteMedia,
  deleteRecord,
  deleteReminder,
  deleteSearchPreset,
  getMediaStatus,
  reindexKnowledge,
  retryMediaProcessing,
  sendMessage,
  updateNotification,
  updateProviderConfig,
  updateRecord,
  updateReminder,
  updateShareLink,
  uploadMedia,
} from "../lib/api";
import { buildTimelineDays } from "../lib/timeline";
import type {
  ChatMessage,
  Conversation,
  KnowledgeStats,
  ProviderFeatureConfig,
  RecordFilterState,
  RecordItem,
  TimelineDay,
} from "../lib/types";
import type { ReminderUpdateInput, SaveRecordInput } from "./record-panel-v2.types";

type UseWorkspaceShellActionsProps = {
  token: string | null;
  workspaceId: string;
  activeConversationId: string | null;
  canWriteWorkspace: boolean;
  canManageWorkspace: boolean;
  canManageSharing: boolean;
  conversationsCount: number;
  recordFilter: RecordFilterState;
  records: RecordItem[];
  selectedRecordId: string | null;
  refreshRecords: (activeToken: string, nextRecordFilter?: RecordFilterState) => Promise<void>;
  refreshMedia: (activeToken: string, recordId: string | null) => Promise<void>;
  refreshMediaStorageSummary: (activeToken: string) => Promise<void>;
  refreshMediaProcessingOverview: (activeToken: string) => Promise<void>;
  refreshMediaDeadLetterOverview: (activeToken: string) => Promise<void>;
  refreshReminders: (activeToken: string, recordId: string | null) => Promise<void>;
  refreshNotifications: (activeToken: string) => Promise<void>;
  refreshKnowledge: (activeToken: string) => Promise<void>;
  refreshSearchPresets: (activeToken: string) => Promise<void>;
  refreshAuditLogs: (activeToken: string) => Promise<void>;
  refreshShareLinks: (activeToken: string) => Promise<void>;
  syncDueNotifications: (activeToken: string) => Promise<void>;
  loadConversationMessages: (activeToken: string, conversationId: string) => Promise<void>;
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  setVisibleRecords: React.Dispatch<React.SetStateAction<RecordItem[]>>;
  setTimelineDays: React.Dispatch<React.SetStateAction<TimelineDay[]>>;
  setSelectedRecordId: React.Dispatch<React.SetStateAction<string | null>>;
  setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>;
  setActiveConversationId: React.Dispatch<React.SetStateAction<string | null>>;
  setRecordFilter: React.Dispatch<React.SetStateAction<RecordFilterState>>;
  setFilteringRecords: React.Dispatch<React.SetStateAction<boolean>>;
  setSavingSearchPreset: React.Dispatch<React.SetStateAction<boolean>>;
  setKnowledgeStats: React.Dispatch<React.SetStateAction<KnowledgeStats | null>>;
  setProviderConfigs: React.Dispatch<React.SetStateAction<ProviderFeatureConfig[]>>;
  setLatestSharePath: React.Dispatch<React.SetStateAction<string>>;
  initialRecordFilter: RecordFilterState;
};

export function useWorkspaceShellActions({
  token,
  workspaceId,
  activeConversationId,
  canWriteWorkspace,
  canManageWorkspace,
  canManageSharing,
  conversationsCount,
  recordFilter,
  records,
  selectedRecordId,
  refreshRecords,
  refreshMedia,
  refreshMediaStorageSummary,
  refreshMediaProcessingOverview,
  refreshMediaDeadLetterOverview,
  refreshReminders,
  refreshNotifications,
  refreshKnowledge,
  refreshSearchPresets,
  refreshAuditLogs,
  refreshShareLinks,
  syncDueNotifications,
  loadConversationMessages,
  setMessages,
  setVisibleRecords,
  setTimelineDays,
  setSelectedRecordId,
  setConversations,
  setActiveConversationId,
  setRecordFilter,
  setFilteringRecords,
  setSavingSearchPreset,
  setKnowledgeStats,
  setProviderConfigs,
  setLatestSharePath,
  initialRecordFilter,
}: UseWorkspaceShellActionsProps) {
  const handleSendMessage = async (message: string) => {
    if (!canWriteWorkspace) {
      throw new Error("Viewer access is read-only");
    }
    if (!token || !activeConversationId) {
      throw new Error("No active conversation");
    }

    const result = await sendMessage(token, workspaceId, activeConversationId, message);
    setMessages((prev) => [...prev, result.user_message, result.assistant_message]);

    const mode = String(result.assistant_message.metadata_json.mode ?? "");
    if (mode === "create") {
      await refreshRecords(token, recordFilter);
      await refreshKnowledge(token);
      await refreshAuditLogs(token);
      if (result.records[0]) {
        setSelectedRecordId(result.records[0].id);
      }
      return;
    }

    setVisibleRecords(result.records);
    setTimelineDays(buildTimelineDays(result.records));
    setSelectedRecordId(result.records[0]?.id ?? null);
  };

  const handleCreateConversation = async () => {
    if (!canWriteWorkspace) {
      throw new Error("Viewer access is read-only");
    }
    if (!token) {
      throw new Error("Not authenticated");
    }
    const result = await createConversation(token, workspaceId, `Chat ${conversationsCount + 1}`);
    setConversations((prev) => [result.conversation, ...prev]);
    setActiveConversationId(result.conversation.id);
    setMessages([]);
  };

  const handleSelectConversation = (conversationId: string) => {
    if (!token) {
      return;
    }
    setActiveConversationId(conversationId);
    void loadConversationMessages(token, conversationId);
  };

  const handleSaveRecord = async (input: SaveRecordInput) => {
    if (!token) {
      throw new Error("Not authenticated");
    }
    if (!canWriteWorkspace) {
      throw new Error("Viewer access is read-only");
    }

    if (input.recordId) {
      await updateRecord(token, workspaceId, input.recordId, {
        title: input.title,
        content: input.content,
        rating: input.rating ?? null,
        occurred_at: input.occurred_at,
        is_avoid: input.is_avoid,
        extra_data: input.extra_data,
      });
      await refreshRecords(token, recordFilter);
      await refreshKnowledge(token);
      await refreshAuditLogs(token);
      setSelectedRecordId(input.recordId);
      return;
    }

    const result = await createRecord(token, workspaceId, {
      title: input.title,
      content: input.content,
      type_code: input.type_code,
      rating: input.rating ?? undefined,
      occurred_at: input.occurred_at,
      is_avoid: input.is_avoid,
      source_type: "manual",
      extra_data: input.extra_data,
    });
    await refreshRecords(token, recordFilter);
    await refreshKnowledge(token);
    await refreshAuditLogs(token);
    setSelectedRecordId(result.record.id);
  };

  const handleDeleteRecord = async (recordId: string) => {
    if (!token) {
      throw new Error("Not authenticated");
    }
    if (!canWriteWorkspace) {
      throw new Error("Viewer access is read-only");
    }
    await deleteRecord(token, workspaceId, recordId);
    const nextRecords = records.filter((record) => record.id !== recordId);
    setSelectedRecordId(nextRecords[0]?.id ?? null);
    await refreshRecords(token, recordFilter);
    await refreshMediaStorageSummary(token);
    await refreshMediaProcessingOverview(token);
    await refreshMediaDeadLetterOverview(token);
    await refreshKnowledge(token);
    await refreshAuditLogs(token);
  };

  const handleUploadMedia = async (recordId: string, file: File) => {
    if (!token) {
      throw new Error("Not authenticated");
    }
    if (!canWriteWorkspace) {
      throw new Error("Viewer access is read-only");
    }
    await uploadMedia(token, workspaceId, recordId, file);
    await refreshMedia(token, recordId);
    await refreshMediaStorageSummary(token);
    await refreshMediaProcessingOverview(token);
    await refreshMediaDeadLetterOverview(token);
    await refreshKnowledge(token);
    await refreshAuditLogs(token);
  };

  const handleDeleteMedia = async (mediaId: string) => {
    if (!token || !selectedRecordId) {
      throw new Error("Not authenticated");
    }
    if (!canWriteWorkspace) {
      throw new Error("Viewer access is read-only");
    }
    await deleteMedia(token, workspaceId, mediaId);
    await refreshMedia(token, selectedRecordId);
    await refreshMediaStorageSummary(token);
    await refreshMediaProcessingOverview(token);
    await refreshMediaDeadLetterOverview(token);
    await refreshKnowledge(token);
    await refreshAuditLogs(token);
  };

  const handleRetryMedia = async (mediaId: string) => {
    if (!token || !selectedRecordId) {
      throw new Error("Not authenticated");
    }
    if (!canWriteWorkspace) {
      throw new Error("Viewer access is read-only");
    }
    await retryMediaProcessing(token, workspaceId, mediaId);
    await refreshMedia(token, selectedRecordId);
    await refreshMediaProcessingOverview(token);
    await refreshMediaDeadLetterOverview(token);
    await refreshKnowledge(token);
    await refreshAuditLogs(token);
  };

  const handleRefreshMediaStatus = async (mediaId: string) => {
    if (!token || !selectedRecordId) {
      throw new Error("Not authenticated");
    }
    await getMediaStatus(token, workspaceId, mediaId);
    await refreshMedia(token, selectedRecordId);
    await refreshMediaProcessingOverview(token);
    await refreshMediaDeadLetterOverview(token);
  };

  const handleBulkRetryMediaDeadLetter = async (input: {
    mediaIds?: string[];
    retryStates?: string[];
    limit?: number;
  }) => {
    if (!token) {
      throw new Error("Not authenticated");
    }
    if (!canWriteWorkspace) {
      throw new Error("Viewer access is read-only");
    }
    await bulkRetryMediaDeadLetter(token, workspaceId, input);
    await refreshMedia(token, selectedRecordId);
    await refreshMediaProcessingOverview(token);
    await refreshMediaDeadLetterOverview(token);
    await refreshKnowledge(token);
    await refreshAuditLogs(token);
  };

  const handleResetFilter = async () => {
    if (!token) {
      throw new Error("Not authenticated");
    }
    if (!canWriteWorkspace) {
      throw new Error("Viewer access is read-only");
    }
    setRecordFilter(initialRecordFilter);
    await refreshRecords(token, initialRecordFilter);
  };

  const handleApplyRecordFilter = async (nextFilter: RecordFilterState) => {
    if (!token) {
      throw new Error("Not authenticated");
    }
    if (!canWriteWorkspace) {
      throw new Error("Viewer access is read-only");
    }
    setFilteringRecords(true);
    setRecordFilter(nextFilter);
    try {
      await refreshRecords(token, nextFilter);
    } finally {
      setFilteringRecords(false);
    }
  };

  const handleApplyLocationFilter = async ({
    placeQuery,
    reviewStatus,
    mappedOnly,
  }: Pick<RecordFilterState, "placeQuery" | "reviewStatus" | "mappedOnly">) => {
    await handleApplyRecordFilter({
      ...recordFilter,
      placeQuery,
      reviewStatus,
      mappedOnly,
    });
  };

  const handleCreateSearchPreset = async (name: string, nextFilter: RecordFilterState) => {
    if (!token) {
      throw new Error("Not authenticated");
    }
    if (!canWriteWorkspace) {
      throw new Error("Viewer access is read-only");
    }
    setSavingSearchPreset(true);
    try {
      await createSearchPreset(token, workspaceId, {
        name,
        filters: nextFilter,
      });
      await refreshSearchPresets(token);
      await refreshAuditLogs(token);
    } finally {
      setSavingSearchPreset(false);
    }
  };

  const handleDeleteSearchPreset = async (presetId: string) => {
    if (!token) {
      throw new Error("Not authenticated");
    }
    if (!canWriteWorkspace) {
      throw new Error("Viewer access is read-only");
    }
    await deleteSearchPreset(token, workspaceId, presetId);
    await refreshSearchPresets(token);
    await refreshAuditLogs(token);
  };

  const handleCreateReminder = async (input: {
    recordId: string;
    title?: string;
    message?: string;
    remind_at: string;
    channel_code?: string;
  }) => {
    if (!token) {
      throw new Error("Not authenticated");
    }
    if (!canManageWorkspace) {
      throw new Error("Viewer access is read-only");
    }
    await createReminder(token, workspaceId, input.recordId, {
      title: input.title,
      message: input.message,
      remind_at: input.remind_at,
      channel_code: input.channel_code ?? "in_app",
      is_enabled: true,
      metadata_json: {},
    });
    await refreshReminders(token, input.recordId);
  };

  const handleUpdateReminder = async (reminderId: string, input: ReminderUpdateInput) => {
    if (!token) {
      throw new Error("Not authenticated");
    }
    if (!canWriteWorkspace) {
      throw new Error("Viewer access is read-only");
    }
    await updateReminder(token, workspaceId, reminderId, input);
    await refreshReminders(token, selectedRecordId);
  };

  const handleDeleteReminder = async (reminderId: string) => {
    if (!token) {
      throw new Error("Not authenticated");
    }
    if (!canWriteWorkspace) {
      throw new Error("Viewer access is read-only");
    }
    await deleteReminder(token, workspaceId, reminderId);
    await refreshReminders(token, selectedRecordId);
  };

  const handleSyncNotifications = async () => {
    if (!token) {
      throw new Error("Not authenticated");
    }
    if (!canManageWorkspace) {
      throw new Error("Viewer access is read-only");
    }
    await syncDueNotifications(token);
  };

  const handleMarkNotificationRead = async (notificationId: string) => {
    if (!token) {
      throw new Error("Not authenticated");
    }
    if (!canManageWorkspace) {
      throw new Error("Viewer access is read-only");
    }
    await updateNotification(token, workspaceId, notificationId, { is_read: true });
    await refreshNotifications(token);
  };

  const handleReindexKnowledge = async () => {
    if (!token) {
      throw new Error("Not authenticated");
    }
    if (!canManageWorkspace) {
      throw new Error("Viewer access is read-only");
    }
    const result = await reindexKnowledge(token, workspaceId);
    setKnowledgeStats(result.stats);
    await refreshAuditLogs(token);
  };

  const handleSaveProviderConfig = async (
    featureCode: string,
    input: {
      provider_code: string;
      model_name?: string | null;
      is_enabled: boolean;
      api_base_url?: string | null;
      api_key_env_name?: string | null;
      options_json?: Record<string, unknown>;
    },
  ) => {
    if (!token) {
      throw new Error("Not authenticated");
    }
    const result = await updateProviderConfig(token, workspaceId, featureCode, input);
    setProviderConfigs((current) =>
      current.map((item) => (item.feature_code === featureCode ? result.config : item)),
    );
    await refreshKnowledge(token);
    await refreshAuditLogs(token);
  };

  const handleCreateShareLink = async (input: {
    name?: string;
    permission_code: string;
    max_uses?: number | null;
  }) => {
    if (!token) {
      throw new Error("Not authenticated");
    }
    if (!canManageSharing) {
      throw new Error("Only workspace owners can manage share links");
    }
    const result = await createShareLink(token, workspaceId, {
      name: input.name,
      permission_code: input.permission_code,
      max_uses: input.max_uses ?? null,
      expires_at: null,
    });
    setLatestSharePath(result.share_path);
    await refreshShareLinks(token);
    await refreshAuditLogs(token);
  };

  const handleDisableShareLink = async (shareLinkId: string) => {
    if (!token) {
      throw new Error("Not authenticated");
    }
    if (!canManageSharing) {
      throw new Error("Only workspace owners can manage share links");
    }
    await updateShareLink(token, workspaceId, shareLinkId, { is_enabled: false });
    await refreshShareLinks(token);
    await refreshAuditLogs(token);
  };

  const handleRefreshAuditLogs = async () => {
    if (!token) {
      throw new Error("Not authenticated");
    }
    await refreshAuditLogs(token);
  };

  return {
    handleSendMessage,
    handleCreateConversation,
    handleSelectConversation,
    handleSaveRecord,
    handleDeleteRecord,
    handleUploadMedia,
    handleDeleteMedia,
    handleRetryMedia,
    handleRefreshMediaStatus,
    handleBulkRetryMediaDeadLetter,
    handleResetFilter,
    handleApplyRecordFilter,
    handleApplyLocationFilter,
    handleCreateSearchPreset,
    handleDeleteSearchPreset,
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
