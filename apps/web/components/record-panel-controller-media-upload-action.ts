"use client";
import type { ChangeEvent } from "react";
import { getRecordPanelDetailBundle } from "../lib/record-panel-detail";
import type { RecordItem } from "../lib/types";
import type { ControllerProps } from "./record-panel-controller.types";
import { getRecordPanelMediaFileErrorMessage, getRecordPanelMediaFileFallbackMessages, resolveRecordPanelUploadInput } from "./record-panel-controller-media-file-helpers";
type DetailCopy = ReturnType<typeof getRecordPanelDetailBundle>["copy"];
export function createRecordPanelControllerMediaUploadAction({
  detailCopy,
  onUploadMedia,
  selectedRecord,
  setError,
  setUploading,
}: {
  detailCopy: DetailCopy;
  onUploadMedia: ControllerProps["onUploadMedia"];
  selectedRecord: RecordItem | null;
  setError: (value: string) => void;
  setUploading: (value: boolean) => void;
}) {
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
