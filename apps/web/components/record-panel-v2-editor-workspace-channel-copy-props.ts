import type { RecordEditorWorkspaceChannelCopyProps } from "./record-panel-v2-editor-workspace-copy-output-props.types"; import type { RecordEditorWorkspaceCopyPropsInput } from "./record-panel-v2-editor-workspace-copy-props-input.types";
export function buildRecordEditorWorkspaceChannelCopyProps(input: RecordEditorWorkspaceCopyPropsInput): RecordEditorWorkspaceChannelCopyProps {
  return { channelInAppLabel: input.detailCopy.channelInApp, channelLabel: input.detailCopy.channelLabel };
}
