"use client";
import { getStorageProviderLabel } from "../lib/storage-provider-display";
import type { MediaStorageHealthProviderTagProps } from "./media-storage-health-provider-tag.types";
export function MediaStorageHealthProviderTag({ copy, locale, mediaStorageHealth }: MediaStorageHealthProviderTagProps) { return <span className="tag">{copy.provider} {getStorageProviderLabel(locale, mediaStorageHealth.provider_code)}</span>; }
