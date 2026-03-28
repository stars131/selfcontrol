"use client";
import type { MediaAssetCardRetryButtonProps } from "./media-asset-card-retry-button.types";
import type { BuildMediaAssetCardRetryButtonPropsInput } from "./media-asset-card-retry-button-props.types";
export function buildMediaAssetCardRetryButtonProps({ asset, mediaIssueCopy, onRetryMediaProcessing, retryingMediaId }: BuildMediaAssetCardRetryButtonPropsInput): MediaAssetCardRetryButtonProps { return { asset, mediaIssueCopy, onRetryMediaProcessing, retryingMediaId }; }
