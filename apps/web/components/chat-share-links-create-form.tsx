"use client";

import { useStoredLocale } from "../lib/locale";
import { getChatShareLinksCopy } from "../lib/share-link-display";
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
  const { locale } = useStoredLocale();
  const copy = getChatShareLinksCopy(locale);

  return (
    <>
      <input className="input" placeholder={copy.shareNamePlaceholder} value={shareName} onChange={(event) => setShareName(event.target.value)} />
      <div className="action-row">
        <select className="input" value={sharePermission} onChange={(event) => setSharePermission(event.target.value)}>
          <option value="viewer">{copy.viewer}</option>
          <option value="editor">{copy.editor}</option>
        </select>
        <input className="input" placeholder={copy.maxUsesPlaceholder} value={shareMaxUses} onChange={(event) => setShareMaxUses(event.target.value.replace(/[^0-9]/g, ""))} />
      </div>
      <button className="button secondary" disabled={creatingShare} type="button" onClick={() => void onCreateShareLink()}>{creatingShare ? copy.creating : copy.create}</button>
    </>
  );
}
