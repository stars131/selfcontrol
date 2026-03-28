"use client";
import { readMediaAssetCardMetadataDetailTiming } from "./media-asset-card-metadata-detail-timing";
import { MediaAssetCardMetadataDetails } from "./media-asset-card-metadata-details";
import { MediaAssetCardMetadataTags } from "./media-asset-card-metadata-tags";
import type { MediaAssetCardMetadataProps } from "./media-asset-card-metadata.types";
export function MediaAssetCardMetadata({ asset, mediaIssueCopy, formatHistoryTimestampLabel }: MediaAssetCardMetadataProps) {
  const { lastAttemptAt, nextRetryAt } = readMediaAssetCardMetadataDetailTiming({ asset });
  return <><MediaAssetCardMetadataTags asset={asset} mediaIssueCopy={mediaIssueCopy} /><MediaAssetCardMetadataDetails asset={asset} formatHistoryTimestampLabel={formatHistoryTimestampLabel} lastAttemptAt={lastAttemptAt} mediaIssueCopy={mediaIssueCopy} nextRetryAt={nextRetryAt} /></>;
}
