"use client";

import { useStoredLocale } from "../lib/locale";
import { getChatPanelDisplayCopy } from "./chat-panel-display-copy";
import type { ChatPanelComposerProps } from "./chat-panel-composer.types";

export function ChatPanelComposer({
  canWriteWorkspace,
  draft,
  error,
  loading,
  setDraft,
  onSend,
}: ChatPanelComposerProps) {
  const { locale } = useStoredLocale();
  const copy = getChatPanelDisplayCopy(locale);

  return (
    <div className="composer">
      <textarea
        className="textarea"
        disabled={!canWriteWorkspace}
        placeholder={
          canWriteWorkspace
            ? copy.composerPlaceholder
            : copy.composerViewerPlaceholder
        }
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
      />
      {error ? <div className="notice error">{error}</div> : null}
      <button className="button" type="button" onClick={onSend} disabled={loading || !canWriteWorkspace}>
        {loading ? copy.workingLabel : copy.sendLabel}
      </button>
    </div>
  );
}
