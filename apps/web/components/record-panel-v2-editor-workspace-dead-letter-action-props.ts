import type { RecordEditorWorkspaceDeadLetterActionProps } from "./record-panel-v2-editor-workspace-action-props.types";
import type { RecordEditorWorkspaceDeadLetterActionPropsInput } from "./record-panel-v2-editor-workspace-action-props-input.types";

export function buildRecordEditorWorkspaceDeadLetterActionProps({
  handleBulkRetryDeadLetter, handleClearDeadLetterSelection, handleSelectAllDeadLetter, handleToggleDeadLetterSelection,
}: RecordEditorWorkspaceDeadLetterActionPropsInput): RecordEditorWorkspaceDeadLetterActionProps {
  return {
    onBulkRetryAllDeadLetter: () => handleBulkRetryDeadLetter("all"),
    onBulkRetrySelectedDeadLetter: () => handleBulkRetryDeadLetter("selected"),
    onClearDeadLetterSelection: handleClearDeadLetterSelection,
    onSelectAllDeadLetter: handleSelectAllDeadLetter,
    onToggleDeadLetterSelection: handleToggleDeadLetterSelection,
  };
}
