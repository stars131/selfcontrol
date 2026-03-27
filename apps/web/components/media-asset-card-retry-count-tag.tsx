"use client";
import type { MediaAssetCardRetryCountTagProps } from "./media-asset-card-retry-count-tag.types";
export function MediaAssetCardRetryCountTag({ mediaIssueCopy, retryCount, retryMaxAttempts }: MediaAssetCardRetryCountTagProps) { return retryCount !== null ? <span className="tag">{mediaIssueCopy.retries} {retryCount}{retryMaxAttempts !== null ? `/${retryMaxAttempts}` : ""}</span> : null; }
