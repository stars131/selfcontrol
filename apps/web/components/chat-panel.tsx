"use client";

import Link from "next/link";

import { useStoredLocale } from "../lib/locale";
import { ChatAuditLogsCard } from "./chat-audit-logs-card";
import { ChatKnowledgeCard } from "./chat-knowledge-card";
import { ChatMessageThread } from "./chat-message-thread";
import { ChatNotificationsCard } from "./chat-notifications-card";
import { ChatShareLinksCard } from "./chat-share-links-card";
import { ProviderSettingsPanel } from "./provider-settings-panel";
import { useChatPanelActions } from "./use-chat-panel-actions";
import type {
  AuditLogItem,
  ChatMessage,
  Conversation,
  KnowledgeStats,
  NotificationItem,
  ProviderFeatureConfig,
  ShareLinkItem,
} from "../lib/types";

export function ChatPanel({
  workspaceId,
  workspaceRole,
  canWriteWorkspace,
  canManageWorkspace,
  canManageSharing,
  conversations,
  activeConversationId,
  messages,
  notifications,
  knowledgeStats,
  providerConfigs,
  shareLinks,
  latestSharePath,
  auditLogs,
  onSelectConversation,
  onCreateConversation,
  onMarkNotificationRead,
  onReindexKnowledge,
  onRefreshAuditLogs,
  onCreateShareLink,
  onDisableShareLink,
  onSaveProviderConfig,
  onSyncNotifications,
  onSendMessage,
}: {
  workspaceId: string;
  workspaceRole: "owner" | "editor" | "viewer";
  canWriteWorkspace: boolean;
  canManageWorkspace: boolean;
  canManageSharing: boolean;
  conversations: Conversation[];
  activeConversationId: string | null;
  messages: ChatMessage[];
  notifications: NotificationItem[];
  knowledgeStats: KnowledgeStats | null;
  providerConfigs: ProviderFeatureConfig[];
  shareLinks: ShareLinkItem[];
  latestSharePath: string;
  auditLogs: AuditLogItem[];
  onSelectConversation: (conversationId: string) => void;
  onCreateConversation: () => Promise<void>;
  onMarkNotificationRead: (notificationId: string) => Promise<void>;
  onReindexKnowledge: () => Promise<void>;
  onRefreshAuditLogs: () => Promise<void>;
  onCreateShareLink: (input: {
    name?: string;
    permission_code: string;
    max_uses?: number | null;
  }) => Promise<void>;
  onDisableShareLink: (shareLinkId: string) => Promise<void>;
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
  onSyncNotifications: () => Promise<void>;
  onSendMessage: (message: string) => Promise<void>;
}) {
  const { locale } = useStoredLocale();
  const {
    draft,
    loading,
    syncing,
    reindexing,
    refreshingAudit,
    creatingShare,
    disablingShareId,
    shareName,
    sharePermission,
    shareMaxUses,
    error,
    unreadCount,
    latestShareUrl,
    setDraft,
    setShareName,
    setSharePermission,
    setShareMaxUses,
    handleSend,
    handleSyncNotifications,
    handleReindexKnowledge,
    handleRefreshAuditLogs,
    handleCreateShareLink,
    handleDisableShareLink,
  } = useChatPanelActions({
    latestSharePath,
    notifications,
    onCreateShareLink,
    onDisableShareLink,
    onRefreshAuditLogs,
    onReindexKnowledge,
    onSyncNotifications,
    onSendMessage,
  });

  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <div className="eyebrow">Agent</div>
          <h2 className="title" style={{ fontSize: 22 }}>
            Chat Assistant
          </h2>
          <div className="muted" style={{ marginTop: 8 }}>
            Workspace {workspaceId} / {workspaceRole}
          </div>
        </div>
        {canManageWorkspace ? (
          <Link className="button secondary" href={`/app/workspaces/${workspaceId}/settings`}>
            Settings
          </Link>
        ) : null}
      </div>
      <div className="panel-body">
        <div className="conversation-bar">
          <div className="action-row">
            <button
              className="button secondary"
              disabled={!canWriteWorkspace}
              type="button"
              onClick={() => void onCreateConversation()}
            >
              New conversation
            </button>
            <button
              className="button secondary"
              disabled={syncing}
              type="button"
              onClick={() => void handleSyncNotifications()}
            >
              {syncing ? "Syncing..." : "Sync reminders"}
            </button>
          </div>
          <div className="conversation-list">
            {conversations.map((conversation) => (
              <button
                className={`conversation-pill ${conversation.id === activeConversationId ? "active" : ""}`}
                key={conversation.id}
                type="button"
                onClick={() => onSelectConversation(conversation.id)}
              >
                {conversation.title}
              </button>
            ))}
          </div>
        </div>
        {canManageWorkspace ? (
          <>
            <ChatKnowledgeCard
              canManageWorkspace={canManageWorkspace}
              knowledgeStats={knowledgeStats}
              onReindexKnowledge={handleReindexKnowledge}
              reindexing={reindexing}
            />
            {canManageSharing ? (
              <ChatShareLinksCard
                creatingShare={creatingShare}
                disablingShareId={disablingShareId}
                latestShareUrl={latestShareUrl}
                onCreateShareLink={handleCreateShareLink}
                onDisableShareLink={handleDisableShareLink}
                setShareMaxUses={setShareMaxUses}
                setShareName={setShareName}
                setSharePermission={setSharePermission}
                shareLinks={shareLinks}
                shareMaxUses={shareMaxUses}
                shareName={shareName}
                sharePermission={sharePermission}
              />
            ) : null}
            <div style={{ marginBottom: 16 }}>
              <ProviderSettingsPanel
                locale={locale}
                onSaveProviderConfig={onSaveProviderConfig}
                providerConfigs={providerConfigs}
              />
            </div>
          </>
        ) : null}
        <ChatAuditLogsCard
          auditLogs={auditLogs}
          onRefreshAuditLogs={handleRefreshAuditLogs}
          refreshingAudit={refreshingAudit}
        />
        <ChatNotificationsCard
          notifications={notifications}
          onMarkNotificationRead={onMarkNotificationRead}
          unreadCount={unreadCount}
        />
        <ChatMessageThread messages={messages} />

        <div className="composer">
          <textarea
            className="textarea"
            disabled={!canWriteWorkspace}
            placeholder={
              canWriteWorkspace
                ? "Examples: save this snack note..., bad hotpot in Hangzhou, ramen near last summer trip"
                : "Viewer mode: chat creation is disabled for this shared workspace."
            }
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
          />
          {error ? <div className="notice error">{error}</div> : null}
          <button className="button" type="button" onClick={handleSend} disabled={loading || !canWriteWorkspace}>
            {loading ? "Working..." : "Send"}
          </button>
        </div>
      </div>
    </section>
  );
}
