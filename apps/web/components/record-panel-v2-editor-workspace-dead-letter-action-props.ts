import type { RecordEditorWorkspaceProps } from "./record-panel-v2-workspace-props.types";
import type { RecordEditorWorkspaceDeadLetterActionPropsInput } from "./record-panel-v2-editor-workspace-action-props-input.types";

export function buildRecordEditorWorkspaceDeadLetterActionProps({
  handleBulkRetryDeadLetter, handleClearDeadLetterSelection, handleSelectAllDeadLetter, handleToggleDeadLetterSelection,
}: RecordEditorWorkspaceDeadLetterActionPropsInput): Pick<
  RecordEditorWorkspaceProps,
  | "onBulkRetryAllDeadLetter"
  | "onBulkRetrySelectedDeadLetter"
  | "onClearDeadLetterSelection"
  | "onSelectAllDeadLetter"
  | "onToggleDeadLetterSelection"
> {
  return {
    onBulkRetryAllDeadLetter: () => handleBulkRetryDeadLetter("all"),
    onBulkRetrySelectedDeadLetter: () => handleBulkRetryDeadLetter("selected"),
    onClearDeadLetterSelection: handleClearDeadLetterSelection,
    onSelectAllDeadLetter: handleSelectAllDeadLetter,
    onToggleDeadLetterSelection: handleToggleDeadLetterSelection,
  };
}
