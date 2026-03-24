"use client";
import type { MediaDeadLetterOverview } from "../lib/types";
import type { ControllerProps } from "./record-panel-controller.types";
import type { RecordPanelControllerDetailCopy } from "./record-panel-controller-detail-copy.types";
export type RecordPanelControllerDeadLetterSelectionActionInput = {
  mediaDeadLetterOverview: MediaDeadLetterOverview | null;
  setSelectedDeadLetterIds: React.Dispatch<React.SetStateAction<string[]>>;
};
export type RecordPanelControllerDeadLetterRetryActionInput = {
  detailCopy: RecordPanelControllerDetailCopy;
  onBulkRetryMediaDeadLetter: ControllerProps["onBulkRetryMediaDeadLetter"];
  selectedDeadLetterIds: string[];
  setBulkRetryingDeadLetter: (value: boolean) => void;
  setError: (value: string) => void;
  setSelectedDeadLetterIds: React.Dispatch<React.SetStateAction<string[]>>;
};
export type RecordPanelControllerDeadLetterActionInput = RecordPanelControllerDeadLetterSelectionActionInput & RecordPanelControllerDeadLetterRetryActionInput;
