"use client";
import { getMediaStorageHealthStatusLabel } from "../lib/media-storage-health-display";
import type { MediaStorageHealthStatusSummaryProps } from "./media-storage-health-status-summary.types";
export function MediaStorageHealthStatusSummary({ copy, locale, mediaStorageHealth }: MediaStorageHealthStatusSummaryProps) { return <div><div className="eyebrow">{copy.storageHealth}</div><div style={{ marginTop: 8, fontWeight: 600 }}>{getMediaStorageHealthStatusLabel(locale, mediaStorageHealth.status)}</div></div>; }
