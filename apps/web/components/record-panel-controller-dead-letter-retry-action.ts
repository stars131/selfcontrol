"use client";
import type { RecordPanelControllerDeadLetterRetryActionInput } from "./record-panel-controller-dead-letter-action-input.types";
import { getRecordPanelDeadLetterErrorMessage, getRecordPanelDeadLetterFallbackMessage, getRecordPanelDeadLetterRetryRequest } from "./record-panel-controller-dead-letter-helpers";

export function createRecordPanelControllerDeadLetterRetryAction({
  detailCopy,
  onBulkRetryMediaDeadLetter,
  selectedDeadLetterIds,
  setBulkRetryingDeadLetter,
  setError,
  setSelectedDeadLetterIds,
}: RecordPanelControllerDeadLetterRetryActionInput) {
  const fallbackMessage = getRecordPanelDeadLetterFallbackMessage(detailCopy);
  async function handleBulkRetryDeadLetter(mode: "selected" | "all") {
    setBulkRetryingDeadLetter(true);
    setError("");
    try {
      await onBulkRetryMediaDeadLetter(
        getRecordPanelDeadLetterRetryRequest(mode, selectedDeadLetterIds),
      );
      if (mode === "selected") {
        setSelectedDeadLetterIds([]);
      }
    } catch (caught) {
      setError(getRecordPanelDeadLetterErrorMessage(caught, fallbackMessage));
    } finally {
      setBulkRetryingDeadLetter(false);
    }
  }
  return {
    handleBulkRetryDeadLetter,
  };
}
