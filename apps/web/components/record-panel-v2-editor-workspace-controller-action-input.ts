"use client";

import type { RecordPanelShellInput } from "./record-panel-v2-shell-props.types";

export function buildRecordEditorWorkspaceControllerActionInput({ controller }: Pick<RecordPanelShellInput, "controller">) {
  return {
    handleBulkRetryDeadLetter: controller.handleBulkRetryDeadLetter,
    handleClearDeadLetterSelection: controller.handleClearDeadLetterSelection,
    handleCreateReminderSubmit: controller.handleCreateReminderSubmit,
    handleDelete: controller.handleDelete,
    handleDeleteMediaAsset: controller.handleDeleteMediaAsset,
    handleDownloadMedia: controller.handleDownloadMedia,
    handleRefreshMedia: controller.handleRefreshMedia,
    handleRetryMediaProcessing: controller.handleRetryMediaProcessing,
    handleSelectAllDeadLetter: controller.handleSelectAllDeadLetter,
    handleSubmit: controller.handleSubmit,
    handleToggleDeadLetterSelection: controller.handleToggleDeadLetterSelection,
    handleUpload: controller.handleUpload,
    setForm: controller.setForm,
    setLocationReviewForm: controller.setLocationReviewForm,
    setReminderForm: controller.setReminderForm,
  };
}
