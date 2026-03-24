import type { BuildRecordEditorWorkspaceBaseSessionPropsInput, RecordEditorWorkspaceBaseSessionProps } from "./record-panel-v2-editor-workspace-base-session-props.types";

export function buildRecordEditorWorkspaceBaseSessionProps({ authToken, canWriteWorkspace, error, locale, panelCopy, workspaceId }: BuildRecordEditorWorkspaceBaseSessionPropsInput): RecordEditorWorkspaceBaseSessionProps {
  return { authToken, canWriteWorkspace, error, locale, panelCopy, workspaceId };
}
