"use client";
import { getRecordPanelDetailBundle } from "../lib/record-panel-detail";
import type { MediaDeadLetterOverview } from "../lib/types";
import type { ControllerProps } from "./record-panel-controller.types";
import { getRecordPanelDeadLetterErrorMessage, getRecordPanelDeadLetterFallbackMessage, getRecordPanelDeadLetterRetryRequest, getRecordPanelSelectableDeadLetterIds, toggleRecordPanelDeadLetterSelection } from "./record-panel-controller-dead-letter-helpers";
type DetailCopy = ReturnType<typeof getRecordPanelDetailBundle>["copy"];

export function createRecordPanelControllerDeadLetterActions({
  detailCopy,
  mediaDeadLetterOverview,
  onBulkRetryMediaDeadLetter,
  selectedDeadLetterIds,
  setBulkRetryingDeadLetter,
  setError,
  setSelectedDeadLetterIds,
}: {
  detailCopy: DetailCopy;
  mediaDeadLetterOverview: MediaDeadLetterOverview | null;
  onBulkRetryMediaDeadLetter: ControllerProps["onBulkRetryMediaDeadLetter"];
  selectedDeadLetterIds: string[];
  setBulkRetryingDeadLetter: (value: boolean) => void;
  setError: (value: string) => void;
  setSelectedDeadLetterIds: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const fallbackMessage = getRecordPanelDeadLetterFallbackMessage(detailCopy);
  function handleToggleDeadLetterSelection(mediaId: string, checked: boolean) {
    setSelectedDeadLetterIds((current) => toggleRecordPanelDeadLetterSelection(current, mediaId, checked));
  }
  function handleSelectAllDeadLetter() {
    setSelectedDeadLetterIds(getRecordPanelSelectableDeadLetterIds(mediaDeadLetterOverview));
  }
  function handleClearDeadLetterSelection() {
    setSelectedDeadLetterIds([]);
  }
  async function handleBulkRetryDeadLetter(mode: "selected" | "all") {
    setBulkRetryingDeadLetter(true);
    setError("");
    try {
      await onBulkRetryMediaDeadLetter(getRecordPanelDeadLetterRetryRequest(mode, selectedDeadLetterIds));
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
    handleToggleDeadLetterSelection,
    handleSelectAllDeadLetter,
    handleClearDeadLetterSelection,
    handleBulkRetryDeadLetter,
  };
}
