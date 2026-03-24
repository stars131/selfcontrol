import { buildRecordEditorWorkspaceChannelCopyProps } from "./record-panel-v2-editor-workspace-channel-copy-props";
import { buildRecordEditorWorkspaceMediaCopyProps } from "./record-panel-v2-editor-workspace-media-copy-props";
import { buildRecordEditorWorkspaceReminderCopyProps } from "./record-panel-v2-editor-workspace-reminder-copy-props";

type EditorWorkspaceCopyPropsInput = Parameters<typeof buildRecordEditorWorkspaceChannelCopyProps>[0];

export function buildRecordEditorWorkspaceCopyProps({ ...input }: EditorWorkspaceCopyPropsInput) {
  return {
    ...buildRecordEditorWorkspaceChannelCopyProps(input),
    ...buildRecordEditorWorkspaceMediaCopyProps(input),
    ...buildRecordEditorWorkspaceReminderCopyProps(input),
  };
}
