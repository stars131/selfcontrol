"use client";
import type { MediaStorageHealthWarningsNoticeProps } from "./media-storage-health-warnings-notice.types";
export function MediaStorageHealthWarningsNotice({ mediaStorageHealth }: MediaStorageHealthWarningsNoticeProps) { return mediaStorageHealth.warnings.length ? <div className="notice">{mediaStorageHealth.warnings.join(" ")}</div> : null; }
