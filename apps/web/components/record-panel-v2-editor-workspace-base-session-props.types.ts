import type { BuildRecordEditorWorkspacePropsInput, RecordEditorWorkspaceProps } from "./record-panel-v2-workspace-props.types";

export type BuildRecordEditorWorkspaceBaseSessionPropsInput = Pick<BuildRecordEditorWorkspacePropsInput, "authToken" | "canWriteWorkspace" | "error" | "locale" | "panelCopy" | "workspaceId">;
export type RecordEditorWorkspaceBaseSessionProps = Pick<RecordEditorWorkspaceProps, "authToken" | "canWriteWorkspace" | "error" | "locale" | "panelCopy" | "workspaceId">;
