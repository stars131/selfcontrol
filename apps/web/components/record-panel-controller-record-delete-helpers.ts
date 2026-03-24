import type { RecordPanelControllerDetailCopy } from "./record-panel-controller-detail-copy.types";

export function getRecordPanelRecordDeleteErrorMessage(
  caught: unknown,
  fallbackMessage: string,
) {
  return caught instanceof Error ? caught.message : fallbackMessage;
}

export function getRecordPanelRecordDeleteFallbackMessage(detailCopy: RecordPanelControllerDetailCopy) {
  return detailCopy.deleteRecordError;
}
