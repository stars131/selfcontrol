"use client";
import { readMetadataText } from "../lib/record-panel-media";
import { MediaAssetCardMetadataDetails } from "./media-asset-card-metadata-details";
import { MediaAssetCardMetadataTags } from "./media-asset-card-metadata-tags";
import type { MediaAssetCardMetadataProps } from "./media-asset-card-metadata.types";
export function MediaAssetCardMetadata({ asset, mediaIssueCopy, formatHistoryTimestampLabel }: MediaAssetCardMetadataProps) {
  const lastAttemptAt = readMetadataText(asset.metadata_json, "processing_last_attempt_at"), nextRetryAt = readMetadataText(asset.metadata_json, "processing_retry_next_attempt_at");
  return <><MediaAssetCardMetadataTags asset={asset} mediaIssueCopy={mediaIssueCopy} /><MediaAssetCardMetadataDetails asset={asset} formatHistoryTimestampLabel={formatHistoryTimestampLabel} lastAttemptAt={lastAttemptAt} mediaIssueCopy={mediaIssueCopy} nextRetryAt={nextRetryAt} /></>;
}
