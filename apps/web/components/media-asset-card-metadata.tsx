"use client";

import { readMetadataNumber, readMetadataText } from "../lib/record-panel-media";
import { MediaAssetCardMetadataDetails } from "./media-asset-card-metadata-details";
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
      <MediaAssetCardMetadataDetails asset={asset} formatHistoryTimestampLabel={formatHistoryTimestampLabel} lastAttemptAt={lastAttemptAt} mediaIssueCopy={mediaIssueCopy} nextRetryAt={nextRetryAt} />
    </>
  );
}
