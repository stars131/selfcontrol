"use client";

import type { ChangeEventHandler } from "react";

import { DeadLetterRecoveryPanel } from "./dead-letter-recovery-panel";
import { MediaAssetSection } from "./media-asset-section";
import { MediaStorageOverview } from "./media-storage-overview";
import { RecentMediaIssuesPanel } from "./recent-media-issues-panel";
import type { LocaleCode } from "../lib/locale";
import type { MediaIssueCopy } from "../lib/record-panel-ui";
import type { MediaAsset, MediaDeadLetterOverview, MediaProcessingOverview, MediaStorageSummary } from "../lib/types";

type RecordMediaToolsProps = {
  authToken: string | null;
  canWriteWorkspace: boolean;
  hasSelectedRecord: boolean;
  workspaceId: string;
  locale: LocaleCode;
  error: string;
  saving: boolean;
  deleting: boolean;
  uploading: boolean;
  saveButtonLabel: string;
  deleteButtonLabel: string;
  uploadAttachmentLabel: string;
  uploadingMediaLabel: string;
  allTrackedFilesPresentLabel: string;
  localLabel: string;
  missingFilesLabel: string;
  needsAttentionLabel: string;
  processingCompletedLabel: string;
  queuedLabel: string;
  queueStateLabel: string;
  remoteLabel: string;
  storageHealthLabel: string;
  storageMixLabel: string;
  thisRecordMediaLabel: string;
  workspaceStorageLabel: string;
  selectedRecordMediaSizeLabel: string;
  largestFilePrefixLabel: string;
  noMediaLabel: string;
  mediaIssueCopy: MediaIssueCopy;
  mediaAssets: MediaAsset[];
  mediaDeadLetterOverview: MediaDeadLetterOverview | null;
  mediaProcessingOverview: MediaProcessingOverview | null;
  mediaStorageSummary: MediaStorageSummary | null;
  downloadingMediaId: string | null;
  refreshingMediaId: string | null;
  retryingMediaId: string | null;
  deletingMediaId: string | null;
  bulkRetryingDeadLetter: boolean;
  selectedDeadLetterIds: string[];
  formatFileCountLabel: (count: number) => string;
  formatHistoryTimestampLabel: (value?: string | null) => string;
  onDelete: () => void;
  onUpload: ChangeEventHandler<HTMLInputElement>;
  onDeleteMediaAsset: (mediaId: string) => Promise<void>;
  onDownloadMedia: (asset: MediaAsset) => Promise<void>;
  onRefreshMedia: (mediaId: string) => Promise<void>;
  onRetryMediaProcessing: (mediaId: string) => Promise<void>;
  onSelectAllDeadLetter: () => void;
  onClearDeadLetterSelection: () => void;
  onBulkRetrySelectedDeadLetter: () => Promise<void>;
  onBulkRetryAllDeadLetter: () => Promise<void>;
  onToggleDeadLetterSelection: (mediaId: string, checked: boolean) => void;
};

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
