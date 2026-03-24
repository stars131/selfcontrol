"use client";

import { getRecordPanelDetailBundle } from "../lib/record-panel-detail";
import type { MediaAsset, RecordItem } from "../lib/types";
import type { ControllerProps } from "./record-panel-controller.types";

type DetailCopy = ReturnType<typeof getRecordPanelDetailBundle>["copy"];

export type RecordPanelControllerMediaUploadActionInput = {
  detailCopy: DetailCopy;
  onUploadMedia: ControllerProps["onUploadMedia"];
  selectedRecord: RecordItem | null;
  setError: (value: string) => void;
  setUploading: (value: boolean) => void;
};

export type RecordPanelControllerMediaDownloadActionInput = {
  authToken: string | null;
  detailCopy: DetailCopy;
  setDownloadingMediaId: (value: string | null) => void;
  setError: (value: string) => void;
  workspaceId: string;
};

export type RecordPanelControllerMediaTransferActionInput =
  RecordPanelControllerMediaUploadActionInput & RecordPanelControllerMediaDownloadActionInput;

export type RecordPanelControllerMediaDownloadAsset = MediaAsset;
