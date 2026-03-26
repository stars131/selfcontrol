"use client";

import { useStoredLocale } from "../lib/locale";
import { getChatShareLinksCopy, getShareEnabledLabel, getSharePermissionLabel } from "../lib/share-link-display";
import type { ChatShareLinkListItemProps } from "./chat-share-link-list-item.types";

export function ChatShareLinkListItem({
  disablingShareId,
  item,
  onDisableShareLink,
}: ChatShareLinkListItemProps) {
  const { locale } = useStoredLocale();
  const copy = getChatShareLinksCopy(locale);

  return (
    <article className="message">
      <div className="eyebrow">{getSharePermissionLabel(locale, item.permission_code)} / {getShareEnabledLabel(locale, item.is_enabled)}</div>
      <div style={{ marginTop: 8, fontWeight: 600 }}>{item.name}</div>
      <div className="muted" style={{ marginTop: 8 }}>{copy.tokenHintPrefix} {item.token_hint} / {copy.usedPrefix} {item.use_count}</div>
      <div className="action-row" style={{ marginTop: 10 }}>
        <button className="button secondary" disabled={!item.is_enabled || disablingShareId === item.id} type="button" onClick={() => void onDisableShareLink(item.id)}>{disablingShareId === item.id ? copy.updating : copy.disable}</button>
      </div>
    </article>
  );
}
