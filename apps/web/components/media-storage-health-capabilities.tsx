"use client";

import { MediaStorageHealthDownloadCapabilityCard } from "./media-storage-health-download-capability-card";
import { MediaStorageHealthUploadCapabilityCard } from "./media-storage-health-upload-capability-card";
import type { MediaStorageHealthCapabilitiesProps } from "./media-storage-health-capabilities.types";

export function MediaStorageHealthCapabilities({
  copy,
  mediaStorageHealth,
}: MediaStorageHealthCapabilitiesProps) {
  return (
    <div className="detail-grid">
      <MediaStorageHealthUploadCapabilityCard copy={copy} mediaStorageHealth={mediaStorageHealth} />
      <MediaStorageHealthDownloadCapabilityCard copy={copy} mediaStorageHealth={mediaStorageHealth} />
      <div className="subtle-card">
        <div className="eyebrow">{copy.delete}</div>
        <div style={{ marginTop: 8, fontWeight: 600 }}>
          {mediaStorageHealth.capabilities.delete ? copy.available : copy.unavailable}
        </div>
      </div>
    </div>
  );
}
