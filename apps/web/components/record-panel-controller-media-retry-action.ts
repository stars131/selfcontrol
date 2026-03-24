"use client";

import {
  getRecordPanelMediaStatusErrorMessages,
  runRecordPanelMediaStatusAction,
} from "./record-panel-controller-media-status-helpers";
import type { RecordPanelControllerMediaRetryActionInput } from "./record-panel-controller-media-status-action-input.types";

export function createRecordPanelControllerMediaRetryAction({
  detailCopy,
  onRetryMedia,
  setError,
  setRetryingMediaId,
}: RecordPanelControllerMediaRetryActionInput) {
  const errorMessages = getRecordPanelMediaStatusErrorMessages(detailCopy);

  async function handleRetryMediaProcessing(mediaId: string) {
    await runRecordPanelMediaStatusAction({
      action: onRetryMedia,
      fallbackMessage: errorMessages.retryMediaError,
      mediaId,
      setActiveMediaId: setRetryingMediaId,
      setError,
    });
  }

  return {
    handleRetryMediaProcessing,
  };
}
