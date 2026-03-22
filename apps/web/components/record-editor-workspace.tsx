"use client";

import type { Dispatch, FormEventHandler, SetStateAction } from "react";

import { LocationReviewPanel } from "./location-review-panel";
import { RecordEditorFields } from "./record-editor-fields";
import {
  createLocationReviewBindings,
  createRecordEditorFieldBindings,
} from "./record-editor-workspace-bindings";
import { RecordMediaTools } from "./record-media-tools";
import { RecordReminderTools } from "./record-reminder-tools";
import type { LocationReviewFormState, RecordFormState, ReminderFormState } from "../lib/record-panel-forms";
import type { PanelCopy } from "../lib/record-panel-ui";
import type {
  LocationHistoryEntry,
  LocationReview,
  MediaAsset,
  MediaDeadLetterOverview,
  MediaProcessingOverview,
  MediaStorageSummary,
  RecordItem,
  ReminderItem,
} from "../lib/types";
import type { LocaleCode } from "../lib/locale";

type RecordEditorWorkspaceProps = {
  authToken: string | null;
  canWriteWorkspace: boolean;
  workspaceId: string;
  locale: LocaleCode;
  selectedRecord: RecordItem | null;
  form: RecordFormState;
  setForm: Dispatch<SetStateAction<RecordFormState>>;
  locationReviewForm: LocationReviewFormState;
  setLocationReviewForm: Dispatch<SetStateAction<LocationReviewFormState>>;
  reminderForm: ReminderFormState;
  setReminderForm: Dispatch<SetStateAction<ReminderFormState>>;
  panelCopy: PanelCopy;
  channelInAppLabel: string;
  channelLabel: string;
  createReminderLabel: string;
  deleteReminderLabel: string;
  enableReminderLabel: string;
  largestFilePrefixLabel: string;
  markReminderDoneLabel: string;
  noMediaLabel: string;
  noRemindersLabel: string;
  pauseReminderLabel: string;
  reminderNoteLabel: string;
  reminderNotePlaceholder: string;
  reminderSectionDescription: string;
  reminderSectionTitle: string;
  reminderTitleLabel: string;
  reminderTitlePlaceholder: string;
  remindAtLabel: string;
  savingReminderLabel: string;
  untitledReminderLabel: string;
  error: string;
  saving: boolean;
  deleting: boolean;
  uploading: boolean;
  savingReminder: boolean;
  bulkRetryingDeadLetter: boolean;
  downloadingMediaId: string | null;
  refreshingMediaId: string | null;
  retryingMediaId: string | null;
  deletingMediaId: string | null;
  selectedDeadLetterIds: string[];
  selectedRecordMediaSizeLabel: string;
  mediaAssets: MediaAsset[];
  mediaDeadLetterOverview: MediaDeadLetterOverview | null;
  mediaIssueCopy: import("../lib/record-panel-ui").MediaIssueCopy;
  mediaProcessingOverview: MediaProcessingOverview | null;
  mediaStorageSummary: MediaStorageSummary | null;
  reminders: ReminderItem[];
  selectedLocationHistory: LocationHistoryEntry[];
  selectedLocationReview: LocationReview | null;
  formatFileCountLabel: (count: number) => string;
  formatHistoryTimestampLabel: (value?: string | null) => string;
  formatReminderEnabledLabel: (value: boolean) => string;
  formatReminderStatusLabel: (value: string) => string;
  formatReminderTimestampLabel: (value: string) => string;
  formatReviewStatusLabel: (value?: string | null) => string;
  summarizeHistoryActionLabel: (entry: LocationHistoryEntry) => string;
  onSubmit: FormEventHandler<HTMLFormElement>;
  onDelete: () => void;
  onUpload: React.ChangeEventHandler<HTMLInputElement>;
  onCreateReminder: () => Promise<void>;
  onDeleteReminder: (reminderId: string) => Promise<void>;
  onUpdateReminder: (
    reminderId: string,
    input: Partial<{
      title: string | null;
      message: string | null;
      remind_at: string | null;
      status: string;
      is_enabled: boolean;
    }>,
  ) => Promise<void>;
  onBulkRetryAllDeadLetter: () => Promise<void>;
  onBulkRetrySelectedDeadLetter: () => Promise<void>;
  onClearDeadLetterSelection: () => void;
  onDeleteMediaAsset: (mediaId: string) => Promise<void>;
  onDownloadMedia: (asset: MediaAsset) => Promise<void>;
  onRefreshMedia: (mediaId: string) => Promise<void>;
  onRetryMediaProcessing: (mediaId: string) => Promise<void>;
  onSelectAllDeadLetter: () => void;
  onToggleDeadLetterSelection: (mediaId: string, checked: boolean) => void;
};

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
