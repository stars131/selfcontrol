"use client";

import type {
  RecordPanelHeaderProps,
} from "./record-panel-v2-shell-props.types";
import type { RecordPanelV2Props } from "./record-panel-v2.types";

export function buildRecordPanelHeaderProps({
  canWriteWorkspace,
  onSelectRecord,
  panelCopy,
  workspaceId,
}: {
  canWriteWorkspace: boolean;
  onSelectRecord: RecordPanelV2Props["onSelectRecord"];
  panelCopy: RecordPanelHeaderProps["panelCopy"];
  workspaceId: string;
}): RecordPanelHeaderProps {
  return {
    canWriteWorkspace,
    onCreateRecord: () => onSelectRecord(null),
    panelCopy,
    workspaceId,
  };
}
