import type { BuildRecordEditorWorkspaceControllerActionInput } from "./record-panel-v2-editor-workspace-controller-action-input.types";
import type { BuildRecordEditorWorkspaceControllerDisplayInput } from "./record-panel-v2-editor-workspace-controller-display-input.types";
import type { BuildRecordEditorWorkspaceControllerFormatterInput } from "./record-panel-v2-editor-workspace-controller-formatter-input.types";

export type BuildRecordEditorWorkspaceControllerInput =
  BuildRecordEditorWorkspaceControllerActionInput &
  BuildRecordEditorWorkspaceControllerDisplayInput &
  BuildRecordEditorWorkspaceControllerFormatterInput;
