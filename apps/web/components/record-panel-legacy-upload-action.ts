"use client";
import type { ChangeEvent } from "react";
import { getRecordPanelErrorMessage } from "./record-panel-legacy-action-error";
import type { RecordPanelLegacyUploadActionInput } from "./record-panel-legacy-action-input.types";
export function createRecordPanelLegacyUploadAction({
  onUploadMedia,
  selectedRecord,
  setError,
  setUploading,
}: RecordPanelLegacyUploadActionInput) {
  return async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !selectedRecord) {
      return;
    }
    setUploading(true);
    setError("");
    try {
      await onUploadMedia(selectedRecord.id, file);
      event.target.value = "";
    } catch (caught) {
      setError(getRecordPanelErrorMessage(caught, "Failed to upload media"));
    } finally {
      setUploading(false);
    }
  };
}
