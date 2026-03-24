"use client";
import { createRecordPanelControllerMediaDownloadAction } from "./record-panel-controller-media-download-action";
import { createRecordPanelControllerMediaUploadAction } from "./record-panel-controller-media-upload-action";
import type { RecordPanelControllerMediaTransferActionInput } from "./record-panel-controller-media-transfer-action-input.types";

export function createRecordPanelControllerMediaTransferActions({
  ...props
}: RecordPanelControllerMediaTransferActionInput) {
  const mediaDownloadAction = createRecordPanelControllerMediaDownloadAction(props);
  const mediaUploadAction = createRecordPanelControllerMediaUploadAction(props);

  return {
    ...mediaUploadAction,
    ...mediaDownloadAction,
  };
}
