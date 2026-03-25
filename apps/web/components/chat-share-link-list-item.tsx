"use client";

import type { ChatShareLinkListItemProps } from "./chat-share-link-list-item.types";

export function ChatShareLinkListItem({
  disablingShareId,
  item,
  onDisableShareLink,
}: ChatShareLinkListItemProps) {
  return (
    <article className="message">
      <div className="eyebrow">
        {item.permission_code} / {item.is_enabled ? "enabled" : "disabled"}
      </div>
      <div style={{ marginTop: 8, fontWeight: 600 }}>{item.name}</div>
      <div className="muted" style={{ marginTop: 8 }}>
        token hint {item.token_hint} / used {item.use_count}
      </div>
      <div className="action-row" style={{ marginTop: 10 }}>
        <button
          className="button secondary"
          disabled={!item.is_enabled || disablingShareId === item.id}
          type="button"
          onClick={() => void onDisableShareLink(item.id)}
        >
          {disablingShareId === item.id ? "Updating..." : "Disable"}
        </button>
      </div>
    </article>
  );
}
