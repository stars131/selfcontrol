"use client";
import type { MediaStorageHealthRefreshButtonProps } from "./media-storage-health-refresh-button.types";
export function MediaStorageHealthRefreshButton({ copy, onRefreshMediaStorageHealth, refreshingMediaStorageHealth }: MediaStorageHealthRefreshButtonProps) { return onRefreshMediaStorageHealth ? <button className="button secondary" disabled={refreshingMediaStorageHealth} type="button" onClick={() => void onRefreshMediaStorageHealth()}>{refreshingMediaStorageHealth ? copy.refreshing : copy.refreshHealth}</button> : null; }
