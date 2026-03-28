"use client";

import { MediaStorageHealthDeleteCapabilityCard } from "./media-storage-health-delete-capability-card";
import { MediaStorageHealthDownloadCapabilityCard } from "./media-storage-health-download-capability-card";
import { MediaStorageHealthUploadCapabilityCard } from "./media-storage-health-upload-capability-card";
import type { MediaStorageHealthCapabilitiesProps } from "./media-storage-health-capabilities.types";

export function MediaStorageHealthCapabilities({
  copy,
  mediaStorageHealth,
}: MediaStorageHealthCapabilitiesProps) {
  return (
    <div className="detail-grid">
      <MediaStorageHealthDeleteCapabilityCard copy={copy} mediaStorageHealth={mediaStorageHealth} />
      <MediaStorageHealthUploadCapabilityCard copy={copy} mediaStorageHealth={mediaStorageHealth} />
      <MediaStorageHealthDownloadCapabilityCard copy={copy} mediaStorageHealth={mediaStorageHealth} />
    </div>
  );
}
