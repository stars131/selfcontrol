"use client";
import type { RecordPanelHeaderProps } from "./record-panel-v2-shell-props.types";
import type { BuildRecordPanelHeaderPropsInput } from "./record-panel-v2-header-props.types";
export function buildRecordPanelHeaderProps({ canWriteWorkspace, onSelectRecord, panelCopy, workspaceId }: BuildRecordPanelHeaderPropsInput): RecordPanelHeaderProps {
  return {
    canWriteWorkspace,
    onCreateRecord: () => onSelectRecord(null),
    panelCopy,
    workspaceId,
  };
}
