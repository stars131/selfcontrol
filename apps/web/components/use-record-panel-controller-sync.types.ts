"use client";

import type { ControllerProps } from "./record-panel-controller.types";
import type { BuildRecordPanelControllerStateResultInput } from "./record-panel-controller-state-result.types";
import type { BuildRecordPanelControllerViewDataResultInput } from "./record-panel-controller-view-data-result.types";
export type BuildRecordPanelControllerSyncInputArgs = { props: Pick<ControllerProps, "recordFilter">; state: Pick<BuildRecordPanelControllerStateResultInput, "setFilterDraft" | "setForm" | "setLocationReviewForm" | "setReminderForm" | "setSelectedDeadLetterIds">; viewData: Pick<BuildRecordPanelControllerViewDataResultInput, "actionableDeadLetterIds" | "selectedRecord">; };
export type RecordPanelControllerSyncInput = { recordFilter: ControllerProps["recordFilter"] } &
  Pick<BuildRecordPanelControllerViewDataResultInput, "actionableDeadLetterIds" | "selectedRecord"> &
  Pick<
    BuildRecordPanelControllerStateResultInput,
    | "setFilterDraft"
    | "setForm"
    | "setLocationReviewForm"
    | "setReminderForm"
    | "setSelectedDeadLetterIds"
  >;
