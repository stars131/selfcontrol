import type { BuildRecordEditorWorkspacePropsInput, RecordEditorWorkspaceProps } from "./record-panel-v2-workspace-props.types";

export type BuildRecordEditorWorkspaceBaseStatePropsInput = Pick<BuildRecordEditorWorkspacePropsInput, "bulkRetryingDeadLetter" | "deleting" | "deletingMediaId" | "downloadingMediaId" | "refreshingMediaId" | "retryingMediaId" | "saving" | "savingReminder" | "uploading">;
export type RecordEditorWorkspaceBaseStateProps = Pick<RecordEditorWorkspaceProps, "bulkRetryingDeadLetter" | "deleting" | "deletingMediaId" | "downloadingMediaId" | "refreshingMediaId" | "retryingMediaId" | "saving" | "savingReminder" | "uploading">;
