"use client";

import type { RecordPanelShellInput } from "./record-panel-v2-shell-props.types";
import { buildRecordBrowseWorkspaceInput } from "./record-panel-v2-browse-workspace-input";
import { buildRecordEditorWorkspaceInput } from "./record-panel-v2-editor-workspace-input";
import { buildRecordPanelHeaderProps } from "./record-panel-v2-header-props";
import {
  buildRecordBrowseWorkspaceProps,
  buildRecordEditorWorkspaceProps,
} from "./record-panel-v2-workspace-props";

export function buildRecordPanelShellViewProps(input: RecordPanelShellInput) {
  const { controller, ...props } = input;
  return {
    browseWorkspaceProps: buildRecordBrowseWorkspaceProps(
      buildRecordBrowseWorkspaceInput({ ...props, ...controller }),
    ),
    editorWorkspaceProps: buildRecordEditorWorkspaceProps(
      buildRecordEditorWorkspaceInput({ ...props, ...controller }),
    ),
    headerProps: buildRecordPanelHeaderProps({
      canWriteWorkspace: props.canWriteWorkspace,
      onSelectRecord: props.onSelectRecord,
      panelCopy: controller.panelCopy,
      workspaceId: props.workspaceId,
    }),
  };
}
