"use client";

import { MediaStorageHealthProviderTag } from "./media-storage-health-provider-tag";
import { MediaStorageHealthReachabilityTag } from "./media-storage-health-reachability-tag";
import { MediaStorageHealthResponseTimeTag } from "./media-storage-health-response-time-tag";
import { MediaStorageHealthSecretTag } from "./media-storage-health-secret-tag";
import { MediaStorageHealthServiceTag } from "./media-storage-health-service-tag";
import type { MediaStorageHealthMetadataProps } from "./media-storage-health-metadata.types";

export function MediaStorageHealthMetadata({
  copy,
  formatSecretStatus,
  locale,
  mediaStorageHealth,
}: MediaStorageHealthMetadataProps) {
  return (
    <>
      <div className="tag-row">
        <MediaStorageHealthProviderTag copy={copy} locale={locale} mediaStorageHealth={mediaStorageHealth} />
        <MediaStorageHealthSecretTag copy={copy} formatSecretStatus={formatSecretStatus} mediaStorageHealth={mediaStorageHealth} />
        <MediaStorageHealthReachabilityTag copy={copy} mediaStorageHealth={mediaStorageHealth} />
        <MediaStorageHealthServiceTag mediaStorageHealth={mediaStorageHealth} />
        <MediaStorageHealthResponseTimeTag mediaStorageHealth={mediaStorageHealth} />
      </div>
      <div className="muted">
        {copy.checkedAt} {new Date(mediaStorageHealth.checked_at).toLocaleString(locale)}
      </div>
      {mediaStorageHealth.api_base_url ? (
        <div className="muted" style={{ wordBreak: "break-all" }}>
          {copy.endpointRoot}: {mediaStorageHealth.api_base_url}
        </div>
      ) : null}
      {mediaStorageHealth.warnings.length ? (
        <div className="notice">
          {mediaStorageHealth.warnings.join(" ")}
        </div>
      ) : null}
    </>
  );
}
