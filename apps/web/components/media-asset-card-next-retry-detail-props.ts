"use client";
import type { MediaAssetCardNextRetryDetailProps } from "./media-asset-card-next-retry-detail.types";
import type { BuildMediaAssetCardNextRetryDetailPropsInput } from "./media-asset-card-next-retry-detail-props.types";
export function buildMediaAssetCardNextRetryDetailProps({ formatHistoryTimestampLabel, mediaIssueCopy, nextRetryAt }: BuildMediaAssetCardNextRetryDetailPropsInput): MediaAssetCardNextRetryDetailProps { return { formatHistoryTimestampLabel, mediaIssueCopy, nextRetryAt }; }
