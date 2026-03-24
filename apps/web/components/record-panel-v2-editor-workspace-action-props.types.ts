import type { RecordEditorWorkspaceProps } from "./record-panel-v2-workspace-props.types";

export type RecordEditorWorkspaceDeadLetterActionProps = Pick<RecordEditorWorkspaceProps, "onBulkRetryAllDeadLetter" | "onBulkRetrySelectedDeadLetter" | "onClearDeadLetterSelection" | "onSelectAllDeadLetter" | "onToggleDeadLetterSelection">;
export type RecordEditorWorkspacePrimaryActionProps = Pick<RecordEditorWorkspaceProps, "onCreateReminder" | "onDelete" | "onDeleteMediaAsset" | "onDeleteReminder" | "onDownloadMedia" | "onRefreshMedia" | "onRetryMediaProcessing" | "onSubmit" | "onUpdateReminder" | "onUpload">;
export type RecordEditorWorkspaceActionProps = RecordEditorWorkspaceDeadLetterActionProps & RecordEditorWorkspacePrimaryActionProps;
