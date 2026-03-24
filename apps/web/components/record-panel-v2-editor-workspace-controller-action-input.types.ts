import type { RecordPanelController } from "./record-panel-v2-shell-props.types";
export type BuildRecordEditorWorkspaceControllerActionInput = Pick<
  RecordPanelController,
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
  | "setForm"
  | "setLocationReviewForm"
  | "setReminderForm"
>;
