import type { RecordEditorWorkspaceMediaCopyProps } from "./record-panel-v2-editor-workspace-copy-output-props.types"; import type { RecordEditorWorkspaceCopyPropsInput } from "./record-panel-v2-editor-workspace-copy-props-input.types";
export function buildRecordEditorWorkspaceMediaCopyProps(input: RecordEditorWorkspaceCopyPropsInput): RecordEditorWorkspaceMediaCopyProps {
  return { largestFilePrefixLabel: input.detailCopy.largestFilePrefix, noMediaLabel: input.detailCopy.noMedia };
}
