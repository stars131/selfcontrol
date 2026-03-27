"use client";

import { MediaStorageHealthCapabilities } from "./media-storage-health-capabilities";
import { MediaStorageHealthHeader } from "./media-storage-health-header";
import { MediaStorageHealthMetadata } from "./media-storage-health-metadata";
import type { MediaStorageHealthCardProps } from "./media-storage-health-card.types";

export function MediaStorageHealthCard({
  copy,
  locale,
  mediaStorageHealth,
  refreshingMediaStorageHealth,
  highlightedAnchor,
  onRefreshMediaStorageHealth,
  formatSecretStatus,
  readAnchorHighlightClass,
}: MediaStorageHealthCardProps) {
  return (
    <div
      className={`record-card form-stack${readAnchorHighlightClass("provider-media_storage-health", highlightedAnchor)}`}
      id="provider-media_storage-health"
      style={{ marginTop: 12 }}
    >
      <MediaStorageHealthHeader
        copy={copy}
        locale={locale}
        mediaStorageHealth={mediaStorageHealth}
        onRefreshMediaStorageHealth={onRefreshMediaStorageHealth}
        refreshingMediaStorageHealth={refreshingMediaStorageHealth}
      />
      <MediaStorageHealthCapabilities copy={copy} mediaStorageHealth={mediaStorageHealth} />
      <MediaStorageHealthMetadata
        copy={copy}
        formatSecretStatus={formatSecretStatus}
        locale={locale}
        mediaStorageHealth={mediaStorageHealth}
      />
    </div>
  );
}
