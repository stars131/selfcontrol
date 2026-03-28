"use client";
import type { BuildRecordBrowseWorkspaceControllerInputArgs } from "./record-panel-v2-browse-workspace-controller-input.types";
import { buildRecordBrowseWorkspaceControllerInput } from "./record-panel-v2-browse-workspace-controller-input";
import type { BuildRecordBrowseWorkspacePropInputArgs } from "./record-panel-v2-browse-workspace-prop-input.types";
import { buildRecordBrowseWorkspacePropInput } from "./record-panel-v2-browse-workspace-prop-input";

export function buildRecordBrowseWorkspaceInput(
  input: BuildRecordBrowseWorkspacePropInputArgs & BuildRecordBrowseWorkspaceControllerInputArgs,
) {
  return {
    ...buildRecordBrowseWorkspacePropInput(input),
    ...buildRecordBrowseWorkspaceControllerInput(input),
  };
}
