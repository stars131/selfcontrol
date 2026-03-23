"use client";

import type { ComponentProps } from "react";

import { RecordEditorMainSections } from "./record-editor-main-sections";
import { RecordEditorSupportTools } from "./record-editor-support-tools";
import type { RecordEditorWorkspaceProps } from "./record-editor-workspace.types";

type RecordEditorMainSectionsProps = ComponentProps<typeof RecordEditorMainSections>;
type RecordEditorSupportToolsProps = ComponentProps<typeof RecordEditorSupportTools>;

export function buildRecordEditorMainSectionsProps({
  fieldBindings,
  locationReviewBindings,
  props,
}: {
  fieldBindings: RecordEditorMainSectionsProps["fieldBindings"];
  locationReviewBindings: RecordEditorMainSectionsProps["locationReviewBindings"];
  props: RecordEditorWorkspaceProps;
}): RecordEditorMainSectionsProps {
  return {
    canWriteWorkspace: props.canWriteWorkspace,
    fieldBindings,
    form: props.form,
    formatHistoryTimestampLabel: props.formatHistoryTimestampLabel,
    formatReviewStatusLabel: props.formatReviewStatusLabel,
    locationReviewBindings,
    locationReviewForm: props.locationReviewForm,
    panelCopy: props.panelCopy,
    selectedLocationHistory: props.selectedLocationHistory,
    selectedLocationReview: props.selectedLocationReview,
    selectedRecord: props.selectedRecord,
    summarizeHistoryActionLabel: props.summarizeHistoryActionLabel,
  };
}

export function buildRecordEditorSupportToolsProps(
  props: RecordEditorWorkspaceProps,
): RecordEditorSupportToolsProps {
  return {
    authToken: props.authToken,
    bulkRetryingDeadLetter: props.bulkRetryingDeadLetter,
    canWriteWorkspace: props.canWriteWorkspace,
    channelInAppLabel: props.channelInAppLabel,
    channelLabel: props.channelLabel,
    createReminderLabel: props.createReminderLabel,
    deleteReminderLabel: props.deleteReminderLabel,
    deleting: props.deleting,
    deletingMediaId: props.deletingMediaId,
    downloadingMediaId: props.downloadingMediaId,
    enableReminderLabel: props.enableReminderLabel,
    error: props.error,
    formatFileCountLabel: props.formatFileCountLabel,
    formatHistoryTimestampLabel: props.formatHistoryTimestampLabel,
    formatReminderEnabledLabel: props.formatReminderEnabledLabel,
    formatReminderStatusLabel: props.formatReminderStatusLabel,
    formatReminderTimestampLabel: props.formatReminderTimestampLabel,
    largestFilePrefixLabel: props.largestFilePrefixLabel,
    locale: props.locale,
    markReminderDoneLabel: props.markReminderDoneLabel,
    mediaAssets: props.mediaAssets,
    mediaDeadLetterOverview: props.mediaDeadLetterOverview,
    mediaIssueCopy: props.mediaIssueCopy,
    mediaProcessingOverview: props.mediaProcessingOverview,
    mediaStorageSummary: props.mediaStorageSummary,
    noMediaLabel: props.noMediaLabel,
    noRemindersLabel: props.noRemindersLabel,
    onBulkRetryAllDeadLetter: props.onBulkRetryAllDeadLetter,
    onBulkRetrySelectedDeadLetter: props.onBulkRetrySelectedDeadLetter,
    onClearDeadLetterSelection: props.onClearDeadLetterSelection,
    onCreateReminder: props.onCreateReminder,
    onDelete: props.onDelete,
    onDeleteMediaAsset: props.onDeleteMediaAsset,
    onDeleteReminder: props.onDeleteReminder,
    onDownloadMedia: props.onDownloadMedia,
    onRefreshMedia: props.onRefreshMedia,
    onRetryMediaProcessing: props.onRetryMediaProcessing,
    onSelectAllDeadLetter: props.onSelectAllDeadLetter,
    onToggleDeadLetterSelection: props.onToggleDeadLetterSelection,
    onUpdateReminder: props.onUpdateReminder,
    onUpload: props.onUpload,
    panelCopy: props.panelCopy,
    pauseReminderLabel: props.pauseReminderLabel,
    refreshingMediaId: props.refreshingMediaId,
    reminderForm: props.reminderForm,
    reminderNoteLabel: props.reminderNoteLabel,
    reminderNotePlaceholder: props.reminderNotePlaceholder,
    reminderSectionDescription: props.reminderSectionDescription,
    reminderSectionTitle: props.reminderSectionTitle,
    reminderTitleLabel: props.reminderTitleLabel,
    reminderTitlePlaceholder: props.reminderTitlePlaceholder,
    remindAtLabel: props.remindAtLabel,
    reminders: props.reminders,
    retryingMediaId: props.retryingMediaId,
    saving: props.saving,
    savingReminder: props.savingReminder,
    savingReminderLabel: props.savingReminderLabel,
    selectedDeadLetterIds: props.selectedDeadLetterIds,
    selectedRecord: props.selectedRecord,
    selectedRecordMediaSizeLabel: props.selectedRecordMediaSizeLabel,
    setReminderForm: props.setReminderForm,
    uploading: props.uploading,
    untitledReminderLabel: props.untitledReminderLabel,
    workspaceId: props.workspaceId,
  };
}
