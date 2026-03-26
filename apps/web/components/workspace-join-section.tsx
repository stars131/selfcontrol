"use client";

import { useStoredLocale } from "../lib/locale";
import { getSharePermissionLabel } from "../lib/share-link-display";
import type { WorkspaceJoinSectionProps } from "./workspace-join-section.types";

export function WorkspaceJoinSection({
  copy,
  shareTokenInput,
  previewing,
  joining,
  sharePreview,
  onShareTokenInputChange,
  onPreviewShare,
  onAcceptShare,
}: WorkspaceJoinSectionProps) {
  const { locale } = useStoredLocale();

  return (
    <section className="record-card">
      <div className="eyebrow">{copy.joinEyebrow}</div>
      <h2 style={{ margin: "8px 0 12px" }}>{copy.joinTitle}</h2>
      <div className="form-stack">
        <input
          className="input"
          placeholder={copy.sharePlaceholder}
          value={shareTokenInput}
          onChange={(event) => onShareTokenInputChange(event.target.value)}
        />
        <div className="action-row">
          <button
            className="button secondary"
            type="button"
            disabled={previewing}
            onClick={() => void onPreviewShare()}
          >
            {previewing ? `${copy.previewShare}...` : copy.previewShare}
          </button>
          <button
            className="button"
            type="button"
            disabled={joining || !sharePreview}
            onClick={() => void onAcceptShare()}
          >
            {joining ? `${copy.joinWorkspace}...` : copy.joinWorkspace}
          </button>
        </div>
        {sharePreview ? (
          <article className="message assistant">
            <div className="eyebrow">{getSharePermissionLabel(locale, sharePreview.permission_code)}</div>
            <div style={{ marginTop: 8, fontWeight: 600 }}>{sharePreview.workspace_name}</div>
            <div style={{ marginTop: 8 }}>{sharePreview.name}</div>
            <div className="muted" style={{ marginTop: 8 }}>
              {sharePreview.workspace_slug}
            </div>
          </article>
        ) : null}
      </div>
    </section>
  );
}
