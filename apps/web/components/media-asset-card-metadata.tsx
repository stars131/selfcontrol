"use client";
import { buildMediaAssetCardMetadataDetailsProps } from "./media-asset-card-metadata-details-props";
import { MediaAssetCardMetadataDetails } from "./media-asset-card-metadata-details";
import { MediaAssetCardMetadataTags } from "./media-asset-card-metadata-tags";
import type { MediaAssetCardMetadataProps } from "./media-asset-card-metadata.types";
export function MediaAssetCardMetadata({ asset, mediaIssueCopy, formatHistoryTimestampLabel }: MediaAssetCardMetadataProps) {
  return <><MediaAssetCardMetadataTags asset={asset} mediaIssueCopy={mediaIssueCopy} /><MediaAssetCardMetadataDetails {...buildMediaAssetCardMetadataDetailsProps({ asset, formatHistoryTimestampLabel, mediaIssueCopy })} /></>;
}
