import { getRecordPanelDetailBundle } from "../lib/record-panel-detail";

type DetailCopy = ReturnType<typeof getRecordPanelDetailBundle>["copy"];

export function getRecordPanelRecordDeleteErrorMessage(
  caught: unknown,
  fallbackMessage: string,
) {
  return caught instanceof Error ? caught.message : fallbackMessage;
}

export function getRecordPanelRecordDeleteFallbackMessage(detailCopy: DetailCopy) {
  return detailCopy.deleteRecordError;
}
