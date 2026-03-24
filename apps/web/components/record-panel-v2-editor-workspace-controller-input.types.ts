import type { RecordPanelController } from "./record-panel-v2-shell-props.types";
import type { BuildRecordEditorWorkspaceControllerActionInput } from "./record-panel-v2-editor-workspace-controller-action-input.types";
import type { BuildRecordEditorWorkspaceControllerDisplayInput } from "./record-panel-v2-editor-workspace-controller-display-input.types";
import type { BuildRecordEditorWorkspaceControllerFormatterInput } from "./record-panel-v2-editor-workspace-controller-formatter-input.types";

export type BuildRecordEditorWorkspaceControllerInputArgs = { controller: RecordPanelController };
export type BuildRecordEditorWorkspaceControllerInput = BuildRecordEditorWorkspaceControllerActionInput & BuildRecordEditorWorkspaceControllerDisplayInput & BuildRecordEditorWorkspaceControllerFormatterInput;
