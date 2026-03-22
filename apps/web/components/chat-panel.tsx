"use client";

import Link from "next/link";

import { useStoredLocale } from "../lib/locale";
import { ChatKnowledgeCard } from "./chat-knowledge-card";
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
        <div className="record-card" style={{ marginBottom: 16 }}>
          <div className="action-row" style={{ justifyContent: "space-between" }}>
            <div className="eyebrow">Audit Logs</div>
            <button
              className="button secondary"
              disabled={refreshingAudit}
              type="button"
              onClick={() => void handleRefreshAuditLogs()}
            >
              {refreshingAudit ? "Refreshing..." : "Refresh logs"}
            </button>
          </div>
          <div className="record-list compact-list" style={{ marginTop: 12 }}>
            {auditLogs.length ? (
              auditLogs.map((item) => (
                <article className="message" key={item.id}>
                  <div className="eyebrow">
                    {item.action_code} / {item.status}
                  </div>
                  <div style={{ marginTop: 8, fontWeight: 600 }}>{item.message ?? item.resource_type}</div>
                  {item.created_at ? (
                    <div className="muted" style={{ marginTop: 8 }}>
                      {new Date(item.created_at).toLocaleString()}
                    </div>
                  ) : null}
                </article>
              ))
            ) : (
              <div className="notice">No audit logs yet.</div>
            )}
          </div>
        </div>
        <div className="record-card" style={{ marginBottom: 16 }}>
          <div className="eyebrow">Notifications</div>
          <div className="muted" style={{ marginTop: 8 }}>
            {unreadCount ? `${unreadCount} unread reminder notification(s)` : "No unread reminder notifications."}
          </div>
          <div className="record-list compact-list" style={{ marginTop: 12 }}>
            {notifications.length ? (
              notifications.slice(0, 6).map((notification) => (
                <article className="message" key={notification.id}>
                  <div className="eyebrow">{notification.event_type}</div>
                  <div style={{ marginTop: 8, fontWeight: 600 }}>{notification.title}</div>
                  {notification.message ? (
                    <div style={{ marginTop: 8, lineHeight: 1.6 }}>{notification.message}</div>
                  ) : null}
                  <div className="muted" style={{ marginTop: 8 }}>
                    {new Date(notification.created_at).toLocaleString()}
                  </div>
                  {!notification.is_read ? (
                    <div className="action-row" style={{ marginTop: 10 }}>
                      <button
                        className="button secondary"
                        type="button"
                        onClick={() => void onMarkNotificationRead(notification.id)}
                      >
                        Mark read
                      </button>
                    </div>
                  ) : null}
                </article>
              ))
            ) : (
              <div className="notice">No notifications yet.</div>
            )}
          </div>
        </div>
        <div className="message-list">
          {messages.length ? (
            messages.map((message) => (
              <article
                className={`message ${message.role === "assistant" ? "assistant" : ""}`}
                key={message.id}
              >
                <div className="eyebrow">{message.role === "assistant" ? "assistant" : "you"}</div>
                <div style={{ marginTop: 8, lineHeight: 1.6, whiteSpace: "pre-wrap" }}>{message.content}</div>
                {message.role === "assistant" && Array.isArray(message.metadata_json.sources) ? (
                  <div className="record-list compact-list" style={{ marginTop: 12 }}>
                    {message.metadata_json.sources.slice(0, 3).map((source, index) => {
                      if (!source || typeof source !== "object") {
                        return null;
                      }

                      const sourceItem = source as {
                        record_title?: string;
                        source_label?: string;
                        source_type?: string;
                        snippet?: string;
                        score?: number;
                      };
                      return (
                        <article className="message" key={`${message.id}-source-${index}`}>
                          <div className="eyebrow">
                            {sourceItem.source_type ?? "source"} / {sourceItem.source_label ?? "memory"}
                          </div>
                          <div style={{ marginTop: 8, fontWeight: 600 }}>
                            {sourceItem.record_title ?? "Related record"}
                          </div>
                          {sourceItem.snippet ? (
                            <div style={{ marginTop: 8, lineHeight: 1.6 }}>{sourceItem.snippet}</div>
                          ) : null}
                          {typeof sourceItem.score === "number" ? (
                            <div className="muted" style={{ marginTop: 8 }}>
                              score {sourceItem.score.toFixed(3)}
                            </div>
                          ) : null}
                        </article>
                      );
                    })}
                  </div>
                ) : null}
              </article>
            ))
          ) : (
            <article className="message assistant">
              <div className="eyebrow">assistant</div>
              <div style={{ marginTop: 8, lineHeight: 1.6 }}>
                Start with a search query, or use save / add / note to turn your message into a new record.
              </div>
            </article>
          )}
        </div>

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
