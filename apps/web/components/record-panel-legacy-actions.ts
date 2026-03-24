"use client";
import { createRecordPanelLegacyDeleteAction } from "./record-panel-legacy-delete-action";
import { createRecordPanelLegacySubmitAction } from "./record-panel-legacy-submit-action";
import { createRecordPanelLegacyUploadAction } from "./record-panel-legacy-upload-action";
import type { LegacyActionsInput } from "./record-panel-legacy-action-input.types";
export function createRecordPanelLegacyActions({ ...input }: LegacyActionsInput) {
  const handleSubmit = createRecordPanelLegacySubmitAction(input);
  const handleDelete = createRecordPanelLegacyDeleteAction(input);
  const handleUpload = createRecordPanelLegacyUploadAction(input);
  return { handleSubmit, handleDelete, handleUpload };
}
