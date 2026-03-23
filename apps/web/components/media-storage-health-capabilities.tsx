"use client";

import type { MediaStorageHealthCardProps } from "./media-storage-health-card.types";

export function MediaStorageHealthCapabilities({
  copy,
  mediaStorageHealth,
}: Pick<MediaStorageHealthCardProps, "copy" | "mediaStorageHealth">) {
  return (
    <div className="detail-grid">
      <div className="subtle-card">
        <div className="eyebrow">{copy.upload}</div>
        <div style={{ marginTop: 8, fontWeight: 600 }}>
          {mediaStorageHealth.capabilities.upload ? copy.available : copy.unavailable}
        </div>
      </div>
      <div className="subtle-card">
        <div className="eyebrow">{copy.download}</div>
        <div style={{ marginTop: 8, fontWeight: 600 }}>
          {mediaStorageHealth.capabilities.download ? copy.available : copy.unavailable}
        </div>
      </div>
      <div className="subtle-card">
        <div className="eyebrow">{copy.delete}</div>
        <div style={{ marginTop: 8, fontWeight: 600 }}>
          {mediaStorageHealth.capabilities.delete ? copy.available : copy.unavailable}
        </div>
      </div>
    </div>
  );
}
