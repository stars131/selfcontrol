"use client";

import { MediaAssetSection } from "./media-asset-section";
import { MediaStorageOverview } from "./media-storage-overview";
import { RecordMediaProcessingPanels } from "./record-media-processing-panels";
import type { RecordMediaToolsProps } from "./record-media-tools.types";

type RecordMediaSelectedContentProps = Pick<
  RecordMediaToolsProps,
  | "allTrackedFilesPresentLabel"
  | "authToken"
  | "bulkRetryingDeadLetter"
  | "canWriteWorkspace"
  | "deletingMediaId"
  | "downloadingMediaId"
  | "formatFileCountLabel"
  | "formatHistoryTimestampLabel"
  | "largestFilePrefixLabel"
  | "locale"
  | "localLabel"
  | "mediaAssets"
  | "mediaDeadLetterOverview"
  | "mediaIssueCopy"
  | "mediaProcessingOverview"
  | "mediaStorageSummary"
  | "missingFilesLabel"
  | "needsAttentionLabel"
  | "noMediaLabel"
  | "onBulkRetryAllDeadLetter"
  | "onBulkRetrySelectedDeadLetter"
  | "onClearDeadLetterSelection"
  | "onDeleteMediaAsset"
  | "onDownloadMedia"
  | "onRefreshMedia"
  | "onRetryMediaProcessing"
  | "onSelectAllDeadLetter"
  | "onToggleDeadLetterSelection"
  | "processingCompletedLabel"
  | "queuedLabel"
  | "queueStateLabel"
  | "refreshingMediaId"
  | "remoteLabel"
  | "retryingMediaId"
  | "selectedDeadLetterIds"
  | "selectedRecordMediaSizeLabel"
  | "storageHealthLabel"
  | "storageMixLabel"
  | "thisRecordMediaLabel"
  | "workspaceId"
  | "workspaceStorageLabel"
>;

export function RecordMediaSelectedContent({
  allTrackedFilesPresentLabel,
  authToken,
  bulkRetryingDeadLetter,
  canWriteWorkspace,
  deletingMediaId,
  downloadingMediaId,
  formatFileCountLabel,
  formatHistoryTimestampLabel,
  largestFilePrefixLabel,
  locale,
  localLabel,
  mediaAssets,
  mediaDeadLetterOverview,
  mediaIssueCopy,
  mediaProcessingOverview,
  mediaStorageSummary,
  missingFilesLabel,
  needsAttentionLabel,
  noMediaLabel,
  onBulkRetryAllDeadLetter,
  onBulkRetrySelectedDeadLetter,
  onClearDeadLetterSelection,
  onDeleteMediaAsset,
  onDownloadMedia,
  onRefreshMedia,
  onRetryMediaProcessing,
  onSelectAllDeadLetter,
  onToggleDeadLetterSelection,
  processingCompletedLabel,
  queuedLabel,
  queueStateLabel,
  refreshingMediaId,
  remoteLabel,
  retryingMediaId,
  selectedDeadLetterIds,
  selectedRecordMediaSizeLabel,
  storageHealthLabel,
  storageMixLabel,
  thisRecordMediaLabel,
  workspaceId,
  workspaceStorageLabel,
}: RecordMediaSelectedContentProps) {
  return (
    <>
      <MediaStorageOverview
        allTrackedFilesPresentLabel={allTrackedFilesPresentLabel}
        formatFileCountLabel={formatFileCountLabel}
        localLabel={localLabel}
        mediaAssetCount={mediaAssets.length}
        mediaProcessingOverview={mediaProcessingOverview}
        mediaStorageSummary={mediaStorageSummary}
        missingFilesLabel={missingFilesLabel}
        needsAttentionLabel={needsAttentionLabel}
        processingCompletedLabel={processingCompletedLabel}
        queuedLabel={queuedLabel}
        queueStateLabel={queueStateLabel}
        remoteLabel={remoteLabel}
        selectedRecordMediaSizeLabel={selectedRecordMediaSizeLabel}
        storageHealthLabel={storageHealthLabel}
        storageMixLabel={storageMixLabel}
        thisRecordMediaLabel={thisRecordMediaLabel}
        workspaceStorageLabel={workspaceStorageLabel}
      />
      <RecordMediaProcessingPanels
        bulkRetryingDeadLetter={bulkRetryingDeadLetter}
        canWriteWorkspace={canWriteWorkspace}
        formatHistoryTimestampLabel={formatHistoryTimestampLabel}
        locale={locale}
        mediaDeadLetterOverview={mediaDeadLetterOverview}
        mediaIssueCopy={mediaIssueCopy}
        mediaProcessingOverview={mediaProcessingOverview}
        onBulkRetryAllDeadLetter={onBulkRetryAllDeadLetter}
        onBulkRetrySelectedDeadLetter={onBulkRetrySelectedDeadLetter}
        onClearDeadLetterSelection={onClearDeadLetterSelection}
        onRetryMediaProcessing={onRetryMediaProcessing}
        onSelectAllDeadLetter={onSelectAllDeadLetter}
        onToggleDeadLetterSelection={onToggleDeadLetterSelection}
        retryingMediaId={retryingMediaId}
        selectedDeadLetterIds={selectedDeadLetterIds}
        workspaceId={workspaceId}
      />
      <MediaAssetSection
        authToken={authToken}
        canWriteWorkspace={canWriteWorkspace}
        deletingMediaId={deletingMediaId}
        downloadingMediaId={downloadingMediaId}
        formatHistoryTimestampLabel={formatHistoryTimestampLabel}
        largestFilePrefixLabel={largestFilePrefixLabel}
        largestItemName={mediaStorageSummary?.largest_item_name ?? null}
        largestItemSizeLabel={mediaStorageSummary?.largest_item_size_label ?? null}
        mediaAssets={mediaAssets}
        mediaIssueCopy={mediaIssueCopy}
        noMediaLabel={noMediaLabel}
        onDeleteMediaAsset={onDeleteMediaAsset}
        onDownloadMedia={onDownloadMedia}
        onRefreshMedia={onRefreshMedia}
        onRetryMediaProcessing={onRetryMediaProcessing}
        refreshingMediaId={refreshingMediaId}
        retryingMediaId={retryingMediaId}
        workspaceId={workspaceId}
      />
    </>
  );
}
