"use client";

import type { BuildRecordEditorWorkspaceControllerInputArgs } from "./record-panel-v2-editor-workspace-controller-input.types";
import { buildRecordEditorWorkspaceControllerActionInput } from "./record-panel-v2-editor-workspace-controller-action-input";
import { buildRecordEditorWorkspaceControllerDisplayInput } from "./record-panel-v2-editor-workspace-controller-display-input";
import { buildRecordEditorWorkspaceControllerFormatterInput } from "./record-panel-v2-editor-workspace-controller-formatter-input";

export function buildRecordEditorWorkspaceControllerInput({ ...input }: BuildRecordEditorWorkspaceControllerInputArgs) {
  return {
    ...buildRecordEditorWorkspaceControllerActionInput(input),
    ...buildRecordEditorWorkspaceControllerDisplayInput(input),
    ...buildRecordEditorWorkspaceControllerFormatterInput(input),
  };
}
