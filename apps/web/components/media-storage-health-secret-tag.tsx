"use client";
import type { MediaStorageHealthSecretTagProps } from "./media-storage-health-secret-tag.types";
export function MediaStorageHealthSecretTag({ copy, formatSecretStatus, mediaStorageHealth }: MediaStorageHealthSecretTagProps) { return <span className="tag">{copy.secret} {formatSecretStatus(mediaStorageHealth.secret_status)}</span>; }
