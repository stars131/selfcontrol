"use client";

import { getRecordPanelDetailBundle } from "../lib/record-panel-detail";
import type { ControllerProps } from "./record-panel-controller.types";
import {
  getRecordPanelMediaStatusErrorMessages,
  runRecordPanelMediaStatusAction,
} from "./record-panel-controller-media-status-helpers";

type DetailCopy = ReturnType<typeof getRecordPanelDetailBundle>["copy"];

export function createRecordPanelControllerMediaRefreshAction({
  detailCopy,
  onRefreshMediaStatus,
  setError,
  setRefreshingMediaId,
}: {
  detailCopy: DetailCopy;
  onRefreshMediaStatus: ControllerProps["onRefreshMediaStatus"];
  setError: (value: string) => void;
  setRefreshingMediaId: (value: string | null) => void;
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

  return {
    handleRefreshMedia,
  };
}
