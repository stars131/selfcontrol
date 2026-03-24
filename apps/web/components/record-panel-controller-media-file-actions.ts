"use client";

import { createRecordPanelControllerMediaDeleteAction } from "./record-panel-controller-media-delete-action";
import { createRecordPanelControllerMediaTransferActions } from "./record-panel-controller-media-transfer-actions";

export function createRecordPanelControllerMediaFileActions({
  ...props
}: Parameters<typeof createRecordPanelControllerMediaDeleteAction>[0] &
  Parameters<typeof createRecordPanelControllerMediaTransferActions>[0]) {
  const mediaTransferActions = createRecordPanelControllerMediaTransferActions(props);
  const mediaDeleteAction = createRecordPanelControllerMediaDeleteAction(props);

  return {
    ...mediaTransferActions,
    ...mediaDeleteAction,
  };
}
