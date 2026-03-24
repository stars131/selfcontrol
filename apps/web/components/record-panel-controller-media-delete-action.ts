"use client";
import {
  getRecordPanelMediaFileErrorMessage,
  getRecordPanelMediaFileFallbackMessages,
} from "./record-panel-controller-media-file-helpers";
import type { RecordPanelControllerMediaDeleteActionInput } from "./record-panel-controller-media-file-action-input.types";

export function createRecordPanelControllerMediaDeleteAction({
  detailCopy,
  onDeleteMedia,
  setDeletingMediaId,
  setError,
}: RecordPanelControllerMediaDeleteActionInput) {
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
