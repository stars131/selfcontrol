"use client";

import type { MediaProcessingOverview, MediaStorageSummary } from "../lib/types";

type MediaStorageOverviewProps = {
  mediaAssetCount: number;
  selectedRecordMediaSizeLabel: string;
  mediaStorageSummary: MediaStorageSummary | null;
  mediaProcessingOverview: MediaProcessingOverview | null;
  thisRecordMediaLabel: string;
  workspaceStorageLabel: string;
  storageHealthLabel: string;
  missingFilesLabel: string;
  allTrackedFilesPresentLabel: string;
  processingCompletedLabel: string;
  needsAttentionLabel: string;
  queueStateLabel: string;
  queuedLabel: string;
  storageMixLabel: string;
  localLabel: string;
  remoteLabel: string;
  formatFileCountLabel: (count: number) => string;
};

export function MediaStorageOverview({
  mediaAssetCount,
  selectedRecordMediaSizeLabel,
  mediaStorageSummary,
  mediaProcessingOverview,
  thisRecordMediaLabel,
  workspaceStorageLabel,
  storageHealthLabel,
  missingFilesLabel,
  allTrackedFilesPresentLabel,
  processingCompletedLabel,
  needsAttentionLabel,
  queueStateLabel,
  queuedLabel,
  storageMixLabel,
  localLabel,
  remoteLabel,
  formatFileCountLabel,
}: MediaStorageOverviewProps) {
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
        <>
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
          <div className="tag-row" style={{ marginBottom: 16 }}>
            {Object.entries(mediaProcessingOverview.by_storage_provider).map(([providerCode, count]) => (
              <span className="tag" key={providerCode}>
                {providerCode}: {count}
              </span>
            ))}
          </div>
        </>
      ) : null}
    </>
  );
}
