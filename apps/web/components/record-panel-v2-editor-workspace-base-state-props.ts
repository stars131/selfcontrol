import type { BuildRecordEditorWorkspaceBaseStatePropsInput, RecordEditorWorkspaceBaseStateProps } from "./record-panel-v2-editor-workspace-base-state-props.types";

export function buildRecordEditorWorkspaceBaseStateProps({ bulkRetryingDeadLetter, deleting, deletingMediaId, downloadingMediaId, refreshingMediaId, retryingMediaId, saving, savingReminder, uploading }: BuildRecordEditorWorkspaceBaseStatePropsInput): RecordEditorWorkspaceBaseStateProps {
  return { bulkRetryingDeadLetter, deleting, deletingMediaId, downloadingMediaId, refreshingMediaId, retryingMediaId, saving, savingReminder, uploading };
}
