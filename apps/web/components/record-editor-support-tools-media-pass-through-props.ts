"use client";

import type { RecordEditorSupportToolsProps } from "./record-editor-support-tools.types";

export function buildRecordMediaToolsPassThroughProps(input: RecordEditorSupportToolsProps) {
  const { selectedRecord, panelCopy, ...passThroughProps } = input;
  void selectedRecord;
  void panelCopy;
  return passThroughProps;
}
