"use client";
import type { ChangeEvent } from "react";
import { getRecordPanelDetailBundle } from "../lib/record-panel-detail";
import type { MediaAsset, RecordItem } from "../lib/types";
import type { ControllerProps } from "./record-panel-controller.types";
import { downloadRecordPanelMediaFile, getRecordPanelMediaFileErrorMessage, getRecordPanelMediaFileFallbackMessages, resolveRecordPanelUploadInput } from "./record-panel-controller-media-file-helpers";
type DetailCopy = ReturnType<typeof getRecordPanelDetailBundle>["copy"];
export function createRecordPanelControllerMediaFileActions({
  authToken,
  detailCopy,
  onDeleteMedia,
  onUploadMedia,
  selectedRecord,
  setDeletingMediaId,
  setDownloadingMediaId,
  setError,
  setUploading,
  workspaceId,
}: {
  authToken: string | null;
  detailCopy: DetailCopy;
  onDeleteMedia: ControllerProps["onDeleteMedia"];
  onUploadMedia: ControllerProps["onUploadMedia"];
  selectedRecord: RecordItem | null;
  setDeletingMediaId: (value: string | null) => void;
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
    handleUpload,
    handleDownloadMedia,
    handleDeleteMediaAsset,
  };
}
