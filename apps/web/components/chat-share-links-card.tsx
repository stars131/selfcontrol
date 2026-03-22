"use client";

import type { ShareLinkItem } from "../lib/types";

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
}: {
  creatingShare: boolean;
  disablingShareId: string;
  latestShareUrl: string;
  onCreateShareLink: () => Promise<void>;
  onDisableShareLink: (shareLinkId: string) => Promise<void>;
  setShareMaxUses: (value: string) => void;
  setShareName: (value: string) => void;
  setSharePermission: (value: string) => void;
  shareLinks: ShareLinkItem[];
  shareMaxUses: string;
  shareName: string;
  sharePermission: string;
}) {
  return (
    <div className="record-card" style={{ marginBottom: 16 }}>
      <div className="eyebrow">Share Links</div>
      <div className="form-stack" style={{ marginTop: 12 }}>
        <input
          className="input"
          placeholder="Share name"
          value={shareName}
          onChange={(event) => setShareName(event.target.value)}
        />
        <div className="action-row">
          <select
            className="input"
            value={sharePermission}
            onChange={(event) => setSharePermission(event.target.value)}
          >
            <option value="viewer">viewer</option>
            <option value="editor">editor</option>
          </select>
          <input
            className="input"
            placeholder="Max uses"
            value={shareMaxUses}
            onChange={(event) => setShareMaxUses(event.target.value.replace(/[^0-9]/g, ""))}
          />
        </div>
        <button
          className="button secondary"
          disabled={creatingShare}
          type="button"
          onClick={() => void onCreateShareLink()}
        >
          {creatingShare ? "Creating..." : "Create share link"}
        </button>
        {latestShareUrl ? (
          <article className="message assistant">
            <div className="eyebrow">Latest link</div>
            <div style={{ marginTop: 8, wordBreak: "break-all" }}>{latestShareUrl}</div>
          </article>
        ) : null}
        <div className="record-list compact-list">
          {shareLinks.length ? (
            shareLinks.map((item) => (
              <article className="message" key={item.id}>
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
            ))
          ) : (
            <div className="notice">No share links yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}
