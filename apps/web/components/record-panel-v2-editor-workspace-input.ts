"use client";
import type { BuildRecordEditorWorkspaceControllerInputArgs } from "./record-panel-v2-editor-workspace-controller-input.types";
import { buildRecordEditorWorkspaceControllerInput } from "./record-panel-v2-editor-workspace-controller-input";
import type { BuildRecordEditorWorkspacePropInputArgs } from "./record-panel-v2-editor-workspace-prop-input.types";
import { buildRecordEditorWorkspacePropInput } from "./record-panel-v2-editor-workspace-prop-input";

export function buildRecordEditorWorkspaceInput(
  input: BuildRecordEditorWorkspacePropInputArgs & BuildRecordEditorWorkspaceControllerInputArgs,
) {
  return {
    ...buildRecordEditorWorkspacePropInput(input),
    ...buildRecordEditorWorkspaceControllerInput(input),
  };
}
