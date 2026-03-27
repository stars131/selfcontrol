import { resolveErrorMessage } from "../lib/error-message";
import type { RecordPanelControllerDetailCopy } from "./record-panel-controller-detail-copy.types";

export function getRecordPanelRecordDeleteErrorMessage(
  caught: unknown,
  fallbackMessage: string,
) {
  return resolveErrorMessage(caught, fallbackMessage);
}

export function getRecordPanelRecordDeleteFallbackMessage(detailCopy: RecordPanelControllerDetailCopy) {
  return detailCopy.deleteRecordError;
}
