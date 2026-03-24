import type { RecordEditorWorkspaceMediaCopyProps } from "./record-panel-v2-editor-workspace-copy-output-props.types"; import type { RecordEditorWorkspaceCopyPropsInput } from "./record-panel-v2-editor-workspace-copy-props-input.types";
export function buildRecordEditorWorkspaceMediaCopyProps({ detailCopy }: RecordEditorWorkspaceCopyPropsInput): RecordEditorWorkspaceMediaCopyProps {
  return { largestFilePrefixLabel: detailCopy.largestFilePrefix, noMediaLabel: detailCopy.noMedia };
}
