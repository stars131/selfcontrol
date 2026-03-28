"use client";
import type { MediaStorageHealthDownloadCapabilityCardProps } from "./media-storage-health-download-capability-card.types";
export function MediaStorageHealthDownloadCapabilityCard({ copy, mediaStorageHealth }: MediaStorageHealthDownloadCapabilityCardProps) { return <div className="subtle-card"><div className="eyebrow">{copy.download}</div><div style={{ marginTop: 8, fontWeight: 600 }}>{mediaStorageHealth.capabilities.download ? copy.available : copy.unavailable}</div></div>; }
