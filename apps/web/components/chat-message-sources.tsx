"use client";

type ChatMessageSource = {
  record_title?: string;
  source_label?: string;
  source_type?: string;
  snippet?: string;
  score?: number;
};

export function ChatMessageSources({
  messageId,
  sources,
}: {
  messageId: string;
  sources: unknown[];
}) {
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
  );
}
