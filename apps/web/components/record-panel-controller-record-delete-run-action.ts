"use client";
import { getRecordPanelDetailBundle } from "../lib/record-panel-detail";
import type { RecordItem } from "../lib/types";
import type { ControllerProps } from "./record-panel-controller.types";
import { getRecordPanelRecordDeleteErrorMessage, getRecordPanelRecordDeleteFallbackMessage } from "./record-panel-controller-record-delete-helpers";
type DetailCopy = ReturnType<typeof getRecordPanelDetailBundle>["copy"];
export function createRecordPanelControllerRecordDeleteRunAction({
  detailCopy,
  onDeleteRecord,
  selectedRecord,
  setDeleting,
  setError,
}: { detailCopy: DetailCopy; onDeleteRecord: ControllerProps["onDeleteRecord"]; selectedRecord: RecordItem | null; setDeleting: (value: boolean) => void; setError: (value: string) => void }) {
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
