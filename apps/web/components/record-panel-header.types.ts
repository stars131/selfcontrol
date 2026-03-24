"use client";
import type { PanelCopy } from "../lib/record-panel-ui";
export type RecordPanelHeaderComponentProps = { canWriteWorkspace: boolean; onCreateRecord: () => void; panelCopy: Pick<PanelCopy, "workspace" | "structuredResults" | "newRecord">; workspaceId: string };
