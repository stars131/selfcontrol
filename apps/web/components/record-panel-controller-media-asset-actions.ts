"use client";

import { createRecordPanelControllerMediaFileActions } from "./record-panel-controller-media-file-actions";
import { createRecordPanelControllerMediaStatusActions } from "./record-panel-controller-media-status-actions";
import type { RecordPanelControllerMediaAssetActionInput } from "./record-panel-controller-media-asset-action-input.types";

export function createRecordPanelControllerMediaAssetActions({
  ...input
}: RecordPanelControllerMediaAssetActionInput) {
  const mediaFileActions = createRecordPanelControllerMediaFileActions(input);
  const mediaStatusActions = createRecordPanelControllerMediaStatusActions(input);

  return {
    ...mediaFileActions,
    ...mediaStatusActions,
  };
}
