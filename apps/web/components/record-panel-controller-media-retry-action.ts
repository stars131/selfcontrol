"use client";

import { getRecordPanelDetailBundle } from "../lib/record-panel-detail";
import type { ControllerProps } from "./record-panel-controller.types";
import {
  getRecordPanelMediaStatusErrorMessages,
  runRecordPanelMediaStatusAction,
} from "./record-panel-controller-media-status-helpers";

type DetailCopy = ReturnType<typeof getRecordPanelDetailBundle>["copy"];

export function createRecordPanelControllerMediaRetryAction({
  detailCopy,
  onRetryMedia,
  setError,
  setRetryingMediaId,
}: {
  detailCopy: DetailCopy;
  onRetryMedia: ControllerProps["onRetryMedia"];
  setError: (value: string) => void;
  setRetryingMediaId: (value: string | null) => void;
}) {
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
