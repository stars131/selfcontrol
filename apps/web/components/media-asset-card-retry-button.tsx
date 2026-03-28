"use client";
import type { MediaAssetCardRetryButtonProps } from "./media-asset-card-retry-button.types";
export function MediaAssetCardRetryButton({ asset, mediaIssueCopy, onRetryMediaProcessing, retryingMediaId }: MediaAssetCardRetryButtonProps) { return asset.processing_status !== "completed" ? <button className="button secondary" type="button" disabled={retryingMediaId === asset.id} onClick={() => void onRetryMediaProcessing(asset.id)}>{retryingMediaId === asset.id ? mediaIssueCopy.retrying : mediaIssueCopy.retry}</button> : null; }
