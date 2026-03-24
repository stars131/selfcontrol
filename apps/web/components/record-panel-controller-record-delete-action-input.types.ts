"use client";

import { getRecordPanelDetailBundle } from "../lib/record-panel-detail";
import type { RecordItem } from "../lib/types";
import type { ControllerProps } from "./record-panel-controller.types";

type DetailCopy = ReturnType<typeof getRecordPanelDetailBundle>["copy"];

export type RecordPanelControllerRecordDeleteActionInput = {
  detailCopy: DetailCopy;
  onDeleteRecord: ControllerProps["onDeleteRecord"];
  selectedRecord: RecordItem | null;
  setDeleting: (value: boolean) => void;
  setError: (value: string) => void;
};
