"use client";

import type { ControllerProps } from "./record-panel-controller.types";
import { buildRecordPanelControllerHandlerGroupsInput } from "./record-panel-controller-handler-groups-input";
import { createRecordPanelControllerHandlerGroups } from "./record-panel-controller-handler-groups";
import { buildRecordPanelControllerResult } from "./record-panel-controller-result";
import { useRecordPanelControllerSync } from "./use-record-panel-controller-sync";
import { useRecordPanelControllerState } from "./use-record-panel-controller-state";
import { useRecordPanelControllerViewData } from "./use-record-panel-controller-view-data";

export function useRecordPanelController(props: ControllerProps) {
  const viewData = useRecordPanelControllerViewData({
    mediaAssets: props.mediaAssets,
    mediaDeadLetterOverview: props.mediaDeadLetterOverview,
    records: props.records,
    selectedRecordId: props.selectedRecordId,
  });
  const state = useRecordPanelControllerState(props.recordFilter);
  useRecordPanelControllerSync({
    actionableDeadLetterIds: viewData.actionableDeadLetterIds,
    recordFilter: props.recordFilter,
    selectedRecord: viewData.selectedRecord,
    setFilterDraft: state.setFilterDraft,
    setForm: state.setForm,
    setLocationReviewForm: state.setLocationReviewForm,
    setReminderForm: state.setReminderForm,
    setSelectedDeadLetterIds: state.setSelectedDeadLetterIds,
  });
  const { recordHandlers, mediaHandlers } = createRecordPanelControllerHandlerGroups(
    buildRecordPanelControllerHandlerGroupsInput({ props, state, viewData }),
  );
  return buildRecordPanelControllerResult({ mediaHandlers, recordHandlers, state, viewData });
}
