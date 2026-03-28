"use client";
import type { RecordPanelHeaderProps } from "./record-panel-v2-shell-props.types";
import type { BuildRecordPanelHeaderPropsInput } from "./record-panel-v2-header-props.types";
export function buildRecordPanelHeaderProps(input: BuildRecordPanelHeaderPropsInput): RecordPanelHeaderProps {
  return {
    canWriteWorkspace: input.canWriteWorkspace,
    onCreateRecord: () => input.onSelectRecord(null),
    panelCopy: input.panelCopy,
    workspaceId: input.workspaceId,
  };
}
