"use client";
import { createRecordPanelControllerMediaDownloadAction } from "./record-panel-controller-media-download-action";
import { createRecordPanelControllerMediaUploadAction } from "./record-panel-controller-media-upload-action";
import type { RecordPanelControllerMediaTransferActionInput } from "./record-panel-controller-media-transfer-action-input.types";

export function createRecordPanelControllerMediaTransferActions({
  ...input
}: RecordPanelControllerMediaTransferActionInput) {
  const mediaDownloadAction = createRecordPanelControllerMediaDownloadAction(input);
  const mediaUploadAction = createRecordPanelControllerMediaUploadAction(input);

  return {
    ...mediaUploadAction,
    ...mediaDownloadAction,
  };
}
