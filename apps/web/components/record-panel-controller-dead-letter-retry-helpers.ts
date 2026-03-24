import { getRecordPanelDetailBundle } from "../lib/record-panel-detail";

type DetailCopy = ReturnType<typeof getRecordPanelDetailBundle>["copy"];

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

export function getRecordPanelDeadLetterFallbackMessage(detailCopy: DetailCopy) {
  return detailCopy.bulkRetryError;
}
