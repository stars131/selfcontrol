"use client";

import type { RecordPanelControllerDeadLetterActionInput } from "./record-panel-controller-dead-letter-action-input.types";
import type { RecordPanelControllerMediaAssetActionInput } from "./record-panel-controller-media-asset-action-input.types";

export type RecordPanelControllerMediaHandlerInput =
  RecordPanelControllerMediaAssetActionInput &
  RecordPanelControllerDeadLetterActionInput;
