"use client";
import type { MediaAssetCardRefreshButtonProps } from "./media-asset-card-refresh-button.types";
import type { BuildMediaAssetCardRefreshButtonPropsInput } from "./media-asset-card-refresh-button-props.types";
export function buildMediaAssetCardRefreshButtonProps({ asset, mediaIssueCopy, onRefreshMedia, refreshingMediaId }: BuildMediaAssetCardRefreshButtonPropsInput): MediaAssetCardRefreshButtonProps { return { asset, mediaIssueCopy, onRefreshMedia, refreshingMediaId }; }
