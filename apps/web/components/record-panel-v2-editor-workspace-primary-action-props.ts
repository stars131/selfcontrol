import type { RecordEditorWorkspaceProps } from "./record-panel-v2-workspace-props.types";
import type { RecordEditorWorkspacePrimaryActionPropsInput } from "./record-panel-v2-editor-workspace-action-props-input.types";

type EditorWorkspacePrimaryActionProps = Pick<RecordEditorWorkspaceProps, "onCreateReminder" | "onDelete" | "onDeleteMediaAsset" | "onDeleteReminder" | "onDownloadMedia" | "onRefreshMedia" | "onRetryMediaProcessing" | "onSubmit" | "onUpdateReminder" | "onUpload">;

export function buildRecordEditorWorkspacePrimaryActionProps({
  handleCreateReminderSubmit, handleDelete, handleDeleteMediaAsset, handleDownloadMedia, handleRefreshMedia, handleRetryMediaProcessing, handleSubmit, handleUpload, onDeleteReminder, onUpdateReminder,
}: RecordEditorWorkspacePrimaryActionPropsInput): EditorWorkspacePrimaryActionProps {
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
