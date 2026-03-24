import type { RecordEditorWorkspaceProps } from "./record-panel-v2-workspace-props.types"; import type { RecordEditorWorkspaceCopyPropsInput } from "./record-panel-v2-editor-workspace-copy-props-input.types";
export function buildRecordEditorWorkspaceChannelCopyProps({ detailCopy }: RecordEditorWorkspaceCopyPropsInput): Pick<RecordEditorWorkspaceProps, "channelInAppLabel" | "channelLabel"> {
  return { channelInAppLabel: detailCopy.channelInApp, channelLabel: detailCopy.channelLabel };
}
