"use client";
import type { RecordPanelHeaderProps } from "./record-panel-v2-shell-props.types";
import type { RecordPanelV2Props } from "./record-panel-v2.types";
export type BuildRecordPanelHeaderPropsInput = { canWriteWorkspace: boolean; onSelectRecord: RecordPanelV2Props["onSelectRecord"]; panelCopy: RecordPanelHeaderProps["panelCopy"]; workspaceId: string };
