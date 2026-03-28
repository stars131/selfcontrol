"use client";
import type { MediaStorageHealthUploadCapabilityCardProps } from "./media-storage-health-upload-capability-card.types";
export function MediaStorageHealthUploadCapabilityCard({ copy, mediaStorageHealth }: MediaStorageHealthUploadCapabilityCardProps) { return <div className="subtle-card"><div className="eyebrow">{copy.upload}</div><div style={{ marginTop: 8, fontWeight: 600 }}>{mediaStorageHealth.capabilities.upload ? copy.available : copy.unavailable}</div></div>; }
