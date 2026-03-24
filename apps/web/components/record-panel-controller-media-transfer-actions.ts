"use client";
import type { ChangeEvent } from "react";
import { getRecordPanelDetailBundle } from "../lib/record-panel-detail";
import type { MediaAsset, RecordItem } from "../lib/types";
import type { ControllerProps } from "./record-panel-controller.types";
import {
  downloadRecordPanelMediaFile,
  getRecordPanelMediaFileErrorMessage,
  getRecordPanelMediaFileFallbackMessages,
  resolveRecordPanelUploadInput,
} from "./record-panel-controller-media-file-helpers";
type DetailCopy = ReturnType<typeof getRecordPanelDetailBundle>["copy"];
export function createRecordPanelControllerMediaTransferActions({
  authToken,
  detailCopy,
  onUploadMedia,
  selectedRecord,
  setDownloadingMediaId,
  setError,
  setUploading,
  workspaceId,
}: {
  authToken: string | null;
  detailCopy: DetailCopy;
  onUploadMedia: ControllerProps["onUploadMedia"];
  selectedRecord: RecordItem | null;
  setDownloadingMediaId: (value: string | null) => void;
  setError: (value: string) => void;
  setUploading: (value: boolean) => void;
  workspaceId: string;
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
  async function handleDownloadMedia(asset: MediaAsset) {
    if (!authToken) {
      setError(fallbackMessages.notAuthenticated);
      return;
    }
    setDownloadingMediaId(asset.id);
    setError("");
    try {
      await downloadRecordPanelMediaFile({ asset, authToken, workspaceId });
    } catch (caught) {
      setError(getRecordPanelMediaFileErrorMessage(caught, fallbackMessages.downloadMediaError));
    } finally {
      setDownloadingMediaId(null);
    }
  }
  return {
    handleUpload,
    handleDownloadMedia,
  };
}
