"use client";

import { getRecordPanelDetailBundle } from "../lib/record-panel-detail";
import type { RecordItem } from "../lib/types";
import type { ControllerProps } from "./record-panel-controller.types";

type DetailCopy = ReturnType<typeof getRecordPanelDetailBundle>["copy"];

function getErrorMessage(caught: unknown, fallbackMessage: string) {
  return caught instanceof Error ? caught.message : fallbackMessage;
}

export function createRecordPanelControllerRecordDeleteActions({
  detailCopy,
  onDeleteRecord,
  selectedRecord,
  setDeleting,
  setError,
}: {
  detailCopy: DetailCopy;
  onDeleteRecord: ControllerProps["onDeleteRecord"];
  selectedRecord: RecordItem | null;
  setDeleting: (value: boolean) => void;
  setError: (value: string) => void;
}) {
  async function handleDelete() {
    if (!selectedRecord) {
      return;
    }
    setDeleting(true);
    setError("");
    try {
      await onDeleteRecord(selectedRecord.id);
    } catch (caught) {
      setError(getErrorMessage(caught, detailCopy.deleteRecordError));
    } finally {
      setDeleting(false);
    }
  }

  return {
    handleDelete,
  };
}
