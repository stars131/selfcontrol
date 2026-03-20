"use client";

import { useState } from "react";

type Message = {
  role: "assistant" | "user";
  content: string;
};

export function ChatPanel({
  workspaceId,
  onAction,
}: {
  workspaceId: string;
  onAction: (message: string) => Promise<{
    mode: "create" | "search";
    assistantMessage: string;
  }>;
}) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Type a message to search past records, or describe something to save. Messages containing save/add/record or Chinese equivalents will be written as new records after parsing.",
    },
  ]);
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
    setMessages((prev) => [...prev, { role: "user", content: value }]);
    setDraft("");

    try {
      const result = await onAction(value);
      setMessages((prev) => [...prev, { role: "assistant", content: result.assistantMessage }]);
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : "Request failed";
      setError(message);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `Action failed: ${message}` },
      ]);
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
        <div className="message-list">
          {messages.map((message, index) => (
            <article
              className={`message ${message.role === "assistant" ? "assistant" : ""}`}
              key={`${message.role}-${index}`}
            >
              <div className="eyebrow">{message.role === "assistant" ? "assistant" : "you"}</div>
              <div style={{ marginTop: 8, lineHeight: 1.6 }}>{message.content}</div>
            </article>
          ))}
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
