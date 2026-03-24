import type { BuildRecordBrowseWorkspacePropsInput } from "./record-panel-v2-workspace-props.types";

export type RecordBrowseWorkspaceCopyPropsInput = Pick<BuildRecordBrowseWorkspacePropsInput, "detailCopy" | "panelCopy">;
export type RecordBrowseWorkspaceDraftLocationPropsInput = Pick<BuildRecordBrowseWorkspacePropsInput, "canWriteWorkspace" | "form" | "setForm">;
