"use client";

import { createRecordPanelControllerMediaDeleteAction } from "./record-panel-controller-media-delete-action";
import { createRecordPanelControllerMediaTransferActions } from "./record-panel-controller-media-transfer-actions";
import type { RecordPanelControllerMediaFileActionInput } from "./record-panel-controller-media-file-action-input.types";

export function createRecordPanelControllerMediaFileActions({
  ...props
}: RecordPanelControllerMediaFileActionInput) {
  const mediaTransferActions = createRecordPanelControllerMediaTransferActions(props);
  const mediaDeleteAction = createRecordPanelControllerMediaDeleteAction(props);

  return {
    ...mediaTransferActions,
    ...mediaDeleteAction,
  };
}
