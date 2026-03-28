"use client";
import { MediaAssetCardDimensionsDetail } from "./media-asset-card-dimensions-detail"; import { MediaAssetCardLastAttemptDetail } from "./media-asset-card-last-attempt-detail";
import { MediaAssetCardNextRetryDetail } from "./media-asset-card-next-retry-detail"; import { MediaAssetCardTextCharCountDetail } from "./media-asset-card-text-char-count-detail"; import type { MediaAssetCardMetadataDetailsProps } from "./media-asset-card-metadata-details.types";
import { MediaAssetCardTextLineCountDetail } from "./media-asset-card-text-line-count-detail";
export function MediaAssetCardMetadataDetails({ asset, formatHistoryTimestampLabel, lastAttemptAt, mediaIssueCopy, nextRetryAt }: MediaAssetCardMetadataDetailsProps) {
  return <div className="detail-grid" style={{ marginTop: 12 }}><MediaAssetCardDimensionsDetail asset={asset} mediaIssueCopy={mediaIssueCopy} /><MediaAssetCardTextCharCountDetail asset={asset} mediaIssueCopy={mediaIssueCopy} /><MediaAssetCardTextLineCountDetail asset={asset} mediaIssueCopy={mediaIssueCopy} /><MediaAssetCardLastAttemptDetail formatHistoryTimestampLabel={formatHistoryTimestampLabel} lastAttemptAt={lastAttemptAt} mediaIssueCopy={mediaIssueCopy} /><MediaAssetCardNextRetryDetail formatHistoryTimestampLabel={formatHistoryTimestampLabel} mediaIssueCopy={mediaIssueCopy} nextRetryAt={nextRetryAt} /></div>;
}
