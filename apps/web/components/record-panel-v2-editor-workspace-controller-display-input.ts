"use client";
import type { BuildRecordEditorWorkspaceControllerInputArgs } from "./record-panel-v2-editor-workspace-controller-input.types";

export function buildRecordEditorWorkspaceControllerDisplayInput({ controller }: BuildRecordEditorWorkspaceControllerInputArgs) {
  return {
    bulkRetryingDeadLetter: controller.bulkRetryingDeadLetter,
    deleting: controller.deleting,
    deletingMediaId: controller.deletingMediaId,
    detailCopy: controller.detailCopy,
    downloadingMediaId: controller.downloadingMediaId,
    error: controller.error,
    form: controller.form,
    locale: controller.locale,
    locationReviewForm: controller.locationReviewForm,
    mediaIssueCopy: controller.mediaIssueCopy,
    panelCopy: controller.panelCopy,
    refreshingMediaId: controller.refreshingMediaId,
    reminderForm: controller.reminderForm,
    retryingMediaId: controller.retryingMediaId,
    saving: controller.saving,
    savingReminder: controller.savingReminder,
    selectedDeadLetterIds: controller.selectedDeadLetterIds,
    selectedLocationHistory: controller.selectedLocationHistory,
    selectedLocationReview: controller.selectedLocationReview,
    selectedRecord: controller.selectedRecord,
    selectedRecordMediaSizeLabel: controller.selectedRecordMediaSizeLabel,
    uploading: controller.uploading,
  };
}
