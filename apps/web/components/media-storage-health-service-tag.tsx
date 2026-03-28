"use client";
import type { MediaStorageHealthServiceTagProps } from "./media-storage-health-service-tag.types";
export function MediaStorageHealthServiceTag({ mediaStorageHealth }: MediaStorageHealthServiceTagProps) { return mediaStorageHealth.service_name ? <span className="tag">{mediaStorageHealth.service_name}{mediaStorageHealth.service_version ? ` ${mediaStorageHealth.service_version}` : ""}</span> : null; }
