import type {
  BuildRecordEditorWorkspacePropsInput,
  RecordEditorWorkspaceProps,
} from "./record-panel-v2-workspace-props.types";

export function buildRecordEditorWorkspaceActionProps({
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
}: Pick<
  BuildRecordEditorWorkspacePropsInput,
  | "handleBulkRetryDeadLetter"
  | "handleClearDeadLetterSelection"
  | "handleCreateReminderSubmit"
  | "handleDelete"
  | "handleDeleteMediaAsset"
  | "handleDownloadMedia"
  | "handleRefreshMedia"
  | "handleRetryMediaProcessing"
  | "handleSelectAllDeadLetter"
  | "handleSubmit"
  | "handleToggleDeadLetterSelection"
  | "handleUpload"
  | "onDeleteReminder"
  | "onUpdateReminder"
>): Pick<
  RecordEditorWorkspaceProps,
  | "onBulkRetryAllDeadLetter"
  | "onBulkRetrySelectedDeadLetter"
  | "onClearDeadLetterSelection"
  | "onCreateReminder"
  | "onDelete"
  | "onDeleteMediaAsset"
  | "onDeleteReminder"
  | "onDownloadMedia"
  | "onRefreshMedia"
  | "onRetryMediaProcessing"
  | "onSelectAllDeadLetter"
  | "onSubmit"
  | "onToggleDeadLetterSelection"
  | "onUpdateReminder"
  | "onUpload"
> {
  return {
    onBulkRetryAllDeadLetter: () => handleBulkRetryDeadLetter("all"),
    onBulkRetrySelectedDeadLetter: () => handleBulkRetryDeadLetter("selected"),
    onClearDeadLetterSelection: handleClearDeadLetterSelection,
    onCreateReminder: handleCreateReminderSubmit,
    onDelete: handleDelete,
    onDeleteMediaAsset: handleDeleteMediaAsset,
    onDeleteReminder,
    onDownloadMedia: handleDownloadMedia,
    onRefreshMedia: handleRefreshMedia,
    onRetryMediaProcessing: handleRetryMediaProcessing,
    onSelectAllDeadLetter: handleSelectAllDeadLetter,
    onSubmit: handleSubmit,
    onToggleDeadLetterSelection: handleToggleDeadLetterSelection,
    onUpdateReminder,
    onUpload: handleUpload,
  };
}
