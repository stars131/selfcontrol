"use client";
import { getRecordPanelRecordDeleteErrorMessage, getRecordPanelRecordDeleteFallbackMessage } from "./record-panel-controller-record-delete-helpers";
import type { RecordPanelControllerRecordDeleteActionInput } from "./record-panel-controller-record-delete-action-input.types";

export function createRecordPanelControllerRecordDeleteRunAction({
  detailCopy,
  onDeleteRecord,
  selectedRecord,
  setDeleting,
  setError,
}: RecordPanelControllerRecordDeleteActionInput) {
  const fallbackMessage = getRecordPanelRecordDeleteFallbackMessage(detailCopy);
  async function handleDelete() {
    if (!selectedRecord) {
      return;
    }
    setDeleting(true);
    setError("");
    try {
      await onDeleteRecord(selectedRecord.id);
    } catch (caught) {
      setError(getRecordPanelRecordDeleteErrorMessage(caught, fallbackMessage));
    } finally {
      setDeleting(false);
    }
  }
  return { handleDelete };
}
