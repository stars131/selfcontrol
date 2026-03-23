"use client";

import { getRecordPanelDetailBundle } from "../lib/record-panel-detail";
import type { ControllerProps } from "./record-panel-controller.types";

type DetailCopy = ReturnType<typeof getRecordPanelDetailBundle>["copy"];

function getErrorMessage(caught: unknown, fallbackMessage: string) {
  return caught instanceof Error ? caught.message : fallbackMessage;
}

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
  async function handleRefreshMedia(mediaId: string) {
    setRefreshingMediaId(mediaId);
    setError("");
    try {
      await onRefreshMediaStatus(mediaId);
    } catch (caught) {
      setError(getErrorMessage(caught, detailCopy.refreshMediaError));
    } finally {
      setRefreshingMediaId(null);
    }
  }

  async function handleRetryMediaProcessing(mediaId: string) {
    setRetryingMediaId(mediaId);
    setError("");
    try {
      await onRetryMedia(mediaId);
    } catch (caught) {
      setError(getErrorMessage(caught, detailCopy.retryMediaError));
    } finally {
      setRetryingMediaId(null);
    }
  }

  return {
    handleRefreshMedia,
    handleRetryMediaProcessing,
  };
}
