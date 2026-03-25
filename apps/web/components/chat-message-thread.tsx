"use client";

import { ChatMessageSources } from "./chat-message-sources";
import type { ChatMessageThreadProps } from "./chat-message-thread.types";

export function ChatMessageThread({ messages }: ChatMessageThreadProps) {
  return (
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
              <ChatMessageSources messageId={message.id} sources={message.metadata_json.sources} />
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
  );
}
