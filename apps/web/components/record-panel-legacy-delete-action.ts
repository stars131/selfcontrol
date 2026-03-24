"use client";
import type { RecordItem } from "../lib/types";
import type { RecordPanelProps } from "./record-panel.types";
import { getRecordPanelErrorMessage } from "./record-panel-legacy-action-error";
export function createRecordPanelLegacyDeleteAction({
  onDeleteRecord,
  selectedRecord,
  setDeleting,
  setError,
}: { onDeleteRecord: RecordPanelProps["onDeleteRecord"]; selectedRecord: RecordItem | null; setDeleting: (value: boolean) => void; setError: (value: string) => void }) {
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
