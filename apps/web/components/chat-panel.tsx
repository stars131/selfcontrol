"use client";

import { useEffect, useState } from "react";

import type {
  AuditLogItem,
  ChatMessage,
  Conversation,
  KnowledgeStats,
  NotificationItem,
  ProviderFeatureConfig,
} from "../lib/types";

type ProviderDraft = {
  provider_code: string;
  model_name: string;
  is_enabled: boolean;
  api_base_url: string;
  api_key_env_name: string;
};

export function ChatPanel({
  workspaceId,
  conversations,
  activeConversationId,
  messages,
  notifications,
  knowledgeStats,
  providerConfigs,
  auditLogs,
  onSelectConversation,
  onCreateConversation,
  onMarkNotificationRead,
  onReindexKnowledge,
  onRefreshAuditLogs,
  onSaveProviderConfig,
  onSyncNotifications,
  onSendMessage,
}: {
  workspaceId: string;
  conversations: Conversation[];
  activeConversationId: string | null;
  messages: ChatMessage[];
  notifications: NotificationItem[];
  knowledgeStats: KnowledgeStats | null;
  providerConfigs: ProviderFeatureConfig[];
  auditLogs: AuditLogItem[];
  onSelectConversation: (conversationId: string) => void;
  onCreateConversation: () => Promise<void>;
  onMarkNotificationRead: (notificationId: string) => Promise<void>;
  onReindexKnowledge: () => Promise<void>;
  onRefreshAuditLogs: () => Promise<void>;
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
  const [providerSavingCode, setProviderSavingCode] = useState("");
  const [providerDrafts, setProviderDrafts] = useState<Record<string, ProviderDraft>>({});
  const [error, setError] = useState("");
  const unreadCount = notifications.filter((item) => !item.is_read).length;

  useEffect(() => {
    const nextDrafts: Record<string, ProviderDraft> = {};
    for (const item of providerConfigs) {
      nextDrafts[item.feature_code] = {
        provider_code: item.provider_code,
        model_name: item.model_name ?? "",
        is_enabled: item.is_enabled,
        api_base_url: item.api_base_url ?? "",
        api_key_env_name: item.api_key_env_name ?? "",
      };
    }
    setProviderDrafts(nextDrafts);
  }, [providerConfigs]);

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

  const handleProviderDraftChange = (featureCode: string, patch: Partial<ProviderDraft>) => {
    setProviderDrafts((current) => ({
      ...current,
      [featureCode]: {
        provider_code: current[featureCode]?.provider_code ?? "",
        model_name: current[featureCode]?.model_name ?? "",
        is_enabled: current[featureCode]?.is_enabled ?? false,
        api_base_url: current[featureCode]?.api_base_url ?? "",
        api_key_env_name: current[featureCode]?.api_key_env_name ?? "",
        ...patch,
      },
    }));
  };

  const handleSaveProviderConfig = async (featureCode: string) => {
    const item = providerDrafts[featureCode];
    if (!item) {
      return;
    }

    setProviderSavingCode(featureCode);
    setError("");
    try {
      await onSaveProviderConfig(featureCode, {
        provider_code: item.provider_code,
        model_name: item.model_name || null,
        is_enabled: item.is_enabled,
        api_base_url: item.api_base_url || null,
        api_key_env_name: item.api_key_env_name || null,
      });
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : "Save failed";
      setError(message);
    } finally {
      setProviderSavingCode("");
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
            Workspace {workspaceId}
          </div>
        </div>
      </div>
      <div className="panel-body">
        <div className="conversation-bar">
          <div className="action-row">
            <button className="button secondary" type="button" onClick={() => void onCreateConversation()}>
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
              disabled={reindexing}
              type="button"
              onClick={() => void handleReindexKnowledge()}
            >
              {reindexing ? "Reindexing..." : "Rebuild knowledge index"}
            </button>
          </div>
        </div>
        <div className="record-card" style={{ marginBottom: 16 }}>
          <div className="eyebrow">Providers</div>
          <div className="record-list compact-list" style={{ marginTop: 12 }}>
            {providerConfigs.map((item) => {
              const draftItem = providerDrafts[item.feature_code];
              if (!draftItem) {
                return null;
              }

              return (
                <article className="message" key={item.feature_code}>
                  <div className="eyebrow">{item.feature_label}</div>
                  <div style={{ marginTop: 8, lineHeight: 1.6 }}>{item.feature_description}</div>
                  <label className="muted" style={{ display: "block", marginTop: 10 }}>
                    <input
                      checked={draftItem.is_enabled}
                      onChange={(event) =>
                        handleProviderDraftChange(item.feature_code, { is_enabled: event.target.checked })
                      }
                      style={{ marginRight: 8 }}
                      type="checkbox"
                    />
                    Enabled
                  </label>
                  <div className="muted" style={{ marginTop: 10 }}>
                    Provider
                  </div>
                  <select
                    className="input"
                    style={{ marginTop: 8 }}
                    value={draftItem.provider_code}
                    onChange={(event) =>
                      handleProviderDraftChange(item.feature_code, { provider_code: event.target.value })
                    }
                  >
                    {item.providers.map((providerCode) => (
                      <option key={providerCode} value={providerCode}>
                        {providerCode}
                      </option>
                    ))}
                  </select>
                  <input
                    className="input"
                    placeholder="Model name"
                    style={{ marginTop: 10 }}
                    value={draftItem.model_name}
                    onChange={(event) =>
                      handleProviderDraftChange(item.feature_code, { model_name: event.target.value })
                    }
                  />
                  <input
                    className="input"
                    placeholder="API base URL"
                    style={{ marginTop: 10 }}
                    value={draftItem.api_base_url}
                    onChange={(event) =>
                      handleProviderDraftChange(item.feature_code, { api_base_url: event.target.value })
                    }
                  />
                  <input
                    className="input"
                    placeholder="API key env name"
                    style={{ marginTop: 10 }}
                    value={draftItem.api_key_env_name}
                    onChange={(event) =>
                      handleProviderDraftChange(item.feature_code, { api_key_env_name: event.target.value })
                    }
                  />
                  <div className="muted" style={{ marginTop: 8 }}>
                    {item.is_default ? "Using default profile" : "Workspace override saved"}
                  </div>
                  <div className="action-row" style={{ marginTop: 10 }}>
                    <button
                      className="button secondary"
                      disabled={providerSavingCode === item.feature_code}
                      type="button"
                      onClick={() => void handleSaveProviderConfig(item.feature_code)}
                    >
                      {providerSavingCode === item.feature_code ? "Saving..." : "Save provider"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
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
            placeholder="Examples: save this snack note..., bad hotpot in Hangzhou, ramen near last summer trip"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
          />
          {error ? <div className="notice error">{error}</div> : null}
          <button className="button" type="button" onClick={handleSend} disabled={loading}>
            {loading ? "Working..." : "Send"}
          </button>
        </div>
      </div>
    </section>
  );
}
