"use client";
import { getStoredLocale } from "../lib/locale";
import { getRecordPanelDetailBundle } from "../lib/record-panel-detail";
import { getRecordPanelErrorMessage } from "./record-panel-legacy-action-error";
import type { RecordPanelLegacyDeleteActionInput } from "./record-panel-legacy-action-input.types";
export function createRecordPanelLegacyDeleteAction({
  onDeleteRecord,
  selectedRecord,
  setDeleting,
  setError,
}: RecordPanelLegacyDeleteActionInput) {
  const detailCopy = getRecordPanelDetailBundle(getStoredLocale()).copy;
  return async () => {
    if (!selectedRecord) {
      return;
    }
    setDeleting(true);
    setError("");
    try {
      await onDeleteRecord(selectedRecord.id);
    } catch (caught) {
      setError(getRecordPanelErrorMessage(caught, detailCopy.deleteRecordError));
    } finally {
      setDeleting(false);
    }
  };
}
