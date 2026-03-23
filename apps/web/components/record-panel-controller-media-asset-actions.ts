"use client";

import { createRecordPanelControllerMediaFileActions } from "./record-panel-controller-media-file-actions";
import { createRecordPanelControllerMediaStatusActions } from "./record-panel-controller-media-status-actions";

export function createRecordPanelControllerMediaAssetActions({
  ...props
}: Parameters<typeof createRecordPanelControllerMediaFileActions>[0] &
  Parameters<typeof createRecordPanelControllerMediaStatusActions>[0]) {
  const mediaFileActions = createRecordPanelControllerMediaFileActions(props);
  const mediaStatusActions = createRecordPanelControllerMediaStatusActions(props);

  return {
    ...mediaFileActions,
    ...mediaStatusActions,
  };
}
