import type { RecordEditorWorkspaceCopyProps } from "./record-panel-v2-editor-workspace-copy-output-props.types";
import { buildRecordEditorWorkspaceChannelCopyProps } from "./record-panel-v2-editor-workspace-channel-copy-props";
import { buildRecordEditorWorkspaceMediaCopyProps } from "./record-panel-v2-editor-workspace-media-copy-props";
import { buildRecordEditorWorkspaceReminderCopyProps } from "./record-panel-v2-editor-workspace-reminder-copy-props";
import type { RecordEditorWorkspaceCopyPropsInput } from "./record-panel-v2-editor-workspace-copy-props-input.types";

export function buildRecordEditorWorkspaceCopyProps({ ...input }: RecordEditorWorkspaceCopyPropsInput): RecordEditorWorkspaceCopyProps {
  return {
    ...buildRecordEditorWorkspaceChannelCopyProps(input),
    ...buildRecordEditorWorkspaceMediaCopyProps(input),
    ...buildRecordEditorWorkspaceReminderCopyProps(input),
  };
}
