"use client";

import type { ChangeEvent } from "react";

import { fetchMediaBlob } from "../lib/api";
import { getRecordPanelDetailBundle } from "../lib/record-panel-detail";
import type { MediaAsset, RecordItem } from "../lib/types";
import type { ControllerProps } from "./record-panel-controller.types";

type DetailCopy = ReturnType<typeof getRecordPanelDetailBundle>["copy"];

function getErrorMessage(caught: unknown, fallbackMessage: string) {
  return caught instanceof Error ? caught.message : fallbackMessage;
}

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
  async function handleUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file || !selectedRecord) {
      return;
    }
    setUploading(true);
    setError("");
    try {
      await onUploadMedia(selectedRecord.id, file);
      event.target.value = "";
    } catch (caught) {
      setError(getErrorMessage(caught, detailCopy.uploadMediaError));
    } finally {
      setUploading(false);
    }
  }

  async function handleDownloadMedia(asset: MediaAsset) {
    if (!authToken) {
      setError(detailCopy.notAuthenticated);
      return;
    }

    setDownloadingMediaId(asset.id);
    setError("");
    try {
      const blob = await fetchMediaBlob(authToken, workspaceId, asset.id);
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = asset.original_filename || `${asset.id}.bin`;
      anchor.click();
      URL.revokeObjectURL(url);
    } catch (caught) {
      setError(getErrorMessage(caught, detailCopy.downloadMediaError));
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
      setError(getErrorMessage(caught, detailCopy.deleteMediaError));
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
