"use client";

import { LocationReviewPanel } from "./location-review-panel";
import { RecordEditorFields } from "./record-editor-fields";
import type { RecordEditorWorkspaceProps } from "./record-editor-workspace.types";
import {
  createLocationReviewBindings,
  createRecordEditorFieldBindings,
} from "./record-editor-workspace-bindings";
import { RecordMediaTools } from "./record-media-tools";
import { RecordReminderTools } from "./record-reminder-tools";

export function RecordEditorWorkspace({
  authToken,
  canWriteWorkspace,
  workspaceId,
  locale,
  selectedRecord,
  form,
  setForm,
  locationReviewForm,
  setLocationReviewForm,
  reminderForm,
  setReminderForm,
  panelCopy,
  channelInAppLabel,
  channelLabel,
  createReminderLabel,
  deleteReminderLabel,
  enableReminderLabel,
  largestFilePrefixLabel,
  markReminderDoneLabel,
  noMediaLabel,
  noRemindersLabel,
  pauseReminderLabel,
  reminderNoteLabel,
  reminderNotePlaceholder,
  reminderSectionDescription,
  reminderSectionTitle,
  reminderTitleLabel,
  reminderTitlePlaceholder,
  remindAtLabel,
  savingReminderLabel,
  untitledReminderLabel,
  error,
  saving,
  deleting,
  uploading,
  savingReminder,
  bulkRetryingDeadLetter,
  downloadingMediaId,
  refreshingMediaId,
  retryingMediaId,
  deletingMediaId,
  selectedDeadLetterIds,
  selectedRecordMediaSizeLabel,
  mediaAssets,
  mediaDeadLetterOverview,
  mediaIssueCopy,
  mediaProcessingOverview,
  mediaStorageSummary,
  reminders,
  selectedLocationHistory,
  selectedLocationReview,
  formatFileCountLabel,
  formatHistoryTimestampLabel,
  formatReminderEnabledLabel,
  formatReminderStatusLabel,
  formatReminderTimestampLabel,
  formatReviewStatusLabel,
  summarizeHistoryActionLabel,
  onSubmit,
  onDelete,
  onUpload,
  onCreateReminder,
  onDeleteReminder,
  onUpdateReminder,
  onBulkRetryAllDeadLetter,
  onBulkRetrySelectedDeadLetter,
  onClearDeadLetterSelection,
  onDeleteMediaAsset,
  onDownloadMedia,
  onRefreshMedia,
  onRetryMediaProcessing,
  onSelectAllDeadLetter,
  onToggleDeadLetterSelection,
}: RecordEditorWorkspaceProps) {
  const fieldBindings = createRecordEditorFieldBindings(setForm);
  const locationReviewBindings = createLocationReviewBindings(setLocationReviewForm);

  return (
    <form className="record-card form-stack" style={{ marginTop: 20 }} onSubmit={onSubmit}>
      <RecordEditorFields
        canWriteWorkspace={canWriteWorkspace}
        editorLabel={selectedRecord ? panelCopy.editRecord : panelCopy.newManualRecord}
        form={form}
        onAddressChange={fieldBindings.onAddressChange}
        onAvoidChange={fieldBindings.onAvoidChange}
        onContentChange={fieldBindings.onContentChange}
        onLatitudeChange={fieldBindings.onLatitudeChange}
        onLongitudeChange={fieldBindings.onLongitudeChange}
        onOccurredAtChange={fieldBindings.onOccurredAtChange}
        onPlaceNameChange={fieldBindings.onPlaceNameChange}
        onRatingChange={fieldBindings.onRatingChange}
        onTitleChange={fieldBindings.onTitleChange}
        onTypeCodeChange={fieldBindings.onTypeCodeChange}
        panelCopy={panelCopy}
      />
      <LocationReviewPanel
        canWriteWorkspace={canWriteWorkspace}
        formatHistoryTimestampLabel={formatHistoryTimestampLabel}
        formatReviewStatusLabel={formatReviewStatusLabel}
        hasSelectedRecord={Boolean(selectedRecord)}
        onMarkConfirmed={locationReviewBindings.onMarkConfirmed}
        onMarkNeedsReview={locationReviewBindings.onMarkNeedsReview}
        onNoteChange={locationReviewBindings.onNoteChange}
        onResetReview={locationReviewBindings.onResetReview}
        onStatusChange={locationReviewBindings.onStatusChange}
        panelCopy={panelCopy}
        reviewForm={locationReviewForm}
        selectedLocationHistory={selectedLocationHistory}
        selectedLocationReview={selectedLocationReview}
        summarizeHistoryActionLabel={summarizeHistoryActionLabel}
      />
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
        hasSelectedRecord={Boolean(selectedRecord)}
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
        hasSelectedRecord={Boolean(selectedRecord)}
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
    </form>
  );
}
