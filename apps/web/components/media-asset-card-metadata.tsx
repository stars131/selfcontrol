"use client";

import { readMetadataNumber, readMetadataText } from "../lib/record-panel-media";
import { MediaAssetCardMetadataTags } from "./media-asset-card-metadata-tags";
import type { MediaAssetCardMetadataProps } from "./media-asset-card-metadata.types";

export function MediaAssetCardMetadata({
  asset,
  mediaIssueCopy,
  formatHistoryTimestampLabel,
}: MediaAssetCardMetadataProps) {
  const extractionMode = readMetadataText(asset.metadata_json, "extraction_mode");
  const processingSource = readMetadataText(asset.metadata_json, "processing_source");
  const lastAttemptAt = readMetadataText(asset.metadata_json, "processing_last_attempt_at");
  const remoteFetchStatus = readMetadataText(asset.metadata_json, "remote_fetch_status");
  const retryState = readMetadataText(asset.metadata_json, "processing_retry_state");
  const retryCount = readMetadataNumber(asset.metadata_json, "processing_retry_count");
  const retryMaxAttempts = readMetadataNumber(asset.metadata_json, "processing_retry_max_attempts");
  const nextRetryAt = readMetadataText(asset.metadata_json, "processing_retry_next_attempt_at");

  return (
    <>
      <MediaAssetCardMetadataTags asset={asset} mediaIssueCopy={mediaIssueCopy} />
      <div className="detail-grid" style={{ marginTop: 12 }}>
        {typeof asset.metadata_json.width === "number" && typeof asset.metadata_json.height === "number" ? (
          <div className="subtle-card">
            <div className="eyebrow">{mediaIssueCopy.dimensions}</div>
            <div style={{ marginTop: 8, fontWeight: 600 }}>
              {asset.metadata_json.width} x {asset.metadata_json.height}
            </div>
          </div>
        ) : null}
        {typeof asset.metadata_json.text_char_count === "number" ? (
          <div className="subtle-card">
            <div className="eyebrow">{mediaIssueCopy.textChars}</div>
            <div style={{ marginTop: 8, fontWeight: 600 }}>
              {asset.metadata_json.text_char_count}
            </div>
          </div>
        ) : null}
        {typeof asset.metadata_json.text_line_count === "number" ? (
          <div className="subtle-card">
            <div className="eyebrow">{mediaIssueCopy.textLines}</div>
            <div style={{ marginTop: 8, fontWeight: 600 }}>
              {asset.metadata_json.text_line_count}
            </div>
          </div>
        ) : null}
        {lastAttemptAt ? (
          <div className="subtle-card">
            <div className="eyebrow">{mediaIssueCopy.lastAttempt}</div>
            <div style={{ marginTop: 8, fontWeight: 600 }}>{formatHistoryTimestampLabel(lastAttemptAt)}</div>
          </div>
        ) : null}
        {nextRetryAt ? (
          <div className="subtle-card">
            <div className="eyebrow">{mediaIssueCopy.nextRetry}</div>
            <div style={{ marginTop: 8, fontWeight: 600 }}>{formatHistoryTimestampLabel(nextRetryAt)}</div>
          </div>
        ) : null}
      </div>
    </>
  );
}
