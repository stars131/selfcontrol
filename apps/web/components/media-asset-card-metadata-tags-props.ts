"use client";
import type { MediaAssetCardMetadataTagsProps } from "./media-asset-card-metadata-tags.types";
import type { BuildMediaAssetCardMetadataTagsPropsInput } from "./media-asset-card-metadata-tags-props.types";
export function buildMediaAssetCardMetadataTagsProps({ asset, mediaIssueCopy }: BuildMediaAssetCardMetadataTagsPropsInput): MediaAssetCardMetadataTagsProps { return { asset, mediaIssueCopy }; }
