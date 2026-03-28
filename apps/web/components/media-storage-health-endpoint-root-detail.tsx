"use client";
import type { MediaStorageHealthEndpointRootDetailProps } from "./media-storage-health-endpoint-root-detail.types";
export function MediaStorageHealthEndpointRootDetail({ copy, mediaStorageHealth }: MediaStorageHealthEndpointRootDetailProps) { return mediaStorageHealth.api_base_url ? <div className="muted" style={{ wordBreak: "break-all" }}>{copy.endpointRoot}: {mediaStorageHealth.api_base_url}</div> : null; }
