"use client";
import type { MediaStorageHealthMessageProps } from "./media-storage-health-message.types";
export function MediaStorageHealthMessage({ mediaStorageHealth }: MediaStorageHealthMessageProps) { return <div className="muted" style={{ lineHeight: 1.6 }}>{mediaStorageHealth.message}</div>; }
