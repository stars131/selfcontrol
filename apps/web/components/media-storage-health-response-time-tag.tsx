"use client";
import type { MediaStorageHealthResponseTimeTagProps } from "./media-storage-health-response-time-tag.types";
export function MediaStorageHealthResponseTimeTag({ mediaStorageHealth }: MediaStorageHealthResponseTimeTagProps) { return typeof mediaStorageHealth.response_time_ms === "number" ? <span className="tag">{mediaStorageHealth.response_time_ms} ms</span> : null; }
