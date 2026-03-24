"use client";
import { getRecordPanelDetailBundle } from "../lib/record-panel-detail";
import type { ControllerProps } from "./record-panel-controller.types";
import { getRecordPanelDeadLetterErrorMessage, getRecordPanelDeadLetterFallbackMessage, getRecordPanelDeadLetterRetryRequest } from "./record-panel-controller-dead-letter-helpers";
type DetailCopy = ReturnType<typeof getRecordPanelDetailBundle>["copy"];
export function createRecordPanelControllerDeadLetterRetryAction({
  detailCopy,
  onBulkRetryMediaDeadLetter,
  selectedDeadLetterIds,
  setBulkRetryingDeadLetter,
  setError,
  setSelectedDeadLetterIds,
}: {
  detailCopy: DetailCopy;
  onBulkRetryMediaDeadLetter: ControllerProps["onBulkRetryMediaDeadLetter"];
  selectedDeadLetterIds: string[];
  setBulkRetryingDeadLetter: (value: boolean) => void;
  setError: (value: string) => void;
  setSelectedDeadLetterIds: React.Dispatch<React.SetStateAction<string[]>>;
}) {
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
