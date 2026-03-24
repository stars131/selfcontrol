"use client";
import type { RecordItem } from "../lib/types";
import type { ControllerProps } from "./record-panel-controller.types";
import type { RecordPanelControllerDetailCopy } from "./record-panel-controller-detail-copy.types";

export type RecordPanelControllerRecordDeleteActionInput = {
  detailCopy: RecordPanelControllerDetailCopy;
  onDeleteRecord: ControllerProps["onDeleteRecord"];
  selectedRecord: RecordItem | null;
  setDeleting: (value: boolean) => void;
  setError: (value: string) => void;
};
