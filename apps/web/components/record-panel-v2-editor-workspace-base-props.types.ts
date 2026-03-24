import type { BuildRecordEditorWorkspaceBaseFormPropsInput, RecordEditorWorkspaceBaseFormProps } from "./record-panel-v2-editor-workspace-base-form-props.types";
import type { BuildRecordEditorWorkspaceBaseMediaPropsInput, RecordEditorWorkspaceBaseMediaProps } from "./record-panel-v2-editor-workspace-base-media-props.types";
import type { BuildRecordEditorWorkspaceBaseSessionPropsInput, RecordEditorWorkspaceBaseSessionProps } from "./record-panel-v2-editor-workspace-base-session-props.types";
import type { BuildRecordEditorWorkspaceBaseStatePropsInput, RecordEditorWorkspaceBaseStateProps } from "./record-panel-v2-editor-workspace-base-state-props.types";

export type BuildRecordEditorWorkspaceBasePropsInput =
  BuildRecordEditorWorkspaceBaseFormPropsInput &
  BuildRecordEditorWorkspaceBaseMediaPropsInput &
  BuildRecordEditorWorkspaceBaseSessionPropsInput &
  BuildRecordEditorWorkspaceBaseStatePropsInput;

export type RecordEditorWorkspaceBaseProps =
  RecordEditorWorkspaceBaseFormProps &
  RecordEditorWorkspaceBaseMediaProps &
  RecordEditorWorkspaceBaseSessionProps &
  RecordEditorWorkspaceBaseStateProps;
