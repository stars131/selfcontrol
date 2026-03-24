"use client";
import type { RecordPanelShellInput } from "./record-panel-v2-shell-props.types";
import { buildRecordBrowseWorkspaceControllerInput } from "./record-panel-v2-browse-workspace-controller-input";
import { buildRecordBrowseWorkspacePropInput } from "./record-panel-v2-browse-workspace-prop-input";

export function buildRecordBrowseWorkspaceInput({
  controller,
  props,
}: RecordPanelShellInput) {
  return {
    ...buildRecordBrowseWorkspacePropInput({ props }),
    ...buildRecordBrowseWorkspaceControllerInput({ controller }),
  };
}
