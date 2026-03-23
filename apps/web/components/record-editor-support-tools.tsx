"use client";

import { RecordMediaTools } from "./record-media-tools";
import { RecordReminderTools } from "./record-reminder-tools";
import type { RecordEditorWorkspaceProps } from "./record-editor-workspace.types";

type RecordEditorSupportToolsProps = Pick<
  RecordEditorWorkspaceProps,
  | "authToken"
  | "bulkRetryingDeadLetter"
  | "canWriteWorkspace"
  | "channelInAppLabel"
  | "channelLabel"
  | "createReminderLabel"
  | "deleteReminderLabel"
  | "deleting"
  | "deletingMediaId"
  | "downloadingMediaId"
  | "enableReminderLabel"
  | "error"
  | "formatFileCountLabel"
  | "formatHistoryTimestampLabel"
  | "formatReminderEnabledLabel"
  | "formatReminderStatusLabel"
  | "formatReminderTimestampLabel"
  | "largestFilePrefixLabel"
  | "locale"
  | "markReminderDoneLabel"
  | "mediaAssets"
  | "mediaDeadLetterOverview"
  | "mediaIssueCopy"
  | "mediaProcessingOverview"
  | "mediaStorageSummary"
  | "noMediaLabel"
  | "noRemindersLabel"
  | "onBulkRetryAllDeadLetter"
  | "onBulkRetrySelectedDeadLetter"
  | "onClearDeadLetterSelection"
  | "onCreateReminder"
  | "onDelete"
  | "onDeleteMediaAsset"
  | "onDeleteReminder"
  | "onDownloadMedia"
  | "onRefreshMedia"
  | "onRetryMediaProcessing"
  | "onSelectAllDeadLetter"
  | "onToggleDeadLetterSelection"
  | "onUpdateReminder"
  | "onUpload"
  | "panelCopy"
  | "pauseReminderLabel"
  | "refreshingMediaId"
  | "reminderForm"
  | "reminderNoteLabel"
  | "reminderNotePlaceholder"
  | "reminderSectionDescription"
  | "reminderSectionTitle"
  | "reminderTitleLabel"
  | "reminderTitlePlaceholder"
  | "remindAtLabel"
  | "reminders"
  | "retryingMediaId"
  | "saving"
  | "savingReminder"
  | "savingReminderLabel"
  | "selectedDeadLetterIds"
  | "selectedRecord"
  | "selectedRecordMediaSizeLabel"
  | "setReminderForm"
  | "uploading"
  | "untitledReminderLabel"
  | "workspaceId"
>;

export function RecordEditorSupportTools({
  authToken,
  bulkRetryingDeadLetter,
  canWriteWorkspace,
  channelInAppLabel,
  channelLabel,
  createReminderLabel,
  deleteReminderLabel,
  deleting,
  deletingMediaId,
  downloadingMediaId,
  enableReminderLabel,
  error,
  formatFileCountLabel,
  formatHistoryTimestampLabel,
  formatReminderEnabledLabel,
  formatReminderStatusLabel,
  formatReminderTimestampLabel,
  largestFilePrefixLabel,
  locale,
  markReminderDoneLabel,
  mediaAssets,
  mediaDeadLetterOverview,
  mediaIssueCopy,
  mediaProcessingOverview,
  mediaStorageSummary,
  noMediaLabel,
  noRemindersLabel,
  onBulkRetryAllDeadLetter,
  onBulkRetrySelectedDeadLetter,
  onClearDeadLetterSelection,
  onCreateReminder,
  onDelete,
  onDeleteMediaAsset,
  onDeleteReminder,
  onDownloadMedia,
  onRefreshMedia,
  onRetryMediaProcessing,
  onSelectAllDeadLetter,
  onToggleDeadLetterSelection,
  onUpdateReminder,
  onUpload,
  panelCopy,
  pauseReminderLabel,
  refreshingMediaId,
  reminderForm,
  reminderNoteLabel,
  reminderNotePlaceholder,
  reminderSectionDescription,
  reminderSectionTitle,
  reminderTitleLabel,
  reminderTitlePlaceholder,
  remindAtLabel,
  reminders,
  retryingMediaId,
  saving,
  savingReminder,
  savingReminderLabel,
  selectedDeadLetterIds,
  selectedRecord,
  selectedRecordMediaSizeLabel,
  setReminderForm,
  uploading,
  untitledReminderLabel,
  workspaceId,
}: RecordEditorSupportToolsProps) {
  const hasSelectedRecord = Boolean(selectedRecord);

  return (
    <>
      <RecordMediaTools
        allTrackedFilesPresentLabel={panelCopy.allTrackedFilesPresent}
        authToken={authToken}
        bulkRetryingDeadLetter={bulkRetryingDeadLetter}
        canWriteWorkspace={canWriteWorkspace}
        deleteButtonLabel={deleting ? panelCopy.deleting : panelCopy.deleteRecord}
        deleting={deleting}
        deletingMediaId={deletingMediaId}
        downloadingMediaId={downloadingMediaId}
        error={error}
        formatFileCountLabel={formatFileCountLabel}
        formatHistoryTimestampLabel={formatHistoryTimestampLabel}
        hasSelectedRecord={hasSelectedRecord}
        largestFilePrefixLabel={largestFilePrefixLabel}
        localLabel={panelCopy.local}
        locale={locale}
        mediaAssets={mediaAssets}
        mediaDeadLetterOverview={mediaDeadLetterOverview}
        mediaIssueCopy={mediaIssueCopy}
        mediaProcessingOverview={mediaProcessingOverview}
        mediaStorageSummary={mediaStorageSummary}
        missingFilesLabel={panelCopy.missingFiles}
        needsAttentionLabel={panelCopy.needsAttention}
        noMediaLabel={noMediaLabel}
        onBulkRetryAllDeadLetter={onBulkRetryAllDeadLetter}
        onBulkRetrySelectedDeadLetter={onBulkRetrySelectedDeadLetter}
        onClearDeadLetterSelection={onClearDeadLetterSelection}
        onDelete={onDelete}
        onDeleteMediaAsset={onDeleteMediaAsset}
        onDownloadMedia={onDownloadMedia}
        onRefreshMedia={onRefreshMedia}
        onRetryMediaProcessing={onRetryMediaProcessing}
        onSelectAllDeadLetter={onSelectAllDeadLetter}
        onToggleDeadLetterSelection={onToggleDeadLetterSelection}
        onUpload={onUpload}
        processingCompletedLabel={panelCopy.processingCompleted}
        queuedLabel={panelCopy.queued}
        queueStateLabel={panelCopy.queueState}
        refreshingMediaId={refreshingMediaId}
        remoteLabel={panelCopy.remote}
        retryingMediaId={retryingMediaId}
        saveButtonLabel={saving ? panelCopy.saving : selectedRecord ? panelCopy.updateRecord : panelCopy.createRecord}
        saving={saving}
        selectedDeadLetterIds={selectedDeadLetterIds}
        selectedRecordMediaSizeLabel={selectedRecordMediaSizeLabel}
        storageHealthLabel={panelCopy.storageHealth}
        storageMixLabel={panelCopy.storageMix}
        thisRecordMediaLabel={panelCopy.thisRecordMedia}
        uploadAttachmentLabel={panelCopy.uploadAttachment}
        uploading={uploading}
        uploadingMediaLabel={panelCopy.uploadingMedia}
        workspaceId={workspaceId}
        workspaceStorageLabel={panelCopy.workspaceStorage}
      />
      <RecordReminderTools
        canWriteWorkspace={canWriteWorkspace}
        channelInApp={channelInAppLabel}
        channelLabel={channelLabel}
        createReminderLabel={createReminderLabel}
        deleteReminderLabel={deleteReminderLabel}
        enableReminderLabel={enableReminderLabel}
        formatReminderEnabledLabel={formatReminderEnabledLabel}
        formatReminderStatusLabel={formatReminderStatusLabel}
        formatReminderTimestampLabel={formatReminderTimestampLabel}
        hasSelectedRecord={hasSelectedRecord}
        markReminderDoneLabel={markReminderDoneLabel}
        noRemindersLabel={noRemindersLabel}
        onCreateReminder={onCreateReminder}
        onDeleteReminder={onDeleteReminder}
        onUpdateReminder={onUpdateReminder}
        pauseReminderLabel={pauseReminderLabel}
        reminderForm={reminderForm}
        reminderNoteLabel={reminderNoteLabel}
        reminderNotePlaceholder={reminderNotePlaceholder}
        reminderSectionDescription={reminderSectionDescription}
        reminderSectionTitle={reminderSectionTitle}
        reminderTitleLabel={reminderTitleLabel}
        reminderTitlePlaceholder={reminderTitlePlaceholder}
        remindAtLabel={remindAtLabel}
        reminders={reminders}
        savingReminder={savingReminder}
        savingReminderLabel={savingReminderLabel}
        selectedRecordTitle={selectedRecord?.title ?? null}
        setReminderForm={setReminderForm}
        untitledReminderLabel={untitledReminderLabel}
      />
    </>
  );
}
