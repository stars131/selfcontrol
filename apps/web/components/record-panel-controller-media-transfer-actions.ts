"use client";
import { createRecordPanelControllerMediaDownloadAction } from "./record-panel-controller-media-download-action";
import { createRecordPanelControllerMediaUploadAction } from "./record-panel-controller-media-upload-action";

export function createRecordPanelControllerMediaTransferActions({
  ...props
}: Parameters<typeof createRecordPanelControllerMediaDownloadAction>[0] &
  Parameters<typeof createRecordPanelControllerMediaUploadAction>[0]) {
  const mediaDownloadAction = createRecordPanelControllerMediaDownloadAction(props);
  const mediaUploadAction = createRecordPanelControllerMediaUploadAction(props);

  return {
    ...mediaUploadAction,
    ...mediaDownloadAction,
  };
}
