"use client";

import { useStoredLocale } from "../lib/locale";
import { getRecordPanelDetailBundle } from "../lib/record-panel-detail";
import { getRecordPanelUiBundle } from "../lib/record-panel-ui";
import { getMediaTypeLabel } from "../lib/media-type-display";
import type { RecordPanelLegacyFormMediaProps } from "./record-panel-legacy-form-media.types";

export function RecordPanelLegacyFormMedia({
  handleUpload,
  mediaAssets,
  selectedRecord,
  uploading,
}: RecordPanelLegacyFormMediaProps) {
  const { locale } = useStoredLocale(), { copy } = getRecordPanelDetailBundle(locale), { panelCopy } = getRecordPanelUiBundle(locale);
  if (!selectedRecord) {
    return null;
  }

  return (
    <>
      <label className="field">
        <span className="field-label">{panelCopy.uploadAttachment}</span>
        <input onChange={(event) => void handleUpload(event)} type="file" />
      </label>
      {uploading ? <div className="notice">{panelCopy.uploadingMedia}</div> : null}
      <div className="record-list compact-list">
        {mediaAssets.length ? (
          mediaAssets.map((asset) => (
            <article className="record-card" key={asset.id}>
              <div className="eyebrow">{getMediaTypeLabel(locale, asset.media_type)}</div>
              <div>{asset.original_filename}</div>
              <div className="muted">{asset.mime_type}</div>
            </article>
          ))
        ) : (
          <div className="notice">{copy.noMedia}</div>
        )}
      </div>
    </>
  );
}
