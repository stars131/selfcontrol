import type { RecordEditorWorkspaceDeadLetterActionProps } from "./record-panel-v2-editor-workspace-action-props.types";
import type { RecordEditorWorkspaceDeadLetterActionPropsInput } from "./record-panel-v2-editor-workspace-action-props-input.types";

export function buildRecordEditorWorkspaceDeadLetterActionProps(
  input: RecordEditorWorkspaceDeadLetterActionPropsInput,
): RecordEditorWorkspaceDeadLetterActionProps {
  return {
    onBulkRetryAllDeadLetter: () => input.handleBulkRetryDeadLetter("all"),
    onBulkRetrySelectedDeadLetter: () => input.handleBulkRetryDeadLetter("selected"),
    onClearDeadLetterSelection: input.handleClearDeadLetterSelection,
    onSelectAllDeadLetter: input.handleSelectAllDeadLetter,
    onToggleDeadLetterSelection: input.handleToggleDeadLetterSelection,
  };
}
