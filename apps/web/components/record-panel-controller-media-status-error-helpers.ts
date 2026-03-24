import type { RecordPanelControllerDetailCopy } from "./record-panel-controller-detail-copy.types";

export function getRecordPanelMediaStatusErrorMessage(
  caught: unknown,
  fallbackMessage: string,
) {
  return caught instanceof Error ? caught.message : fallbackMessage;
}

export function getRecordPanelMediaStatusErrorMessages(detailCopy: RecordPanelControllerDetailCopy) {
  return {
    refreshMediaError: detailCopy.refreshMediaError,
    retryMediaError: detailCopy.retryMediaError,
  };
}
