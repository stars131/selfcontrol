import type { BuildRecordEditorWorkspacePropsInput, RecordEditorWorkspaceProps } from "./record-panel-v2-workspace-props.types";

export function buildRecordEditorWorkspaceDeadLetterActionProps({
  handleBulkRetryDeadLetter, handleClearDeadLetterSelection, handleSelectAllDeadLetter, handleToggleDeadLetterSelection,
}: Pick<
  BuildRecordEditorWorkspacePropsInput,
  | "handleBulkRetryDeadLetter"
  | "handleClearDeadLetterSelection"
  | "handleSelectAllDeadLetter"
  | "handleToggleDeadLetterSelection"
>): Pick<
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
