"use client";

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
  return (
    <div className="record-card" style={{ marginBottom: 16 }}>
      <div className="eyebrow">Share Links</div>
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
            <div className="eyebrow">Latest link</div>
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
            <div className="notice">No share links yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}
