import { buildRecordEditorWorkspaceDeadLetterActionProps } from "./record-panel-v2-editor-workspace-dead-letter-action-props";
import { buildRecordEditorWorkspacePrimaryActionProps } from "./record-panel-v2-editor-workspace-primary-action-props";
import type { RecordEditorWorkspaceActionPropsInput } from "./record-panel-v2-editor-workspace-action-props-input.types";

export function buildRecordEditorWorkspaceActionProps({ ...input }: RecordEditorWorkspaceActionPropsInput) {
  const deadLetterActionProps = buildRecordEditorWorkspaceDeadLetterActionProps(input);
  const primaryActionProps = buildRecordEditorWorkspacePrimaryActionProps(input);
  return {
    ...deadLetterActionProps,
    ...primaryActionProps,
  };
}
