import type { BuildRecordEditorWorkspacePropsInput, RecordEditorWorkspaceProps } from "./record-panel-v2-workspace-props.types";
export function buildRecordEditorWorkspaceChannelCopyProps({ detailCopy }: Pick<BuildRecordEditorWorkspacePropsInput, "detailCopy">): Pick<RecordEditorWorkspaceProps, "channelInAppLabel" | "channelLabel"> {
  return { channelInAppLabel: detailCopy.channelInApp, channelLabel: detailCopy.channelLabel };
}
