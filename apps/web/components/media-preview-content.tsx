"use client";

import { useStoredLocale } from "../lib/locale";
import { getRecordPanelUiBundle } from "../lib/record-panel-ui";
import type { MediaPreviewContentProps } from "./media-preview-content.types";

export function MediaPreviewContent({
  asset,
  blobUrl,
  error,
  loading,
  previewLabel,
  previewable,
}: MediaPreviewContentProps) {
  const { locale } = useStoredLocale(), { panelCopy } = getRecordPanelUiBundle(locale);
  if (!previewable) {
    return <div className="media-preview-placeholder">{panelCopy.previewUnavailable}</div>;
  }

  if (loading && !blobUrl) {
    return <div className="media-preview-placeholder">{panelCopy.previewLoading}</div>;
  }

  if (error) {
    return <div className="notice error">{error}</div>;
  }

  if (!blobUrl) {
    return <div className="media-preview-placeholder">{panelCopy.previewNotReady}</div>;
  }

  return (
    <div className="media-preview-shell">
      {asset.media_type === "image" ? (
        <img alt={asset.original_filename} className="media-preview-image" src={blobUrl} />
      ) : null}
      {asset.media_type === "audio" ? (
        <audio className="media-preview-player" controls preload="metadata" src={blobUrl} />
      ) : null}
      {asset.media_type === "video" ? (
        <video className="media-preview-video" controls preload="metadata" src={blobUrl} />
      ) : null}
      {previewLabel ? <div className="muted" style={{ marginTop: 8 }}>{previewLabel}</div> : null}
    </div>
  );
}
