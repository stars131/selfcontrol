import type { RecordPanelControllerDetailCopy } from "./record-panel-controller-detail-copy.types";

export function getRecordPanelDeadLetterErrorMessage(
  caught: unknown,
  fallbackMessage: string,
) {
  return caught instanceof Error ? caught.message : fallbackMessage;
}

export function getRecordPanelDeadLetterRetryRequest(
  mode: "selected" | "all",
  selectedDeadLetterIds: string[],
) {
  return mode === "selected"
    ? { mediaIds: selectedDeadLetterIds }
    : { retryStates: ["manual_only", "exhausted", "disabled"], limit: 50 };
}

export function getRecordPanelDeadLetterFallbackMessage(detailCopy: RecordPanelControllerDetailCopy) {
  return detailCopy.bulkRetryError;
}
