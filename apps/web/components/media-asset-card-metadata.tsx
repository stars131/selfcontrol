"use client";
import { buildMediaAssetCardMetadataDetailsProps } from "./media-asset-card-metadata-details-props";
import { MediaAssetCardMetadataDetails } from "./media-asset-card-metadata-details";
import { buildMediaAssetCardMetadataTagsProps } from "./media-asset-card-metadata-tags-props";
import { MediaAssetCardMetadataTags } from "./media-asset-card-metadata-tags";
import type { MediaAssetCardMetadataProps } from "./media-asset-card-metadata.types";
export function MediaAssetCardMetadata({ asset, mediaIssueCopy, formatHistoryTimestampLabel }: MediaAssetCardMetadataProps) {
  return <><MediaAssetCardMetadataTags {...buildMediaAssetCardMetadataTagsProps({ asset, mediaIssueCopy, formatHistoryTimestampLabel })} /><MediaAssetCardMetadataDetails {...buildMediaAssetCardMetadataDetailsProps({ asset, formatHistoryTimestampLabel, mediaIssueCopy })} /></>;
}
