import { resolveErrorMessage } from "../lib/error-message";
import type { RecordPanelControllerDetailCopy } from "./record-panel-controller-detail-copy.types";

export function getRecordPanelMediaStatusErrorMessage(
  caught: unknown,
  fallbackMessage: string,
) {
  return resolveErrorMessage(caught, fallbackMessage);
}

export function getRecordPanelMediaStatusErrorMessages(detailCopy: RecordPanelControllerDetailCopy) {
  return {
    refreshMediaError: detailCopy.refreshMediaError,
    retryMediaError: detailCopy.retryMediaError,
  };
}
