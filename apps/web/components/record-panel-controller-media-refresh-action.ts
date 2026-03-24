"use client";

import {
  getRecordPanelMediaStatusErrorMessages,
  runRecordPanelMediaStatusAction,
} from "./record-panel-controller-media-status-helpers";
import type { RecordPanelControllerMediaRefreshActionInput } from "./record-panel-controller-media-status-action-input.types";

export function createRecordPanelControllerMediaRefreshAction({
  detailCopy,
  onRefreshMediaStatus,
  setError,
  setRefreshingMediaId,
}: RecordPanelControllerMediaRefreshActionInput) {
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

  return {
    handleRefreshMedia,
  };
}
