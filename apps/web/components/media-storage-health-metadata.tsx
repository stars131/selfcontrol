"use client";

import { getStorageProviderLabel } from "../lib/storage-provider-display";
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
        <span className="tag">provider {getStorageProviderLabel(locale, mediaStorageHealth.provider_code)}</span>
        <span className="tag">{copy.secret} {formatSecretStatus(mediaStorageHealth.secret_status)}</span>
        {typeof mediaStorageHealth.reachable === "boolean" ? (
          <span className="tag">
            {mediaStorageHealth.reachable ? copy.reachable : copy.unreachable}
          </span>
        ) : null}
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
