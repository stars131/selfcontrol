"use client";

import {
  buildRecordPanelControllerMediaHandlerInput,
  buildRecordPanelControllerRecordHandlerInput,
  type RecordPanelControllerHandlerGroupInput,
} from "./record-panel-controller-handler-group-inputs";
import { createRecordPanelControllerMediaHandlers } from "./record-panel-controller-media-handlers";
import { createRecordPanelControllerRecordHandlers } from "./record-panel-controller-record-handlers";

export function createRecordPanelControllerHandlerGroups(
  input: RecordPanelControllerHandlerGroupInput,
) {
  const recordHandlers = createRecordPanelControllerRecordHandlers(
    buildRecordPanelControllerRecordHandlerInput(input),
  );
  const mediaHandlers = createRecordPanelControllerMediaHandlers(
    buildRecordPanelControllerMediaHandlerInput(input),
  );

  return {
    recordHandlers,
    mediaHandlers,
  };
}
