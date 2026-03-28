import type {
  BuildRecordEditorWorkspacePropsInput,
  RecordEditorWorkspaceProps,
} from "./record-panel-v2-workspace-props.types";
import { buildRecordEditorWorkspaceActionProps } from "./record-panel-v2-editor-workspace-action-props";
import { buildRecordEditorWorkspaceBaseProps } from "./record-panel-v2-editor-workspace-base-props";
import { buildRecordEditorWorkspaceCopyProps } from "./record-panel-v2-editor-workspace-copy-props";
import {
  buildRecordEditorWorkspaceActionPropsInput,
  buildRecordEditorWorkspaceBasePropsInput,
} from "./record-panel-v2-editor-workspace-props-inputs";

export function buildRecordEditorWorkspaceProps(
  input: BuildRecordEditorWorkspacePropsInput,
): RecordEditorWorkspaceProps {
  const { detailCopy } = input;
  const copyProps = buildRecordEditorWorkspaceCopyProps({ detailCopy });
  const baseProps = buildRecordEditorWorkspaceBaseProps(buildRecordEditorWorkspaceBasePropsInput(input));
  const actionProps = buildRecordEditorWorkspaceActionProps(buildRecordEditorWorkspaceActionPropsInput(input));

  return {
    ...baseProps,
    ...copyProps,
    ...actionProps,
  };
}
