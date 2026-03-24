"use client";
import { buildRecordPanelControllerHandlerGroupsPropsInput } from "./record-panel-controller-handler-groups-props-input";
import { buildRecordPanelControllerHandlerGroupsStateInput } from "./record-panel-controller-handler-groups-state-input";
import { buildRecordPanelControllerHandlerGroupsViewDataInput } from "./record-panel-controller-handler-groups-view-data-input";
import type { RecordPanelControllerHandlerGroupsInputArgs } from "./record-panel-controller-handler-groups-input.types";

export function buildRecordPanelControllerHandlerGroupsInput({
  props,
  state,
  viewData,
}: RecordPanelControllerHandlerGroupsInputArgs) {
  return {
    ...buildRecordPanelControllerHandlerGroupsPropsInput(props),
    ...buildRecordPanelControllerHandlerGroupsStateInput(state),
    ...buildRecordPanelControllerHandlerGroupsViewDataInput(viewData),
  };
}
