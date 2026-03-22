"use client";

import type { SharePreview } from "../lib/types";

type WorkspaceJoinCopy = {
  joinEyebrow: string;
  joinTitle: string;
  sharePlaceholder: string;
  previewShare: string;
  joinWorkspace: string;
};

export function WorkspaceJoinSection({
  copy,
  shareTokenInput,
  previewing,
  joining,
  sharePreview,
  onShareTokenInputChange,
  onPreviewShare,
  onAcceptShare,
}: {
  copy: WorkspaceJoinCopy;
  shareTokenInput: string;
  previewing: boolean;
  joining: boolean;
  sharePreview: SharePreview | null;
  onShareTokenInputChange: (value: string) => void;
  onPreviewShare: () => Promise<void>;
  onAcceptShare: () => Promise<void>;
}) {
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
            <div className="eyebrow">{sharePreview.permission_code}</div>
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
