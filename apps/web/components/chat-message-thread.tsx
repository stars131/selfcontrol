"use client";

import { useStoredLocale } from "../lib/locale";
import { getChatMessageThreadCopy } from "../lib/chat-message-thread-display";
import { ChatMessageSources } from "./chat-message-sources";
import type { ChatMessageThreadProps } from "./chat-message-thread.types";

export function ChatMessageThread({ messages }: ChatMessageThreadProps) {
  const { locale } = useStoredLocale();
  const copy = getChatMessageThreadCopy(locale);
  return (
    <div className="message-list">
      {messages.length ? (
        messages.map((message) => (
          <article
            className={`message ${message.role === "assistant" ? "assistant" : ""}`}
            key={message.id}
          >
            <div className="eyebrow">{message.role === "assistant" ? copy.assistant : copy.user}</div>
            <div style={{ marginTop: 8, lineHeight: 1.6, whiteSpace: "pre-wrap" }}>{message.content}</div>
            {message.role === "assistant" && message.metadata_json && Array.isArray(message.metadata_json.sources) ? (
              <ChatMessageSources messageId={message.id} sources={message.metadata_json.sources} />
            ) : null}
          </article>
        ))
      ) : (
        <article className="message assistant">
          <div className="eyebrow">{copy.assistant}</div>
          <div style={{ marginTop: 8, lineHeight: 1.6 }}>
            {copy.empty}
          </div>
        </article>
      )}
    </div>
  );
}
