import type { RecordMediaSelectedContentProps } from "./record-media-selected-content.types";
import type { RecordMediaToolsProps } from "./record-media-tools.types";

export function buildRecordMediaToolsActionsProps(input: RecordMediaToolsProps) {
  return {
    canWriteWorkspace: input.canWriteWorkspace,
    deleteButtonLabel: input.deleteButtonLabel,
    deleting: input.deleting,
    error: input.error,
    hasSelectedRecord: input.hasSelectedRecord,
    onDelete: input.onDelete,
    onUpload: input.onUpload,
    saveButtonLabel: input.saveButtonLabel,
    saving: input.saving,
    uploadAttachmentLabel: input.uploadAttachmentLabel,
    uploading: input.uploading,
    uploadingMediaLabel: input.uploadingMediaLabel,
  };
}

export function buildRecordMediaSelectedContentProps(
  input: RecordMediaToolsProps,
): RecordMediaSelectedContentProps {
  return {
    allTrackedFilesPresentLabel: input.allTrackedFilesPresentLabel,
    authToken: input.authToken,
    bulkRetryingDeadLetter: input.bulkRetryingDeadLetter,
    canWriteWorkspace: input.canWriteWorkspace,
    deletingMediaId: input.deletingMediaId,
    downloadingMediaId: input.downloadingMediaId,
    formatFileCountLabel: input.formatFileCountLabel,
    formatHistoryTimestampLabel: input.formatHistoryTimestampLabel,
    largestFilePrefixLabel: input.largestFilePrefixLabel,
    locale: input.locale,
    localLabel: input.localLabel,
    mediaAssets: input.mediaAssets,
    mediaDeadLetterOverview: input.mediaDeadLetterOverview,
    mediaIssueCopy: input.mediaIssueCopy,
    mediaProcessingOverview: input.mediaProcessingOverview,
    mediaStorageSummary: input.mediaStorageSummary,
    missingFilesLabel: input.missingFilesLabel,
    needsAttentionLabel: input.needsAttentionLabel,
    noMediaLabel: input.noMediaLabel,
    onBulkRetryAllDeadLetter: input.onBulkRetryAllDeadLetter,
    onBulkRetrySelectedDeadLetter: input.onBulkRetrySelectedDeadLetter,
    onClearDeadLetterSelection: input.onClearDeadLetterSelection,
    onDeleteMediaAsset: input.onDeleteMediaAsset,
    onDownloadMedia: input.onDownloadMedia,
    onRefreshMedia: input.onRefreshMedia,
    onRetryMediaProcessing: input.onRetryMediaProcessing,
    onSelectAllDeadLetter: input.onSelectAllDeadLetter,
    onToggleDeadLetterSelection: input.onToggleDeadLetterSelection,
    processingCompletedLabel: input.processingCompletedLabel,
    queuedLabel: input.queuedLabel,
    queueStateLabel: input.queueStateLabel,
    refreshingMediaId: input.refreshingMediaId,
    remoteLabel: input.remoteLabel,
    retryingMediaId: input.retryingMediaId,
    selectedDeadLetterIds: input.selectedDeadLetterIds,
    selectedRecordMediaSizeLabel: input.selectedRecordMediaSizeLabel,
    storageHealthLabel: input.storageHealthLabel,
    storageMixLabel: input.storageMixLabel,
    thisRecordMediaLabel: input.thisRecordMediaLabel,
    workspaceId: input.workspaceId,
    workspaceStorageLabel: input.workspaceStorageLabel,
  };
}
