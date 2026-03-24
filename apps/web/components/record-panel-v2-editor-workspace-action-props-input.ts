import type { RecordEditorWorkspaceActionPropsInput } from "./record-panel-v2-editor-workspace-action-props-input.types";
import type { RecordEditorWorkspacePropsBuilderInput } from "./record-panel-v2-editor-workspace-props-builder-input.types";

export function buildRecordEditorWorkspaceActionPropsInput({
  handleBulkRetryDeadLetter,
  handleClearDeadLetterSelection,
  handleCreateReminderSubmit,
  handleDelete,
  handleDeleteMediaAsset,
  handleDownloadMedia,
  handleRefreshMedia,
  handleRetryMediaProcessing,
  handleSelectAllDeadLetter,
  handleSubmit,
  handleToggleDeadLetterSelection,
  handleUpload,
  onDeleteReminder,
  onUpdateReminder,
}: RecordEditorWorkspacePropsBuilderInput): RecordEditorWorkspaceActionPropsInput {
  return {
    handleBulkRetryDeadLetter,
    handleClearDeadLetterSelection,
    handleCreateReminderSubmit,
    handleDelete,
    handleDeleteMediaAsset,
    handleDownloadMedia,
    handleRefreshMedia,
    handleRetryMediaProcessing,
    handleSelectAllDeadLetter,
    handleSubmit,
    handleToggleDeadLetterSelection,
    handleUpload,
    onDeleteReminder,
    onUpdateReminder,
  };
}
