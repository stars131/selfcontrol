"use client";
import type { RecordPanelShellInput } from "./record-panel-v2-shell-props.types";
import { buildRecordEditorWorkspaceControllerInput } from "./record-panel-v2-editor-workspace-controller-input";
import { buildRecordEditorWorkspacePropInput } from "./record-panel-v2-editor-workspace-prop-input";

export function buildRecordEditorWorkspaceInput({
  controller,
  props,
}: RecordPanelShellInput) {
  return {
    ...buildRecordEditorWorkspacePropInput({ props }),
    ...buildRecordEditorWorkspaceControllerInput({ controller }),
  };
}
