"use client";

import { getRecordPanelDetailBundle } from "../lib/record-panel-detail";
import type { ControllerProps } from "./record-panel-controller.types";

type DetailCopy = ReturnType<typeof getRecordPanelDetailBundle>["copy"];

export type RecordPanelControllerMediaRefreshActionInput = {
  detailCopy: DetailCopy;
  onRefreshMediaStatus: ControllerProps["onRefreshMediaStatus"];
  setError: (value: string) => void;
  setRefreshingMediaId: (value: string | null) => void;
};

export type RecordPanelControllerMediaRetryActionInput = {
  detailCopy: DetailCopy;
  onRetryMedia: ControllerProps["onRetryMedia"];
  setError: (value: string) => void;
  setRetryingMediaId: (value: string | null) => void;
};

export type RecordPanelControllerMediaStatusActionInput =
  RecordPanelControllerMediaRefreshActionInput & RecordPanelControllerMediaRetryActionInput;
