"use client";
import type { ControllerProps } from "./record-panel-controller.types";
import type { RecordPanelControllerDetailCopy } from "./record-panel-controller-detail-copy.types";
import type { RecordPanelControllerMediaTransferActionInput } from "./record-panel-controller-media-transfer-action-input.types";

export type RecordPanelControllerMediaDeleteActionInput = {
  detailCopy: RecordPanelControllerDetailCopy;
  onDeleteMedia: ControllerProps["onDeleteMedia"];
  setDeletingMediaId: (value: string | null) => void;
  setError: (value: string) => void;
};

export type RecordPanelControllerMediaFileActionInput =
  RecordPanelControllerMediaTransferActionInput & RecordPanelControllerMediaDeleteActionInput;
