import type { RecordEditorWorkspaceProps } from "./record-panel-v2-workspace-props.types"; import type { RecordEditorWorkspaceCopyPropsInput } from "./record-panel-v2-editor-workspace-copy-props-input.types";
export function buildRecordEditorWorkspaceMediaCopyProps({ detailCopy }: RecordEditorWorkspaceCopyPropsInput): Pick<RecordEditorWorkspaceProps, "largestFilePrefixLabel" | "noMediaLabel"> {
  return { largestFilePrefixLabel: detailCopy.largestFilePrefix, noMediaLabel: detailCopy.noMedia };
}
