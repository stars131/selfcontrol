import type { BuildRecordEditorWorkspacePropsInput } from "./record-panel-v2-workspace-props.types";

type EditorWorkspacePropsBuilderInput = Omit<BuildRecordEditorWorkspacePropsInput, "detailCopy">;

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
}: EditorWorkspacePropsBuilderInput) {
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
