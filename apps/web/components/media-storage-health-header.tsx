"use client";

import { getMediaStorageHealthStatusLabel } from "../lib/media-storage-health-display";
import { MediaStorageHealthMessage } from "./media-storage-health-message";
import type { MediaStorageHealthHeaderProps } from "./media-storage-health-header.types";

export function MediaStorageHealthHeader({
  copy,
  locale,
  mediaStorageHealth,
  onRefreshMediaStorageHealth,
  refreshingMediaStorageHealth,
}: MediaStorageHealthHeaderProps) {
  return (
    <>
      <div className="action-row" style={{ justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div className="eyebrow">{copy.storageHealth}</div>
          <div style={{ marginTop: 8, fontWeight: 600 }}>
            {getMediaStorageHealthStatusLabel(locale, mediaStorageHealth.status)}
          </div>
        </div>
        {onRefreshMediaStorageHealth ? (
          <button
            className="button secondary"
            disabled={refreshingMediaStorageHealth}
            type="button"
            onClick={() => void onRefreshMediaStorageHealth()}
          >
            {refreshingMediaStorageHealth ? copy.refreshing : copy.refreshHealth}
          </button>
        ) : null}
      </div>
      <MediaStorageHealthMessage mediaStorageHealth={mediaStorageHealth} />
    </>
  );
}
