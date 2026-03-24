"use client";
import { createRecordPanelLegacyDeleteAction } from "./record-panel-legacy-delete-action";
import { createRecordPanelLegacySubmitAction } from "./record-panel-legacy-submit-action";
import { createRecordPanelLegacyUploadAction } from "./record-panel-legacy-upload-action";
type LegacyActionsInput = Parameters<typeof createRecordPanelLegacyDeleteAction>[0] & Parameters<typeof createRecordPanelLegacySubmitAction>[0] & Parameters<typeof createRecordPanelLegacyUploadAction>[0];
export function createRecordPanelLegacyActions({ ...input }: LegacyActionsInput) {
  const handleSubmit = createRecordPanelLegacySubmitAction(input);
  const handleDelete = createRecordPanelLegacyDeleteAction(input);
  const handleUpload = createRecordPanelLegacyUploadAction(input);
  return { handleSubmit, handleDelete, handleUpload };
}
