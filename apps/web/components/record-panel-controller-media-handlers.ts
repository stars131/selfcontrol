"use client";

import { createRecordPanelControllerDeadLetterActions } from "./record-panel-controller-dead-letter-actions";
import { createRecordPanelControllerMediaAssetActions } from "./record-panel-controller-media-asset-actions";

export function createRecordPanelControllerMediaHandlers(
  props: Parameters<typeof createRecordPanelControllerMediaAssetActions>[0] &
    Parameters<typeof createRecordPanelControllerDeadLetterActions>[0],
) {
  const mediaAssetActions = createRecordPanelControllerMediaAssetActions(props);
  const deadLetterActions = createRecordPanelControllerDeadLetterActions(props);

  return {
    ...mediaAssetActions,
    ...deadLetterActions,
  };
}
