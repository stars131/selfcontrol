import { getRecordPanelDetailBundle } from "../lib/record-panel-detail";

type DetailCopy = ReturnType<typeof getRecordPanelDetailBundle>["copy"];

export function getRecordPanelMediaStatusErrorMessage(
  caught: unknown,
  fallbackMessage: string,
) {
  return caught instanceof Error ? caught.message : fallbackMessage;
}

export function getRecordPanelMediaStatusErrorMessages(detailCopy: DetailCopy) {
  return {
    refreshMediaError: detailCopy.refreshMediaError,
    retryMediaError: detailCopy.retryMediaError,
  };
}
