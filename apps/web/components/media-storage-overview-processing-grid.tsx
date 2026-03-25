"use client";

import type { MediaStorageOverviewProcessingGridProps } from "./media-storage-overview-processing-grid.types";

export function MediaStorageOverviewProcessingGrid({
  localLabel,
  mediaProcessingOverview,
  needsAttentionLabel,
  processingCompletedLabel,
  queueStateLabel,
  queuedLabel,
  remoteLabel,
  storageMixLabel,
}: MediaStorageOverviewProcessingGridProps) {
  if (!mediaProcessingOverview) {
    return null;
  }

  return (
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
  );
}
