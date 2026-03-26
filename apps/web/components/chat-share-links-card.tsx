"use client";

import { getChatShareLinksCopy } from "../lib/share-link-display";
import { useStoredLocale } from "../lib/locale";
import { ChatShareLinksCreateForm } from "./chat-share-links-create-form";
import { ChatShareLinkListItem } from "./chat-share-link-list-item";
import type { ChatShareLinksCardProps } from "./chat-share-links-card.types";

export function ChatShareLinksCard({
  creatingShare,
  disablingShareId,
  latestShareUrl,
  onCreateShareLink,
  onDisableShareLink,
  setShareMaxUses,
  setShareName,
  setSharePermission,
  shareLinks,
  shareMaxUses,
  shareName,
  sharePermission,
}: ChatShareLinksCardProps) {
  const { locale } = useStoredLocale();
  const copy = getChatShareLinksCopy(locale);

  return (
    <div className="record-card" style={{ marginBottom: 16 }}>
      <div className="eyebrow">{copy.shareLinks}</div>
      <div className="form-stack" style={{ marginTop: 12 }}>
        <ChatShareLinksCreateForm
          creatingShare={creatingShare}
          onCreateShareLink={onCreateShareLink}
          setShareMaxUses={setShareMaxUses}
          setShareName={setShareName}
          setSharePermission={setSharePermission}
          shareMaxUses={shareMaxUses}
          shareName={shareName}
          sharePermission={sharePermission}
        />
        {latestShareUrl ? (
          <article className="message assistant">
            <div className="eyebrow">{copy.latestLink}</div>
            <div style={{ marginTop: 8, wordBreak: "break-all" }}>{latestShareUrl}</div>
          </article>
        ) : null}
        <div className="record-list compact-list">
          {shareLinks.length ? (
            shareLinks.map((item) => (
              <ChatShareLinkListItem
                disablingShareId={disablingShareId}
                item={item}
                key={item.id}
                onDisableShareLink={onDisableShareLink}
              />
            ))
          ) : (
            <div className="notice">{copy.empty}</div>
          )}
        </div>
      </div>
    </div>
  );
}
