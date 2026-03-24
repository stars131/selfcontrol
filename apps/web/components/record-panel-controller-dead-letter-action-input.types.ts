"use client";

import { getRecordPanelDetailBundle } from "../lib/record-panel-detail";
import type { MediaDeadLetterOverview } from "../lib/types";
import type { ControllerProps } from "./record-panel-controller.types";
type DetailCopy = ReturnType<typeof getRecordPanelDetailBundle>["copy"];
export type RecordPanelControllerDeadLetterSelectionActionInput = {
  mediaDeadLetterOverview: MediaDeadLetterOverview | null;
  setSelectedDeadLetterIds: React.Dispatch<React.SetStateAction<string[]>>;
};
export type RecordPanelControllerDeadLetterRetryActionInput = {
  detailCopy: DetailCopy;
  onBulkRetryMediaDeadLetter: ControllerProps["onBulkRetryMediaDeadLetter"];
  selectedDeadLetterIds: string[];
  setBulkRetryingDeadLetter: (value: boolean) => void;
  setError: (value: string) => void;
  setSelectedDeadLetterIds: React.Dispatch<React.SetStateAction<string[]>>;
};
export type RecordPanelControllerDeadLetterActionInput = RecordPanelControllerDeadLetterSelectionActionInput & RecordPanelControllerDeadLetterRetryActionInput;
