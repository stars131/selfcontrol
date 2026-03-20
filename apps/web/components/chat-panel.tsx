"use client";

import { useState } from "react";

import type { ChatMessage, Conversation, KnowledgeStats, NotificationItem } from "../lib/types";

export function ChatPanel({
  workspaceId,
  conversations,
  activeConversationId,
  messages,
  notifications,
  knowledgeStats,
  onSelectConversation,
  onCreateConversation,
  onMarkNotificationRead,
  onReindexKnowledge,
  onSyncNotifications,
  onSendMessage,
}: {
  workspaceId: string;
  conversations: Conversation[];
  activeConversationId: string | null;
  messages: ChatMessage[];
  notifications: NotificationItem[];
  knowledgeStats: KnowledgeStats | null;
  onSelectConversation: (conversationId: string) => void;
  onCreateConversation: () => Promise<void>;
  onMarkNotificationRead: (notificationId: string) => Promise<void>;
  onReindexKnowledge: () => Promise<void>;
  onSyncNotifications: () => Promise<void>;
  onSendMessage: (message: string) => Promise<void>;
}) {
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [reindexing, setReindexing] = useState(false);
  const [error, setError] = useState("");
  const unreadCount = notifications.filter((item) => !item.is_read).length;

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
