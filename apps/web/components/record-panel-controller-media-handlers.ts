"use client";

import { createRecordPanelControllerDeadLetterActions } from "./record-panel-controller-dead-letter-actions";
import { createRecordPanelControllerMediaAssetActions } from "./record-panel-controller-media-asset-actions";
import type { RecordPanelControllerMediaHandlerInput } from "./record-panel-controller-media-handler-input.types";

export function createRecordPanelControllerMediaHandlers(
  props: RecordPanelControllerMediaHandlerInput,
) {
  const mediaAssetActions = createRecordPanelControllerMediaAssetActions(props);
  const deadLetterActions = createRecordPanelControllerDeadLetterActions(props);

  return {
    ...mediaAssetActions,
    ...deadLetterActions,
  };
}
