"use client";

import type { MediaPreviewContentProps } from "./media-preview-content.types";

export function MediaPreviewContent({
  asset,
  blobUrl,
  error,
  loading,
  previewLabel,
  previewable,
}: MediaPreviewContentProps) {
  if (!previewable) {
    return <div className="media-preview-placeholder">Preview is not available for this file type.</div>;
  }

  if (loading && !blobUrl) {
    return <div className="media-preview-placeholder">Loading preview...</div>;
  }

  if (error) {
    return <div className="notice error">{error}</div>;
  }

  if (!blobUrl) {
    return <div className="media-preview-placeholder">Preview not ready.</div>;
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
      {previewLabel ? (
        <div className="muted" style={{ marginTop: 8 }}>
          {previewLabel}
        </div>
      ) : null}
    </div>
  );
}
