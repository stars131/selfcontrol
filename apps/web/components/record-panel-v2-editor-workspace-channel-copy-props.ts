import type { RecordEditorWorkspaceChannelCopyProps } from "./record-panel-v2-editor-workspace-copy-output-props.types"; import type { RecordEditorWorkspaceCopyPropsInput } from "./record-panel-v2-editor-workspace-copy-props-input.types";
export function buildRecordEditorWorkspaceChannelCopyProps({ detailCopy }: RecordEditorWorkspaceCopyPropsInput): RecordEditorWorkspaceChannelCopyProps {
  return { channelInAppLabel: detailCopy.channelInApp, channelLabel: detailCopy.channelLabel };
}
