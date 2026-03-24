"use client";
import { getRecordPanelErrorMessage } from "./record-panel-legacy-action-error";
import type { RecordPanelLegacyDeleteActionInput } from "./record-panel-legacy-action-input.types";
export function createRecordPanelLegacyDeleteAction({
  onDeleteRecord,
  selectedRecord,
  setDeleting,
  setError,
}: RecordPanelLegacyDeleteActionInput) {
  return async () => {
    if (!selectedRecord) {
      return;
    }
    setDeleting(true);
    setError("");
    try {
      await onDeleteRecord(selectedRecord.id);
    } catch (caught) {
      setError(getRecordPanelErrorMessage(caught, "Failed to delete record"));
    } finally {
      setDeleting(false);
    }
  };
}
