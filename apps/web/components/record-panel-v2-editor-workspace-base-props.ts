import type { BuildRecordEditorWorkspaceBasePropsInput, RecordEditorWorkspaceBaseProps } from "./record-panel-v2-editor-workspace-base-props.types";
import { buildRecordEditorWorkspaceBaseFormProps } from "./record-panel-v2-editor-workspace-base-form-props";
import { buildRecordEditorWorkspaceBaseMediaProps } from "./record-panel-v2-editor-workspace-base-media-props";
import { buildRecordEditorWorkspaceBaseSessionProps } from "./record-panel-v2-editor-workspace-base-session-props";
import { buildRecordEditorWorkspaceBaseStateProps } from "./record-panel-v2-editor-workspace-base-state-props";

export function buildRecordEditorWorkspaceBaseProps(input: BuildRecordEditorWorkspaceBasePropsInput): RecordEditorWorkspaceBaseProps {
  return {
    ...buildRecordEditorWorkspaceBaseFormProps(input),
    ...buildRecordEditorWorkspaceBaseMediaProps(input),
    ...buildRecordEditorWorkspaceBaseSessionProps(input),
    ...buildRecordEditorWorkspaceBaseStateProps(input),
  };
}
