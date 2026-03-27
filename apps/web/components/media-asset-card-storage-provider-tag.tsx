"use client";
import { getStorageProviderLabel } from "../lib/storage-provider-display";
import type { MediaAssetCardStorageProviderTagProps } from "./media-asset-card-storage-provider-tag.types";
export function MediaAssetCardStorageProviderTag({ asset, locale }: MediaAssetCardStorageProviderTagProps) { return <span className="tag">{getStorageProviderLabel(locale, asset.storage_provider)}</span>; }
