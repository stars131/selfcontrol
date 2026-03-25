"use client";

import { MediaStorageOverviewProcessingGrid } from "./media-storage-overview-processing-grid";
import { MediaStorageOverviewUsageGrid } from "./media-storage-overview-usage-grid";
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
      <MediaStorageOverviewUsageGrid
        allTrackedFilesPresentLabel={allTrackedFilesPresentLabel}
        formatFileCountLabel={formatFileCountLabel}
        mediaAssetCount={mediaAssetCount}
        mediaStorageSummary={mediaStorageSummary}
        missingFilesLabel={missingFilesLabel}
        selectedRecordMediaSizeLabel={selectedRecordMediaSizeLabel}
        storageHealthLabel={storageHealthLabel}
        thisRecordMediaLabel={thisRecordMediaLabel}
        workspaceStorageLabel={workspaceStorageLabel}
      />
      <MediaStorageOverviewProcessingGrid
        localLabel={localLabel}
        mediaProcessingOverview={mediaProcessingOverview}
        needsAttentionLabel={needsAttentionLabel}
        processingCompletedLabel={processingCompletedLabel}
        queueStateLabel={queueStateLabel}
        queuedLabel={queuedLabel}
        remoteLabel={remoteLabel}
        storageMixLabel={storageMixLabel}
      />
    </>
  );
}
