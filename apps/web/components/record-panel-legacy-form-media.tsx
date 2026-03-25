"use client";

import type { RecordPanelLegacyFormMediaProps } from "./record-panel-legacy-form-media.types";

export function RecordPanelLegacyFormMedia({
  handleUpload,
  mediaAssets,
  selectedRecord,
  uploading,
}: RecordPanelLegacyFormMediaProps) {
  if (!selectedRecord) {
    return null;
  }

  return (
    <>
      <label className="field">
        <span className="field-label">Upload attachment</span>
        <input onChange={(event) => void handleUpload(event)} type="file" />
      </label>
      {uploading ? <div className="notice">Uploading media...</div> : null}
      <div className="record-list compact-list">
        {mediaAssets.length ? (
          mediaAssets.map((asset) => (
            <article className="record-card" key={asset.id}>
              <div className="eyebrow">{asset.media_type}</div>
              <div>{asset.original_filename}</div>
              <div className="muted">{asset.mime_type}</div>
            </article>
          ))
        ) : (
          <div className="notice">No media uploaded for this record yet.</div>
        )}
      </div>
    </>
  );
}
