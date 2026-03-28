"use client";

import { createRecordPanelControllerMediaDeleteAction } from "./record-panel-controller-media-delete-action";
import { createRecordPanelControllerMediaTransferActions } from "./record-panel-controller-media-transfer-actions";
import type { RecordPanelControllerMediaFileActionInput } from "./record-panel-controller-media-file-action-input.types";

export function createRecordPanelControllerMediaFileActions({
  ...input
}: RecordPanelControllerMediaFileActionInput) {
  const mediaTransferActions = createRecordPanelControllerMediaTransferActions(input);
  const mediaDeleteAction = createRecordPanelControllerMediaDeleteAction(input);

  return {
    ...mediaTransferActions,
    ...mediaDeleteAction,
  };
}
