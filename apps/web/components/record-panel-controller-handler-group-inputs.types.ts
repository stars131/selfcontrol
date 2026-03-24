"use client";

import type { RecordPanelControllerHandlerGroupPropsInput } from "./record-panel-controller-handler-group-props-input.types";
import type { RecordPanelControllerHandlerGroupStateInput } from "./record-panel-controller-handler-group-state-input.types";
import type { RecordPanelControllerHandlerGroupViewDataInput } from "./record-panel-controller-handler-group-view-data-input.types";

export type RecordPanelControllerHandlerGroupInput =
  RecordPanelControllerHandlerGroupPropsInput &
    RecordPanelControllerHandlerGroupStateInput &
    RecordPanelControllerHandlerGroupViewDataInput;
