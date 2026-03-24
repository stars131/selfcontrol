"use client";
import type { ControllerProps } from "./record-panel-controller.types";
import type { RecordPanelControllerDetailCopy } from "./record-panel-controller-detail-copy.types";

export type RecordPanelControllerMediaRefreshActionInput = {
  detailCopy: RecordPanelControllerDetailCopy;
  onRefreshMediaStatus: ControllerProps["onRefreshMediaStatus"];
  setError: (value: string) => void;
  setRefreshingMediaId: (value: string | null) => void;
};

export type RecordPanelControllerMediaRetryActionInput = {
  detailCopy: RecordPanelControllerDetailCopy;
  onRetryMedia: ControllerProps["onRetryMedia"];
  setError: (value: string) => void;
  setRetryingMediaId: (value: string | null) => void;
};

export type RecordPanelControllerMediaStatusActionInput =
  RecordPanelControllerMediaRefreshActionInput & RecordPanelControllerMediaRetryActionInput;
