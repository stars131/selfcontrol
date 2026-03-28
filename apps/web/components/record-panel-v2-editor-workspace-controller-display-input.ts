"use client";
import type { BuildRecordEditorWorkspaceControllerInputArgs } from "./record-panel-v2-editor-workspace-controller-input.types";

export function buildRecordEditorWorkspaceControllerDisplayInput(input: BuildRecordEditorWorkspaceControllerInputArgs) {
  return {
    bulkRetryingDeadLetter: input.bulkRetryingDeadLetter,
    deleting: input.deleting,
    deletingMediaId: input.deletingMediaId,
    detailCopy: input.detailCopy,
    downloadingMediaId: input.downloadingMediaId,
    error: input.error,
    form: input.form,
    locale: input.locale,
    locationReviewForm: input.locationReviewForm,
    mediaIssueCopy: input.mediaIssueCopy,
    panelCopy: input.panelCopy,
    refreshingMediaId: input.refreshingMediaId,
    reminderForm: input.reminderForm,
    retryingMediaId: input.retryingMediaId,
    saving: input.saving,
    savingReminder: input.savingReminder,
    selectedDeadLetterIds: input.selectedDeadLetterIds,
    selectedLocationHistory: input.selectedLocationHistory,
    selectedLocationReview: input.selectedLocationReview,
    selectedRecord: input.selectedRecord,
    selectedRecordMediaSizeLabel: input.selectedRecordMediaSizeLabel,
    uploading: input.uploading,
  };
}
