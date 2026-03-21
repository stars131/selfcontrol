"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  createConversation,
  createRecord,
  createReminder,
  createShareLink,
  deleteRecord,
  deleteReminder,
  getKnowledgeStats,
  getMediaStatus,
  getTimeline,
  listAuditLogs,
  listConversations,
  listMedia,
  listMessages,
  listNotifications,
  listProviderConfigs,
  listRecords,
  listReminders,
  listShareLinks,
  reindexKnowledge,
  retryMediaProcessing,
  sendMessage,
  syncNotifications,
  updateNotification,
  updateProviderConfig,
  updateRecord,
  updateReminder,
  updateShareLink,
  uploadMedia,
} from "../lib/api";
import { clearStoredSession, getStoredToken } from "../lib/auth";
import type {
  AuditLogItem,
  ChatMessage,
  Conversation,
  KnowledgeStats,
  MediaAsset,
  NotificationItem,
  ProviderFeatureConfig,
  RecordItem,
  ReminderItem,
  ShareLinkItem,
  TimelineDay,
} from "../lib/types";
import { buildTimelineDays } from "../lib/timeline";
import { ChatPanel } from "./chat-panel";
import { RecordPanelV2 } from "./record-panel-v2";

export function WorkspaceShellClient({ workspaceId }: { workspaceId: string }) {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [records, setRecords] = useState<RecordItem[]>([]);
  const [visibleRecords, setVisibleRecords] = useState<RecordItem[]>([]);
  const [timelineDays, setTimelineDays] = useState<TimelineDay[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null);
  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>([]);
  const [reminders, setReminders] = useState<ReminderItem[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [knowledgeStats, setKnowledgeStats] = useState<KnowledgeStats | null>(null);
  const [providerConfigs, setProviderConfigs] = useState<ProviderFeatureConfig[]>([]);
  const [shareLinks, setShareLinks] = useState<ShareLinkItem[]>([]);
  const [latestSharePath, setLatestSharePath] = useState("");
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refreshTimeline = async (activeToken: string) => {
    const result = await getTimeline(activeToken, workspaceId);
    setTimelineDays(result.items);
  };

  const refreshRecords = async (activeToken: string) => {
    const result = await listRecords(activeToken, workspaceId);
    setRecords(result.items);
    setVisibleRecords(result.items);
    setSelectedRecordId((current) =>
      current && result.items.some((item) => item.id === current) ? current : result.items[0]?.id ?? null,
    );
    await refreshTimeline(activeToken);
  };

  const refreshMedia = async (activeToken: string, recordId: string | null) => {
    if (!recordId) {
      setMediaAssets([]);
      return;
    }
    const result = await listMedia(activeToken, workspaceId, recordId);
    setMediaAssets(result.items);
  };

  const refreshReminders = async (activeToken: string, recordId: string | null) => {
    if (!recordId) {
      setReminders([]);
      return;
    }
    const result = await listReminders(activeToken, workspaceId, { recordId });
    setReminders(result.items);
  };

  const refreshNotifications = async (activeToken: string) => {
    const result = await listNotifications(activeToken, workspaceId);
    setNotifications(result.items);
  };

  const refreshKnowledge = async (activeToken: string) => {
    const result = await getKnowledgeStats(activeToken, workspaceId);
    setKnowledgeStats(result.stats);
  };

  const refreshProviderConfigs = async (activeToken: string) => {
    const result = await listProviderConfigs(activeToken, workspaceId);
    setProviderConfigs(result.items);
  };

  const refreshShareLinks = async (activeToken: string) => {
    const result = await listShareLinks(activeToken, workspaceId);
    setShareLinks(result.items);
  };

  const refreshAuditLogs = async (activeToken: string) => {
    const result = await listAuditLogs(activeToken, workspaceId, { limit: 8 });
    setAuditLogs(result.items);
  };

  const syncDueNotifications = async (activeToken: string) => {
    await syncNotifications(activeToken, workspaceId);
    await refreshNotifications(activeToken);
  };

  const loadConversationMessages = async (activeToken: string, conversationId: string) => {
    const result = await listMessages(activeToken, workspaceId, conversationId);
    setMessages(result.items);
  };

  useEffect(() => {
    const activeToken = getStoredToken();
    if (!activeToken) {
      router.replace("/login");
      return;
    }

    const load = async () => {
      try {
        setToken(activeToken);
        await refreshRecords(activeToken);

        const conversationResult = await listConversations(activeToken, workspaceId);
        let items = conversationResult.items;
        if (!items.length) {
          const created = await createConversation(activeToken, workspaceId, "Workspace chat");
          items = [created.conversation];
        }

        setConversations(items);
        setActiveConversationId(items[0].id);
        await loadConversationMessages(activeToken, items[0].id);
        await refreshNotifications(activeToken);
        await refreshKnowledge(activeToken);
        await refreshProviderConfigs(activeToken);
        await refreshShareLinks(activeToken);
        await refreshAuditLogs(activeToken);
      } catch (caught) {
        clearStoredSession();
        setError(caught instanceof Error ? caught.message : "Failed to load workspace data");
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, [router, workspaceId]);

  useEffect(() => {
    if (!token) {
      return;
    }
    void refreshMedia(token, selectedRecordId);
  }, [token, selectedRecordId, workspaceId]);

  useEffect(() => {
    if (!token) {
      return;
    }
    void refreshReminders(token, selectedRecordId);
  }, [token, selectedRecordId, workspaceId]);

  useEffect(() => {
    if (!token) {
      return;
    }

    void syncDueNotifications(token);
    const timer = window.setInterval(() => {
      void syncDueNotifications(token);
    }, 30_000);

    return () => window.clearInterval(timer);
  }, [token, workspaceId]);

  const handleSendMessage = async (message: string) => {
    if (!token || !activeConversationId) {
      throw new Error("No active conversation");
    }

    const result = await sendMessage(token, workspaceId, activeConversationId, message);
    setMessages((prev) => [...prev, result.user_message, result.assistant_message]);

    const mode = String(result.assistant_message.metadata_json.mode ?? "");
    if (mode === "create") {
      await refreshRecords(token);
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
    if (!token) {
      throw new Error("Not authenticated");
    }
    const result = await createConversation(token, workspaceId, `Chat ${conversations.length + 1}`);
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

  const handleSaveRecord = async (input: {
    recordId?: string;
    title?: string;
    content: string;
    type_code: string;
    rating?: number | null;
    occurred_at?: string;
    is_avoid: boolean;
    extra_data?: Record<string, unknown>;
  }) => {
    if (!token) {
      throw new Error("Not authenticated");
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
      await refreshRecords(token);
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
    await refreshRecords(token);
    await refreshKnowledge(token);
    await refreshAuditLogs(token);
    setSelectedRecordId(result.record.id);
  };

  const handleDeleteRecord = async (recordId: string) => {
    if (!token) {
      throw new Error("Not authenticated");
    }
    await deleteRecord(token, workspaceId, recordId);
    const nextRecords = records.filter((record) => record.id !== recordId);
    setSelectedRecordId(nextRecords[0]?.id ?? null);
    await refreshRecords(token);
    await refreshKnowledge(token);
    await refreshAuditLogs(token);
  };

  const handleUploadMedia = async (recordId: string, file: File) => {
    if (!token) {
      throw new Error("Not authenticated");
    }
    await uploadMedia(token, workspaceId, recordId, file);
    await refreshMedia(token, recordId);
    await refreshKnowledge(token);
    await refreshAuditLogs(token);
  };

  const handleRetryMedia = async (mediaId: string) => {
    if (!token || !selectedRecordId) {
      throw new Error("Not authenticated");
    }
    await retryMediaProcessing(token, workspaceId, mediaId);
    await refreshMedia(token, selectedRecordId);
    await refreshKnowledge(token);
    await refreshAuditLogs(token);
  };

  const handleRefreshMediaStatus = async (mediaId: string) => {
    if (!token || !selectedRecordId) {
      throw new Error("Not authenticated");
    }
    await getMediaStatus(token, workspaceId, mediaId);
    await refreshMedia(token, selectedRecordId);
  };

  const handleResetFilter = async () => {
    if (!token) {
      throw new Error("Not authenticated");
    }
    await refreshRecords(token);
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

  const handleUpdateReminder = async (
    reminderId: string,
    input: Partial<{
      title: string | null;
      message: string | null;
      remind_at: string | null;
      status: string;
      is_enabled: boolean;
    }>,
  ) => {
    if (!token) {
      throw new Error("Not authenticated");
    }
    await updateReminder(token, workspaceId, reminderId, input);
    await refreshReminders(token, selectedRecordId);
  };

  const handleDeleteReminder = async (reminderId: string) => {
    if (!token) {
      throw new Error("Not authenticated");
    }
    await deleteReminder(token, workspaceId, reminderId);
    await refreshReminders(token, selectedRecordId);
  };

  const handleSyncNotifications = async () => {
    if (!token) {
      throw new Error("Not authenticated");
    }
    await syncDueNotifications(token);
  };

  const handleMarkNotificationRead = async (notificationId: string) => {
    if (!token) {
      throw new Error("Not authenticated");
    }
    await updateNotification(token, workspaceId, notificationId, { is_read: true });
    await refreshNotifications(token);
  };

  const handleReindexKnowledge = async () => {
    if (!token) {
      throw new Error("Not authenticated");
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
    },
  ) => {
    if (!token) {
      throw new Error("Not authenticated");
    }
    const result = await updateProviderConfig(token, workspaceId, featureCode, {
      ...input,
      options_json: {},
    });
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

  if (loading) {
    return (
      <main className="page-shell">
        <section className="panel auth-panel">
          <div className="panel-body">
            <div className="notice">Loading workspace...</div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="page-shell">
      {error ? <div className="notice error">{error}</div> : null}
      <div className="workspace-shell">
        <ChatPanel
          activeConversationId={activeConversationId}
          auditLogs={auditLogs}
          conversations={conversations}
          knowledgeStats={knowledgeStats}
          latestSharePath={latestSharePath}
          messages={messages}
          notifications={notifications}
          onCreateConversation={handleCreateConversation}
          onCreateShareLink={handleCreateShareLink}
          onDisableShareLink={handleDisableShareLink}
          onMarkNotificationRead={handleMarkNotificationRead}
          onRefreshAuditLogs={handleRefreshAuditLogs}
          onReindexKnowledge={handleReindexKnowledge}
          onSaveProviderConfig={handleSaveProviderConfig}
          onSelectConversation={handleSelectConversation}
          onSendMessage={handleSendMessage}
          onSyncNotifications={handleSyncNotifications}
          providerConfigs={providerConfigs}
          shareLinks={shareLinks}
          workspaceId={workspaceId}
        />
        <RecordPanelV2
          authToken={token}
          mediaAssets={mediaAssets}
          onCreateReminder={handleCreateReminder}
          onDeleteRecord={handleDeleteRecord}
          onDeleteReminder={handleDeleteReminder}
          onRefreshMediaStatus={handleRefreshMediaStatus}
          onResetFilter={handleResetFilter}
          onRetryMedia={handleRetryMedia}
          onSaveRecord={handleSaveRecord}
          onSelectRecord={setSelectedRecordId}
          onUpdateReminder={handleUpdateReminder}
          onUploadMedia={handleUploadMedia}
          records={visibleRecords}
          reminders={reminders}
          selectedRecordId={selectedRecordId}
          timelineDays={timelineDays}
          workspaceId={workspaceId}
        />
      </div>
    </main>
  );
}
