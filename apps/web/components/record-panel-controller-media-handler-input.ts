"use client";

import type { RecordPanelControllerHandlerGroupInput } from "./record-panel-controller-handler-group-inputs.types";
import type { RecordPanelControllerMediaHandlerInput } from "./record-panel-controller-media-handler-input.types";

export function buildRecordPanelControllerMediaHandlerInput(
  input: RecordPanelControllerHandlerGroupInput,
): RecordPanelControllerMediaHandlerInput {
  return {
    authToken: input.authToken,
    detailCopy: input.detailCopy,
    mediaDeadLetterOverview: input.mediaDeadLetterOverview,
    onBulkRetryMediaDeadLetter: input.onBulkRetryMediaDeadLetter,
    onDeleteMedia: input.onDeleteMedia,
    onRefreshMediaStatus: input.onRefreshMediaStatus,
    onRetryMedia: input.onRetryMedia,
    onUploadMedia: input.onUploadMedia,
    selectedDeadLetterIds: input.selectedDeadLetterIds,
    selectedRecord: input.selectedRecord,
    setBulkRetryingDeadLetter: input.setBulkRetryingDeadLetter,
    setDeletingMediaId: input.setDeletingMediaId,
    setDownloadingMediaId: input.setDownloadingMediaId,
    setError: input.setError,
    setRefreshingMediaId: input.setRefreshingMediaId,
    setRetryingMediaId: input.setRetryingMediaId,
    setSelectedDeadLetterIds: input.setSelectedDeadLetterIds,
    setUploading: input.setUploading,
    workspaceId: input.workspaceId,
  };
}
