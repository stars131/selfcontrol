"use client";

import { useState } from "react";

import type { ChatMessage, Conversation } from "../lib/types";

export function ChatPanel({
  workspaceId,
  conversations,
  activeConversationId,
  messages,
  onSelectConversation,
  onCreateConversation,
  onSendMessage,
}: {
  workspaceId: string;
  conversations: Conversation[];
  activeConversationId: string | null;
  messages: ChatMessage[];
  onSelectConversation: (conversationId: string) => void;
  onCreateConversation: () => Promise<void>;
  onSendMessage: (message: string) => Promise<void>;
}) {
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
          <button className="button secondary" type="button" onClick={() => void onCreateConversation()}>
            New conversation
          </button>
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
        <div className="message-list">
          {messages.length ? (
            messages.map((message) => (
              <article
                className={`message ${message.role === "assistant" ? "assistant" : ""}`}
                key={message.id}
              >
                <div className="eyebrow">{message.role === "assistant" ? "assistant" : "you"}</div>
                <div style={{ marginTop: 8, lineHeight: 1.6 }}>{message.content}</div>
              </article>
            ))
          ) : (
            <article className="message assistant">
              <div className="eyebrow">assistant</div>
              <div style={{ marginTop: 8, lineHeight: 1.6 }}>
                Start with a search query, or use save / add / 记一下 to turn your message into a
                new record.
              </div>
            </article>
          )}
        </div>

        <div className="composer">
          <textarea
            className="textarea"
            placeholder="Examples: save this snack note..., 记一下这家烤鱼不错, last month hangzhou sushi"
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
