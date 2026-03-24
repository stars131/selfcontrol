import { buildRecordEditorWorkspaceDeadLetterActionProps } from "./record-panel-v2-editor-workspace-dead-letter-action-props";
import { buildRecordEditorWorkspacePrimaryActionProps } from "./record-panel-v2-editor-workspace-primary-action-props";

type EditorWorkspaceActionPropsInput =
  Parameters<typeof buildRecordEditorWorkspaceDeadLetterActionProps>[0] &
  Parameters<typeof buildRecordEditorWorkspacePrimaryActionProps>[0];

export function buildRecordEditorWorkspaceActionProps({ ...input }: EditorWorkspaceActionPropsInput) {
  const deadLetterActionProps = buildRecordEditorWorkspaceDeadLetterActionProps(input);
  const primaryActionProps = buildRecordEditorWorkspacePrimaryActionProps(input);
  return {
    ...deadLetterActionProps,
    ...primaryActionProps,
  };
}
