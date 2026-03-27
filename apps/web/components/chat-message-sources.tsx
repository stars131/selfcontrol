"use client";

import { useStoredLocale } from "../lib/locale";
import { getChatMessageSourceDefaultLabel, getChatMessageSourceRelatedRecordLabel, getChatMessageSourceScoreLabel, getChatMessageSourceTypeLabel } from "../lib/chat-message-source-display";
import type { ChatMessageSource, ChatMessageSourcesProps } from "./chat-message-sources.types";

export function ChatMessageSources({
  messageId,
  sources,
}: ChatMessageSourcesProps) {
  const { locale } = useStoredLocale();
  return (
    <div className="record-list compact-list" style={{ marginTop: 12 }}>
      {sources.slice(0, 3).map((source, index) => {
        if (!source || typeof source !== "object") {
          return null;
        }

        const sourceItem = source as ChatMessageSource;
        return (
          <article className="message" key={`${messageId}-source-${index}`}>
            <div className="eyebrow">
              {getChatMessageSourceTypeLabel(locale, sourceItem.source_type)} / {sourceItem.source_label ?? getChatMessageSourceDefaultLabel(locale)}
            </div>
            <div style={{ marginTop: 8, fontWeight: 600 }}>
              {sourceItem.record_title ?? getChatMessageSourceRelatedRecordLabel(locale)}
            </div>
            {sourceItem.snippet ? (
              <div style={{ marginTop: 8, lineHeight: 1.6 }}>{sourceItem.snippet}</div>
            ) : null}
            {typeof sourceItem.score === "number" ? (
              <div className="muted" style={{ marginTop: 8 }}>
                {getChatMessageSourceScoreLabel(locale)} {sourceItem.score.toFixed(3)}
              </div>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}
