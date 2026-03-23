"use client";

import { MediaStorageHealthCapabilities } from "./media-storage-health-capabilities";
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
      <div className="action-row" style={{ justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div className="eyebrow">{copy.storageHealth}</div>
          <div style={{ marginTop: 8, fontWeight: 600 }}>
            {mediaStorageHealth.status}
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
      <div className="muted" style={{ lineHeight: 1.6 }}>
        {mediaStorageHealth.message}
      </div>
      <div className="tag-row">
        <span className="tag">provider {mediaStorageHealth.provider_code}</span>
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
      <MediaStorageHealthCapabilities copy={copy} mediaStorageHealth={mediaStorageHealth} />
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
    </div>
  );
}
