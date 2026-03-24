"use client";

import type { ControllerProps } from "./record-panel-controller.types";
import type { useRecordPanelControllerState } from "./use-record-panel-controller-state";
import type { useRecordPanelControllerViewData } from "./use-record-panel-controller-view-data";
type ControllerState = ReturnType<typeof useRecordPanelControllerState>;
type ControllerViewData = ReturnType<typeof useRecordPanelControllerViewData>;
export type BuildRecordPanelControllerSyncInputArgs = { props: Pick<ControllerProps, "recordFilter">; state: Pick<ControllerState, "setFilterDraft" | "setForm" | "setLocationReviewForm" | "setReminderForm" | "setSelectedDeadLetterIds">; viewData: Pick<ControllerViewData, "actionableDeadLetterIds" | "selectedRecord">; };
export type RecordPanelControllerSyncInput = { recordFilter: ControllerProps["recordFilter"] } &
  Pick<ControllerViewData, "actionableDeadLetterIds" | "selectedRecord"> &
  Pick<
    ControllerState,
    | "setFilterDraft"
    | "setForm"
    | "setLocationReviewForm"
    | "setReminderForm"
    | "setSelectedDeadLetterIds"
  >;
