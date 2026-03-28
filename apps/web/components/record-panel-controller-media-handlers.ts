"use client";

import { createRecordPanelControllerDeadLetterActions } from "./record-panel-controller-dead-letter-actions";
import { createRecordPanelControllerMediaAssetActions } from "./record-panel-controller-media-asset-actions";
import type { RecordPanelControllerMediaHandlerInput } from "./record-panel-controller-media-handler-input.types";

export function createRecordPanelControllerMediaHandlers(
  input: RecordPanelControllerMediaHandlerInput,
) {
  const mediaAssetActions = createRecordPanelControllerMediaAssetActions(input);
  const deadLetterActions = createRecordPanelControllerDeadLetterActions(input);

  return {
    ...mediaAssetActions,
    ...deadLetterActions,
  };
}
