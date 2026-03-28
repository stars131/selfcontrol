import type { RecordEditorWorkspacePrimaryActionProps } from "./record-panel-v2-editor-workspace-action-props.types";
import type { RecordEditorWorkspacePrimaryActionPropsInput } from "./record-panel-v2-editor-workspace-action-props-input.types";

export function buildRecordEditorWorkspacePrimaryActionProps(
  input: RecordEditorWorkspacePrimaryActionPropsInput,
): RecordEditorWorkspacePrimaryActionProps {
  return {
    onCreateReminder: input.handleCreateReminderSubmit,
    onDelete: input.handleDelete,
    onDeleteMediaAsset: input.handleDeleteMediaAsset,
    onDeleteReminder: input.onDeleteReminder,
    onDownloadMedia: input.handleDownloadMedia,
    onRefreshMedia: input.handleRefreshMedia,
    onRetryMediaProcessing: input.handleRetryMediaProcessing,
    onSubmit: input.handleSubmit,
    onUpdateReminder: input.onUpdateReminder,
    onUpload: input.handleUpload,
  };
}
