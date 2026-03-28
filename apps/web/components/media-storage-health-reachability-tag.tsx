"use client";
import type { MediaStorageHealthReachabilityTagProps } from "./media-storage-health-reachability-tag.types";
export function MediaStorageHealthReachabilityTag({ copy, mediaStorageHealth }: MediaStorageHealthReachabilityTagProps) { return typeof mediaStorageHealth.reachable === "boolean" ? <span className="tag">{mediaStorageHealth.reachable ? copy.reachable : copy.unreachable}</span> : null; }
