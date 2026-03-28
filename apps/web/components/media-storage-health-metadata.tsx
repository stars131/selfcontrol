"use client";

import { MediaStorageHealthProviderTag } from "./media-storage-health-provider-tag";
import { MediaStorageHealthReachabilityTag } from "./media-storage-health-reachability-tag";
import { MediaStorageHealthSecretTag } from "./media-storage-health-secret-tag";
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
        {mediaStorageHealth.service_name ? (
          <span className="tag">
            {mediaStorageHealth.service_name}
            {mediaStorageHealth.service_version ? ` ${mediaStorageHealth.service_version}` : ""}
          </span>
        ) : null}
        {typeof mediaStorageHealth.response_time_ms === "number" ? (
          <span className="tag">{mediaStorageHealth.response_time_ms} ms</span>
        ) : null}
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
