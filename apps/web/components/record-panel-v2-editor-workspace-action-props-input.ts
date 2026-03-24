import type { BuildRecordEditorWorkspacePropsInput } from "./record-panel-v2-workspace-props.types";
import type { RecordEditorWorkspaceActionPropsInput } from "./record-panel-v2-editor-workspace-action-props-input.types";

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
}: EditorWorkspacePropsBuilderInput): RecordEditorWorkspaceActionPropsInput {
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
