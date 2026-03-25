"use client";

import type { MediaStorageOverviewSummaryProps } from "./media-storage-overview-summary.types";

export function MediaStorageOverviewSummary({
  allTrackedFilesPresentLabel,
  formatFileCountLabel,
  mediaAssetCount,
  mediaProcessingOverview,
  mediaStorageSummary,
  missingFilesLabel,
  needsAttentionLabel,
  processingCompletedLabel,
  queueStateLabel,
  queuedLabel,
  remoteLabel,
  selectedRecordMediaSizeLabel,
  storageHealthLabel,
  storageMixLabel,
  thisRecordMediaLabel,
  workspaceStorageLabel,
  localLabel,
}: MediaStorageOverviewSummaryProps) {
  return (
    <>
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
      {mediaProcessingOverview ? (
        <div className="detail-grid" style={{ marginBottom: 16 }}>
          <div className="subtle-card">
            <div className="eyebrow">{processingCompletedLabel}</div>
            <div style={{ marginTop: 8, fontWeight: 600 }}>
              {mediaProcessingOverview.completed_count}/{mediaProcessingOverview.total_count}
            </div>
          </div>
          <div className="subtle-card">
            <div className="eyebrow">{needsAttentionLabel}</div>
            <div style={{ marginTop: 8, fontWeight: 600 }}>
              {mediaProcessingOverview.failed_count + mediaProcessingOverview.deferred_count}
            </div>
          </div>
          <div className="subtle-card">
            <div className="eyebrow">{queueStateLabel}</div>
            <div style={{ marginTop: 8, fontWeight: 600 }}>
              {mediaProcessingOverview.pending_count + mediaProcessingOverview.processing_count} {queuedLabel}
            </div>
          </div>
          <div className="subtle-card">
            <div className="eyebrow">{storageMixLabel}</div>
            <div style={{ marginTop: 8, fontWeight: 600 }}>
              {mediaProcessingOverview.local_item_count} {localLabel} / {mediaProcessingOverview.remote_item_count} {remoteLabel}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
