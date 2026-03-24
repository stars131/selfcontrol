"use client";

import type { RecordPanelShellInput } from "./record-panel-v2-shell-props.types";
import { buildRecordEditorWorkspaceControllerActionInput } from "./record-panel-v2-editor-workspace-controller-action-input";
import { buildRecordEditorWorkspaceControllerDisplayInput } from "./record-panel-v2-editor-workspace-controller-display-input";
import { buildRecordEditorWorkspaceControllerFormatterInput } from "./record-panel-v2-editor-workspace-controller-formatter-input";

export function buildRecordEditorWorkspaceControllerInput({ ...input }: Pick<RecordPanelShellInput, "controller">) {
  return {
    ...buildRecordEditorWorkspaceControllerActionInput(input),
    ...buildRecordEditorWorkspaceControllerDisplayInput(input),
    ...buildRecordEditorWorkspaceControllerFormatterInput(input),
  };
}
