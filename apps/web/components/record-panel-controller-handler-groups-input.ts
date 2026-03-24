"use client";
import { buildRecordPanelControllerHandlerGroupsPropsInput } from "./record-panel-controller-handler-groups-props-input";
import { buildRecordPanelControllerHandlerGroupsStateInput } from "./record-panel-controller-handler-groups-state-input";
import { buildRecordPanelControllerHandlerGroupsViewDataInput } from "./record-panel-controller-handler-groups-view-data-input";
type ControllerHandlerGroupsInputArgs = {
  props: Parameters<typeof buildRecordPanelControllerHandlerGroupsPropsInput>[0];
  state: Parameters<typeof buildRecordPanelControllerHandlerGroupsStateInput>[0];
  viewData: Parameters<typeof buildRecordPanelControllerHandlerGroupsViewDataInput>[0];
};

export function buildRecordPanelControllerHandlerGroupsInput({
  props,
  state,
  viewData,
}: ControllerHandlerGroupsInputArgs) {
  return {
    ...buildRecordPanelControllerHandlerGroupsPropsInput(props),
    ...buildRecordPanelControllerHandlerGroupsStateInput(state),
    ...buildRecordPanelControllerHandlerGroupsViewDataInput(viewData),
  };
}
