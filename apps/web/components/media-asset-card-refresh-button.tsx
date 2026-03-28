"use client";
import type { MediaAssetCardRefreshButtonProps } from "./media-asset-card-refresh-button.types";
export function MediaAssetCardRefreshButton({ asset, mediaIssueCopy, onRefreshMedia, refreshingMediaId }: MediaAssetCardRefreshButtonProps) { return <button className="button secondary" type="button" disabled={refreshingMediaId === asset.id} onClick={() => void onRefreshMedia(asset.id)}>{refreshingMediaId === asset.id ? mediaIssueCopy.refreshing : mediaIssueCopy.refreshStatus}</button>; }
