"use client";

import type { RecordEditorSupportToolsProps } from "./record-editor-support-tools.types";
import { buildRecordMediaToolsCopyProps } from "./record-editor-support-tools-media-copy-props";
import { buildRecordMediaToolsPassThroughProps } from "./record-editor-support-tools-media-pass-through-props";

export function buildRecordMediaToolsProps(input: RecordEditorSupportToolsProps) {
  const copyProps = buildRecordMediaToolsCopyProps(input);
  const passThroughProps = buildRecordMediaToolsPassThroughProps(input);

  return {
    ...copyProps,
    ...passThroughProps,
  };
}
