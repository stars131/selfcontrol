"use client";
import { getRecordPanelDetailBundle } from "../lib/record-panel-detail";
import type { ControllerProps } from "./record-panel-controller.types";
import {
  getRecordPanelMediaStatusErrorMessages,
  runRecordPanelMediaStatusAction,
} from "./record-panel-controller-media-status-helpers";
type DetailCopy = ReturnType<typeof getRecordPanelDetailBundle>["copy"];

export function createRecordPanelControllerMediaStatusActions({
  detailCopy,
  onRefreshMediaStatus,
  onRetryMedia,
  setError,
  setRefreshingMediaId,
  setRetryingMediaId,
}: {
  detailCopy: DetailCopy;
  onRefreshMediaStatus: ControllerProps["onRefreshMediaStatus"];
  onRetryMedia: ControllerProps["onRetryMedia"];
  setError: (value: string) => void;
  setRefreshingMediaId: (value: string | null) => void;
  setRetryingMediaId: (value: string | null) => void;
}) {
  const errorMessages = getRecordPanelMediaStatusErrorMessages(detailCopy);

  async function handleRefreshMedia(mediaId: string) {
    await runRecordPanelMediaStatusAction({
      action: onRefreshMediaStatus,
      fallbackMessage: errorMessages.refreshMediaError,
      mediaId,
      setActiveMediaId: setRefreshingMediaId,
      setError,
    });
  }

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
    handleRefreshMedia,
    handleRetryMediaProcessing,
  };
}
