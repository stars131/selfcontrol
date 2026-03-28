"use client";
import type { MediaStorageHealthDeleteCapabilityCardProps } from "./media-storage-health-delete-capability-card.types";
export function MediaStorageHealthDeleteCapabilityCard({ copy, mediaStorageHealth }: MediaStorageHealthDeleteCapabilityCardProps) { return <div className="subtle-card"><div className="eyebrow">{copy.delete}</div><div style={{ marginTop: 8, fontWeight: 600 }}>{mediaStorageHealth.capabilities.delete ? copy.available : copy.unavailable}</div></div>; }
