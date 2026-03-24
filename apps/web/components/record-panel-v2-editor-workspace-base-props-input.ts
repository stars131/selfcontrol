import type { BuildRecordEditorWorkspacePropsInput } from "./record-panel-v2-workspace-props.types";

type EditorWorkspacePropsBuilderInput = Omit<BuildRecordEditorWorkspacePropsInput, "detailCopy">;

export function buildRecordEditorWorkspaceBasePropsInput(input: EditorWorkspacePropsBuilderInput) {
  return input;
}
