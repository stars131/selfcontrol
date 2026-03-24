"use client";

import type { RecordEditorSupportToolsProps } from "./record-editor-support-tools.types";

export function buildRecordMediaToolsPassThroughProps({
  selectedRecord,
  panelCopy,
  ...passThroughProps
}: RecordEditorSupportToolsProps) {
  void selectedRecord;
  void panelCopy;
  return passThroughProps;
}
