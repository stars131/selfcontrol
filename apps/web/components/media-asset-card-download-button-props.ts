"use client";
import type { MediaAssetCardDownloadButtonProps } from "./media-asset-card-download-button.types";
import type { BuildMediaAssetCardDownloadButtonPropsInput } from "./media-asset-card-download-button-props.types";
export function buildMediaAssetCardDownloadButtonProps({ asset, downloadingMediaId, mediaIssueCopy, onDownloadMedia }: BuildMediaAssetCardDownloadButtonPropsInput): MediaAssetCardDownloadButtonProps { return { asset, downloadingMediaId, mediaIssueCopy, onDownloadMedia }; }
