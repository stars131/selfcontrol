"use client";

import { DeadLetterRecoveryPanel } from "./dead-letter-recovery-panel";
import { MediaAssetSection } from "./media-asset-section";
import { MediaStorageOverview } from "./media-storage-overview";
import { RecentMediaIssuesPanel } from "./recent-media-issues-panel";
import type { RecordMediaToolsProps } from "./record-media-tools.types";

export function RecordMediaTools({
  authToken,
  canWriteWorkspace,
  hasSelectedRecord,
  workspaceId,
  locale,
  error,
  saving,
  deleting,
  uploading,
  saveButtonLabel,
  deleteButtonLabel,
  uploadAttachmentLabel,
  uploadingMediaLabel,
  allTrackedFilesPresentLabel,
  localLabel,
  missingFilesLabel,
  needsAttentionLabel,
  processingCompletedLabel,
  queuedLabel,
  queueStateLabel,
  remoteLabel,
  storageHealthLabel,
  storageMixLabel,
  thisRecordMediaLabel,
  workspaceStorageLabel,
  selectedRecordMediaSizeLabel,
  largestFilePrefixLabel,
  noMediaLabel,
  mediaIssueCopy,
  mediaAssets,
  mediaDeadLetterOverview,
  mediaProcessingOverview,
  mediaStorageSummary,
  downloadingMediaId,
  refreshingMediaId,
  retryingMediaId,
  deletingMediaId,
  bulkRetryingDeadLetter,
  selectedDeadLetterIds,
  formatFileCountLabel,
  formatHistoryTimestampLabel,
  onDelete,
  onUpload,
  onDeleteMediaAsset,
  onDownloadMedia,
  onRefreshMedia,
  onRetryMediaProcessing,
  onSelectAllDeadLetter,
  onClearDeadLetterSelection,
  onBulkRetrySelectedDeadLetter,
  onBulkRetryAllDeadLetter,
  onToggleDeadLetterSelection,
}: RecordMediaToolsProps) {
  return (
    <>
      {error ? <div className="notice error">{error}</div> : null}
      <div className="action-row">
        <button className="button" disabled={saving || !canWriteWorkspace} type="submit">
          {saveButtonLabel}
        </button>
        {hasSelectedRecord ? (
          <button className="button secondary" disabled={deleting || !canWriteWorkspace} onClick={onDelete} type="button">
            {deleteButtonLabel}
          </button>
        ) : null}
      </div>
      {hasSelectedRecord ? (
        <>
          <label className="field">
            <span className="field-label">{uploadAttachmentLabel}</span>
            <input disabled={!canWriteWorkspace} onChange={onUpload} type="file" />
          </label>
          {uploading ? <div className="notice">{uploadingMediaLabel}</div> : null}
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
          {mediaProcessingOverview ? (
            <>
              <RecentMediaIssuesPanel
                canWriteWorkspace={canWriteWorkspace}
                formatHistoryTimestampLabel={formatHistoryTimestampLabel}
                locale={locale}
                mediaIssueCopy={mediaIssueCopy}
                mediaProcessingOverview={mediaProcessingOverview}
                onRetryMediaProcessing={onRetryMediaProcessing}
                retryingMediaId={retryingMediaId}
                workspaceId={workspaceId}
              />
              <DeadLetterRecoveryPanel
                bulkRetryingDeadLetter={bulkRetryingDeadLetter}
                canWriteWorkspace={canWriteWorkspace}
                formatHistoryTimestampLabel={formatHistoryTimestampLabel}
                locale={locale}
                mediaDeadLetterOverview={mediaDeadLetterOverview}
                mediaIssueCopy={mediaIssueCopy}
                onBulkRetryAll={onBulkRetryAllDeadLetter}
                onBulkRetrySelected={onBulkRetrySelectedDeadLetter}
                onClearSelection={onClearDeadLetterSelection}
                onRetryMediaProcessing={onRetryMediaProcessing}
                onSelectAll={onSelectAllDeadLetter}
                onToggleSelection={onToggleDeadLetterSelection}
                retryingMediaId={retryingMediaId}
                selectedDeadLetterIds={selectedDeadLetterIds}
                workspaceId={workspaceId}
              />
            </>
          ) : null}
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
      ) : null}
    </>
  );
}
