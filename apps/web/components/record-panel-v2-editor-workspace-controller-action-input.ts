"use client";

import type { BuildRecordEditorWorkspaceControllerInputArgs } from "./record-panel-v2-editor-workspace-controller-input.types";

export function buildRecordEditorWorkspaceControllerActionInput(input: BuildRecordEditorWorkspaceControllerInputArgs) {
  return {
    handleBulkRetryDeadLetter: input.handleBulkRetryDeadLetter,
    handleClearDeadLetterSelection: input.handleClearDeadLetterSelection,
    handleCreateReminderSubmit: input.handleCreateReminderSubmit,
    handleDelete: input.handleDelete,
    handleDeleteMediaAsset: input.handleDeleteMediaAsset,
    handleDownloadMedia: input.handleDownloadMedia,
    handleRefreshMedia: input.handleRefreshMedia,
    handleRetryMediaProcessing: input.handleRetryMediaProcessing,
    handleSelectAllDeadLetter: input.handleSelectAllDeadLetter,
    handleSubmit: input.handleSubmit,
    handleToggleDeadLetterSelection: input.handleToggleDeadLetterSelection,
    handleUpload: input.handleUpload,
    setForm: input.setForm,
    setLocationReviewForm: input.setLocationReviewForm,
    setReminderForm: input.setReminderForm,
  };
}
