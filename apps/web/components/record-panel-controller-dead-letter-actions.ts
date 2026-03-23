"use client";

import { canRetryMediaIssue } from "../lib/record-panel-media";
import { getRecordPanelDetailBundle } from "../lib/record-panel-detail";
import type { MediaDeadLetterOverview } from "../lib/types";
import type { ControllerProps } from "./record-panel-controller.types";

type DetailCopy = ReturnType<typeof getRecordPanelDetailBundle>["copy"];

function getErrorMessage(caught: unknown, fallbackMessage: string) {
  return caught instanceof Error ? caught.message : fallbackMessage;
}

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
  function handleToggleDeadLetterSelection(mediaId: string, checked: boolean) {
    setSelectedDeadLetterIds((current) => {
      if (checked) {
        return current.includes(mediaId) ? current : [...current, mediaId];
      }
      return current.filter((item) => item !== mediaId);
    });
  }

  function handleSelectAllDeadLetter() {
    setSelectedDeadLetterIds(
      (mediaDeadLetterOverview?.items ?? [])
        .filter((item) => canRetryMediaIssue(item))
        .map((item) => item.media_id),
    );
  }

  function handleClearDeadLetterSelection() {
    setSelectedDeadLetterIds([]);
  }

  async function handleBulkRetryDeadLetter(mode: "selected" | "all") {
    setBulkRetryingDeadLetter(true);
    setError("");
    try {
      await onBulkRetryMediaDeadLetter(
        mode === "selected"
          ? { mediaIds: selectedDeadLetterIds }
          : { retryStates: ["manual_only", "exhausted", "disabled"], limit: 50 },
      );
      if (mode === "selected") {
        setSelectedDeadLetterIds([]);
      }
    } catch (caught) {
      setError(getErrorMessage(caught, detailCopy.bulkRetryError));
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
