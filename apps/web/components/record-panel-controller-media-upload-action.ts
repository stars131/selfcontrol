"use client";
import type { ChangeEvent } from "react";
import { getRecordPanelMediaFileErrorMessage, getRecordPanelMediaFileFallbackMessages, resolveRecordPanelUploadInput } from "./record-panel-controller-media-file-helpers";
import type { RecordPanelControllerMediaUploadActionInput } from "./record-panel-controller-media-transfer-action-input.types";

export function createRecordPanelControllerMediaUploadAction({
  detailCopy,
  onUploadMedia,
  selectedRecord,
  setError,
  setUploading,
}: RecordPanelControllerMediaUploadActionInput) {
  const fallbackMessages = getRecordPanelMediaFileFallbackMessages(detailCopy);
  async function handleUpload(event: ChangeEvent<HTMLInputElement>) {
    const uploadInput = resolveRecordPanelUploadInput(event, selectedRecord);
    if (!uploadInput) {
      return;
    }
    setUploading(true);
    setError("");
    try {
      await onUploadMedia(uploadInput.recordId, uploadInput.file);
      event.target.value = "";
    } catch (caught) {
      setError(getRecordPanelMediaFileErrorMessage(caught, fallbackMessages.uploadMediaError));
    } finally {
      setUploading(false);
    }
  }
  return {
    handleUpload,
  };
}
