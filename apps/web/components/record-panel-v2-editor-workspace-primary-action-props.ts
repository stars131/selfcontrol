import type { BuildRecordEditorWorkspacePropsInput, RecordEditorWorkspaceProps } from "./record-panel-v2-workspace-props.types";

type EditorWorkspacePrimaryActionPropsInput = Pick<BuildRecordEditorWorkspacePropsInput, "handleCreateReminderSubmit" | "handleDelete" | "handleDeleteMediaAsset" | "handleDownloadMedia" | "handleRefreshMedia" | "handleRetryMediaProcessing" | "handleSubmit" | "handleUpload" | "onDeleteReminder" | "onUpdateReminder">;
type EditorWorkspacePrimaryActionProps = Pick<RecordEditorWorkspaceProps, "onCreateReminder" | "onDelete" | "onDeleteMediaAsset" | "onDeleteReminder" | "onDownloadMedia" | "onRefreshMedia" | "onRetryMediaProcessing" | "onSubmit" | "onUpdateReminder" | "onUpload">;

export function buildRecordEditorWorkspacePrimaryActionProps({
  handleCreateReminderSubmit, handleDelete, handleDeleteMediaAsset, handleDownloadMedia, handleRefreshMedia, handleRetryMediaProcessing, handleSubmit, handleUpload, onDeleteReminder, onUpdateReminder,
}: EditorWorkspacePrimaryActionPropsInput): EditorWorkspacePrimaryActionProps {
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
