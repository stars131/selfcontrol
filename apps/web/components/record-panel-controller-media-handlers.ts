"use client";

import type { ChangeEvent, Dispatch, SetStateAction } from "react";

import { fetchMediaBlob } from "../lib/api";
import { getRecordPanelDetailBundle } from "../lib/record-panel-detail";
import { canRetryMediaIssue } from "../lib/record-panel-media";
import type { MediaAsset, MediaDeadLetterOverview, RecordItem } from "../lib/types";
import type { ControllerProps } from "./record-panel-controller.types";

type DetailCopy = ReturnType<typeof getRecordPanelDetailBundle>["copy"];

function getErrorMessage(caught: unknown, fallbackMessage: string) {
  return caught instanceof Error ? caught.message : fallbackMessage;
}

export function createRecordPanelControllerMediaHandlers({
  authToken,
  detailCopy,
  mediaDeadLetterOverview,
  onBulkRetryMediaDeadLetter,
  onDeleteMedia,
  onRefreshMediaStatus,
  onRetryMedia,
  onUploadMedia,
  selectedDeadLetterIds,
  selectedRecord,
  setBulkRetryingDeadLetter,
  setDeletingMediaId,
  setDownloadingMediaId,
  setError,
  setRefreshingMediaId,
  setRetryingMediaId,
  setSelectedDeadLetterIds,
  setUploading,
  workspaceId,
}: {
  authToken: string | null;
  detailCopy: DetailCopy;
  mediaDeadLetterOverview: MediaDeadLetterOverview | null;
  onBulkRetryMediaDeadLetter: ControllerProps["onBulkRetryMediaDeadLetter"];
  onDeleteMedia: ControllerProps["onDeleteMedia"];
  onRefreshMediaStatus: ControllerProps["onRefreshMediaStatus"];
  onRetryMedia: ControllerProps["onRetryMedia"];
  onUploadMedia: ControllerProps["onUploadMedia"];
  selectedDeadLetterIds: string[];
  selectedRecord: RecordItem | null;
  setBulkRetryingDeadLetter: Dispatch<SetStateAction<boolean>>;
  setDeletingMediaId: Dispatch<SetStateAction<string | null>>;
  setDownloadingMediaId: Dispatch<SetStateAction<string | null>>;
  setError: Dispatch<SetStateAction<string>>;
  setRefreshingMediaId: Dispatch<SetStateAction<string | null>>;
  setRetryingMediaId: Dispatch<SetStateAction<string | null>>;
  setSelectedDeadLetterIds: Dispatch<SetStateAction<string[]>>;
  setUploading: Dispatch<SetStateAction<boolean>>;
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

  function handleToggleDeadLetterSelection(mediaId: string, checked: boolean) {
    setSelectedDeadLetterIds((current) => {
      if (checked) {
        return current.includes(mediaId) ? current : [...current, mediaId];
      }
      return current.filter((item) => item !== mediaId);
    });
  }

  function handleSelectAllDeadLetter() {
    setSelectedDeadLetterIds(
      (mediaDeadLetterOverview?.items ?? [])
        .filter((item) => canRetryMediaIssue(item))
        .map((item) => item.media_id),
    );
  }

  function handleClearDeadLetterSelection() {
    setSelectedDeadLetterIds([]);
  }

  async function handleBulkRetryDeadLetter(mode: "selected" | "all") {
    setBulkRetryingDeadLetter(true);
    setError("");
    try {
      await onBulkRetryMediaDeadLetter(
        mode === "selected"
          ? { mediaIds: selectedDeadLetterIds }
          : { retryStates: ["manual_only", "exhausted", "disabled"], limit: 50 },
      );
      if (mode === "selected") {
        setSelectedDeadLetterIds([]);
      }
    } catch (caught) {
      setError(getErrorMessage(caught, detailCopy.bulkRetryError));
    } finally {
      setBulkRetryingDeadLetter(false);
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
    handleRefreshMedia,
    handleRetryMediaProcessing,
    handleToggleDeadLetterSelection,
    handleSelectAllDeadLetter,
    handleClearDeadLetterSelection,
    handleBulkRetryDeadLetter,
    handleDownloadMedia,
    handleDeleteMediaAsset,
  };
}
