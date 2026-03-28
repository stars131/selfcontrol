"use client";

import { MediaStorageHealthMessage } from "./media-storage-health-message";
import { MediaStorageHealthRefreshButton } from "./media-storage-health-refresh-button";
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
        <MediaStorageHealthRefreshButton
          copy={copy}
          onRefreshMediaStorageHealth={onRefreshMediaStorageHealth}
          refreshingMediaStorageHealth={refreshingMediaStorageHealth}
        />
      </div>
      <MediaStorageHealthMessage mediaStorageHealth={mediaStorageHealth} />
    </>
  );
}
