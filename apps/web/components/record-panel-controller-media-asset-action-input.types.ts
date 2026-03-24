"use client";

import type { RecordPanelControllerMediaFileActionInput } from "./record-panel-controller-media-file-action-input.types";
import type { RecordPanelControllerMediaStatusActionInput } from "./record-panel-controller-media-status-action-input.types";

export type RecordPanelControllerMediaAssetActionInput =
  RecordPanelControllerMediaFileActionInput &
  RecordPanelControllerMediaStatusActionInput;
