"use client";

import type { MediaStorageOverviewUsageGridProps } from "./media-storage-overview-usage-grid.types";

export function MediaStorageOverviewUsageGrid({
  allTrackedFilesPresentLabel,
  formatFileCountLabel,
  mediaAssetCount,
  mediaStorageSummary,
  missingFilesLabel,
  selectedRecordMediaSizeLabel,
  storageHealthLabel,
  thisRecordMediaLabel,
  workspaceStorageLabel,
}: MediaStorageOverviewUsageGridProps) {
  return (
    <div className="detail-grid" style={{ marginBottom: 16 }}>
      <div className="subtle-card">
        <div className="eyebrow">{thisRecordMediaLabel}</div>
        <div style={{ marginTop: 8, fontWeight: 600 }}>
          {formatFileCountLabel(mediaAssetCount)} / {selectedRecordMediaSizeLabel}
        </div>
      </div>
      <div className="subtle-card">
        <div className="eyebrow">{workspaceStorageLabel}</div>
        <div style={{ marginTop: 8, fontWeight: 600 }}>
          {mediaStorageSummary
            ? `${formatFileCountLabel(mediaStorageSummary.total_count)} / ${mediaStorageSummary.total_size_label}`
            : "-"}
        </div>
      </div>
      <div className="subtle-card">
        <div className="eyebrow">{storageHealthLabel}</div>
        <div style={{ marginTop: 8, fontWeight: 600 }}>
          {mediaStorageSummary
            ? mediaStorageSummary.missing_file_count
              ? `${mediaStorageSummary.missing_file_count} ${missingFilesLabel}`
              : allTrackedFilesPresentLabel
            : "-"}
        </div>
      </div>
    </div>
  );
}
