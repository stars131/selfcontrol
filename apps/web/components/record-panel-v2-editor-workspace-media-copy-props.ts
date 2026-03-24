import type { BuildRecordEditorWorkspacePropsInput, RecordEditorWorkspaceProps } from "./record-panel-v2-workspace-props.types";
export function buildRecordEditorWorkspaceMediaCopyProps({ detailCopy }: Pick<BuildRecordEditorWorkspacePropsInput, "detailCopy">): Pick<RecordEditorWorkspaceProps, "largestFilePrefixLabel" | "noMediaLabel"> {
  return { largestFilePrefixLabel: detailCopy.largestFilePrefix, noMediaLabel: detailCopy.noMedia };
}
