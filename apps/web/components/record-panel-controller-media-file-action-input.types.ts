"use client";

import { getRecordPanelDetailBundle } from "../lib/record-panel-detail";
import type { ControllerProps } from "./record-panel-controller.types";
import type { RecordPanelControllerMediaTransferActionInput } from "./record-panel-controller-media-transfer-action-input.types";

type DetailCopy = ReturnType<typeof getRecordPanelDetailBundle>["copy"];

export type RecordPanelControllerMediaDeleteActionInput = {
  detailCopy: DetailCopy;
  onDeleteMedia: ControllerProps["onDeleteMedia"];
  setDeletingMediaId: (value: string | null) => void;
  setError: (value: string) => void;
};

export type RecordPanelControllerMediaFileActionInput =
  RecordPanelControllerMediaTransferActionInput & RecordPanelControllerMediaDeleteActionInput;
