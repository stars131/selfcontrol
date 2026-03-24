import type { RecordEditorWorkspaceActionProps } from "./record-editor-workspace-actions.types";
import type { RecordEditorWorkspaceCopyProps } from "./record-editor-workspace-copy.types";
import type { RecordEditorWorkspaceDataProps } from "./record-editor-workspace-data.types";

export type RecordEditorWorkspaceProps = RecordEditorWorkspaceActionProps &
  RecordEditorWorkspaceCopyProps &
  RecordEditorWorkspaceDataProps;
