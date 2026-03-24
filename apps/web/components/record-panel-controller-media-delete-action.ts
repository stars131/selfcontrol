"use client";
import { getRecordPanelDetailBundle } from "../lib/record-panel-detail";
import type { ControllerProps } from "./record-panel-controller.types";
import {
  getRecordPanelMediaFileErrorMessage,
  getRecordPanelMediaFileFallbackMessages,
} from "./record-panel-controller-media-file-helpers";
type DetailCopy = ReturnType<typeof getRecordPanelDetailBundle>["copy"];
export function createRecordPanelControllerMediaDeleteAction({
  detailCopy,
  onDeleteMedia,
  setDeletingMediaId,
  setError,
}: {
  detailCopy: DetailCopy;
  onDeleteMedia: ControllerProps["onDeleteMedia"];
  setDeletingMediaId: (value: string | null) => void;
  setError: (value: string) => void;
}) {
  const fallbackMessages = getRecordPanelMediaFileFallbackMessages(detailCopy);
  async function handleDeleteMediaAsset(mediaId: string) {
    setDeletingMediaId(mediaId);
    setError("");
    try {
      await onDeleteMedia(mediaId);
    } catch (caught) {
      setError(getRecordPanelMediaFileErrorMessage(caught, fallbackMessages.deleteMediaError));
    } finally {
      setDeletingMediaId(null);
    }
  }
  return {
    handleDeleteMediaAsset,
  };
}
