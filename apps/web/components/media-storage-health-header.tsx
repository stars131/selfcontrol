"use client";

import { MediaStorageHealthMessage } from "./media-storage-health-message";
import { MediaStorageHealthStatusSummary } from "./media-storage-health-status-summary";
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
        <MediaStorageHealthStatusSummary copy={copy} locale={locale} mediaStorageHealth={mediaStorageHealth} />
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
