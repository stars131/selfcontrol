import type { RecordEditorWorkspacePrimaryActionProps } from "./record-panel-v2-editor-workspace-action-props.types";
import type { RecordEditorWorkspacePrimaryActionPropsInput } from "./record-panel-v2-editor-workspace-action-props-input.types";

export function buildRecordEditorWorkspacePrimaryActionProps({
  handleCreateReminderSubmit, handleDelete, handleDeleteMediaAsset, handleDownloadMedia, handleRefreshMedia, handleRetryMediaProcessing, handleSubmit, handleUpload, onDeleteReminder, onUpdateReminder,
}: RecordEditorWorkspacePrimaryActionPropsInput): RecordEditorWorkspacePrimaryActionProps {
  return {
    onCreateReminder: handleCreateReminderSubmit,
    onDelete: handleDelete,
    onDeleteMediaAsset: handleDeleteMediaAsset,
    onDeleteReminder,
    onDownloadMedia: handleDownloadMedia,
    onRefreshMedia: handleRefreshMedia,
    onRetryMediaProcessing: handleRetryMediaProcessing,
    onSubmit: handleSubmit,
    onUpdateReminder,
    onUpload: handleUpload,
  };
}
