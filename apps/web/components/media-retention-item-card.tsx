"use client";

import type { LocaleCode } from "../lib/locale";
import type { MediaRetentionItemCardProps } from "./media-retention-item-card.types";

function formatCreatedAt(value: string, locale: LocaleCode) {
  return new Date(value).toLocaleString(locale);
}

export function MediaRetentionItemCard({
  actionLoading = false,
  copy,
  item,
  locale,
  onToggleSelected,
  selectable = false,
  selected = false,
}: MediaRetentionItemCardProps) {
  const remoteReferenceLabel = copy.remoteReference ?? "Remote reference";

  return (
    <div>
      {selectable ? (
        <label className="muted" style={{ display: "block", marginBottom: 8 }}>
          <input
            checked={selected}
            disabled={actionLoading}
            onChange={() => onToggleSelected?.(item.media_id)}
            style={{ marginRight: 8 }}
            type="checkbox"
          />
          {copy.selectLabel}
        </label>
      ) : null}
      <article className="message">
        <div className="action-row" style={{ justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ minWidth: 0 }}>
            <div className="eyebrow">{item.media_type}</div>
            <div style={{ marginTop: 8, fontWeight: 600, wordBreak: "break-word" }}>{item.original_filename}</div>
            <div className="muted" style={{ marginTop: 8 }}>
              {copy.createdAt} {formatCreatedAt(item.created_at, locale)}
            </div>
          </div>
          <div style={{ textAlign: "right", marginLeft: 16 }}>
            <div style={{ fontWeight: 600 }}>{item.size_label}</div>
            <div className="muted" style={{ marginTop: 8 }}>
              {copy.ageDays} {item.age_days} {copy.days}
            </div>
          </div>
        </div>
        <div className="tag-row" style={{ marginTop: 12 }}>
          <span className="tag">{item.processing_status}</span>
          <span className="tag">{item.storage_provider}</span>
          <span className="tag">{item.storage_tier === "archive" ? copy.archived : copy.primary}</span>
          {item.storage_provider !== "local" ? <span className="tag">{remoteReferenceLabel}</span> : null}
          {item.file_missing ? <span className="tag">{copy.missing}</span> : null}
        </div>
      </article>
    </div>
  );
}
