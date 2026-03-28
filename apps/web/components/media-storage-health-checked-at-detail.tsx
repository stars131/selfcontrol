"use client";
import type { MediaStorageHealthCheckedAtDetailProps } from "./media-storage-health-checked-at-detail.types";
export function MediaStorageHealthCheckedAtDetail({ copy, locale, mediaStorageHealth }: MediaStorageHealthCheckedAtDetailProps) { return <div className="muted">{copy.checkedAt} {new Date(mediaStorageHealth.checked_at).toLocaleString(locale)}</div>; }
