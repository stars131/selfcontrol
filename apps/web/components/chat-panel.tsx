"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { ProviderSettingsPanel } from "./provider-settings-panel";
import type {
  AuditLogItem,
  ChatMessage,
  Conversation,
  KnowledgeStats,
  NotificationItem,
  ProviderFeatureConfig,
  ShareLinkItem,
} from "../lib/types";

function buildShareUrl(path: string) {
  if (typeof window === "undefined") {
    return path;
  }
  return `${window.location.origin}${path}`;
}

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
    },
  ) => Promise<void>;
  onSyncNotifications: () => Promise<void>;
  onSendMessage: (message: string) => Promise<void>;
}) {
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [reindexing, setReindexing] = useState(false);
  const [refreshingAudit, setRefreshingAudit] = useState(false);
  const [creatingShare, setCreatingShare] = useState(false);
  const [disablingShareId, setDisablingShareId] = useState("");
  const [shareName, setShareName] = useState("");
  const [sharePermission, setSharePermission] = useState("viewer");
  const [shareMaxUses, setShareMaxUses] = useState("");
  const [error, setError] = useState("");
  const unreadCount = notifications.filter((item) => !item.is_read).length;
  const latestShareUrl = useMemo(() => (latestSharePath ? buildShareUrl(latestSharePath) : ""), [latestSharePath]);

  const handleSend = async () => {
    const value = draft.trim();
    if (!value) {
      return;
    }

    setLoading(true);
    setError("");
    setDraft("");

    try {
      await onSendMessage(value);
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : "Request failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleSyncNotifications = async () => {
    setSyncing(true);
    setError("");
    try {
      await onSyncNotifications();
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : "Sync failed";
      setError(message);
    } finally {
      setSyncing(false);
    }
  };

  const handleReindexKnowledge = async () => {
    setReindexing(true);
    setError("");
    try {
      await onReindexKnowledge();
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : "Reindex failed";
      setError(message);
    } finally {
      setReindexing(false);
    }
  };

  const handleRefreshAuditLogs = async () => {
    setRefreshingAudit(true);
    setError("");
    try {
      await onRefreshAuditLogs();
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : "Audit refresh failed";
      setError(message);
    } finally {
      setRefreshingAudit(false);
    }
  };

  const handleCreateShareLink = async () => {
    setCreatingShare(true);
    setError("");
    try {
      await onCreateShareLink({
        name: shareName || undefined,
        permission_code: sharePermission,
        max_uses: shareMaxUses ? Number(shareMaxUses) : null,
      });
      setShareName("");
      setShareMaxUses("");
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : "Share creation failed";
      setError(message);
    } finally {
      setCreatingShare(false);
    }
  };

  const handleDisableShareLink = async (shareLinkId: string) => {
    setDisablingShareId(shareLinkId);
    setError("");
    try {
      await onDisableShareLink(shareLinkId);
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : "Share update failed";
      setError(message);
    } finally {
      setDisablingShareId("");
    }
  };

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
        <div className="record-card" style={{ marginBottom: 16 }}>
          <div className="eyebrow">Knowledge Base</div>
          <div className="muted" style={{ marginTop: 8 }}>
            {knowledgeStats
              ? `${knowledgeStats.chunk_count} chunks across ${knowledgeStats.record_count} record(s)`
              : "Knowledge stats unavailable."}
          </div>
          {knowledgeStats ? (
            <div className="muted" style={{ marginTop: 8 }}>
              {knowledgeStats.embedding_provider} / {knowledgeStats.embedding_model} / dim{" "}
              {knowledgeStats.embedding_dimensions}
            </div>
          ) : null}
          {knowledgeStats?.latest_indexed_at ? (
            <div className="muted" style={{ marginTop: 8 }}>
              Updated {new Date(knowledgeStats.latest_indexed_at).toLocaleString()}
            </div>
          ) : null}
          <div className="action-row" style={{ marginTop: 12 }}>
            <button
              className="button secondary"
              disabled={reindexing || !canManageWorkspace}
              type="button"
              onClick={() => void handleReindexKnowledge()}
            >
              {reindexing ? "Reindexing..." : "Rebuild knowledge index"}
            </button>
          </div>
        </div>
        {canManageSharing ? (
        <div className="record-card" style={{ marginBottom: 16 }}>
          <div className="eyebrow">Share Links</div>
          <div className="form-stack" style={{ marginTop: 12 }}>
            <input
              className="input"
              placeholder="Share name"
              value={shareName}
              onChange={(event) => setShareName(event.target.value)}
            />
            <div className="action-row">
              <select
                className="input"
                value={sharePermission}
                onChange={(event) => setSharePermission(event.target.value)}
              >
                <option value="viewer">viewer</option>
                <option value="editor">editor</option>
              </select>
              <input
                className="input"
                placeholder="Max uses"
                value={shareMaxUses}
                onChange={(event) => setShareMaxUses(event.target.value.replace(/[^0-9]/g, ""))}
              />
            </div>
            <button className="button secondary" disabled={creatingShare} type="button" onClick={() => void handleCreateShareLink()}>
              {creatingShare ? "Creating..." : "Create share link"}
            </button>
            {latestShareUrl ? (
              <article className="message assistant">
                <div className="eyebrow">Latest link</div>
                <div style={{ marginTop: 8, wordBreak: "break-all" }}>{latestShareUrl}</div>
              </article>
            ) : null}
            <div className="record-list compact-list">
              {shareLinks.length ? (
                shareLinks.map((item) => (
                  <article className="message" key={item.id}>
                    <div className="eyebrow">
                      {item.permission_code} / {item.is_enabled ? "enabled" : "disabled"}
                    </div>
                    <div style={{ marginTop: 8, fontWeight: 600 }}>{item.name}</div>
                    <div className="muted" style={{ marginTop: 8 }}>
                      token hint {item.token_hint} · used {item.use_count}
                    </div>
                    <div className="action-row" style={{ marginTop: 10 }}>
                      <button
                        className="button secondary"
                        disabled={!item.is_enabled || disablingShareId === item.id}
                        type="button"
                        onClick={() => void handleDisableShareLink(item.id)}
                      >
                        {disablingShareId === item.id ? "Updating..." : "Disable"}
                      </button>
                    </div>
                  </article>
                ))
              ) : (
                <div className="notice">No share links yet.</div>
              )}
            </div>
          </div>
        </div>
        ) : null}
        <div style={{ marginBottom: 16 }}>
          <ProviderSettingsPanel
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
