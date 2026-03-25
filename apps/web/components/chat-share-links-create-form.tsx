"use client";

import type { ChatShareLinksCreateFormProps } from "./chat-share-links-create-form.types";

export function ChatShareLinksCreateForm({
  creatingShare,
  onCreateShareLink,
  setShareMaxUses,
  setShareName,
  setSharePermission,
  shareMaxUses,
  shareName,
  sharePermission,
}: ChatShareLinksCreateFormProps) {
  return (
    <>
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
    </>
  );
}
