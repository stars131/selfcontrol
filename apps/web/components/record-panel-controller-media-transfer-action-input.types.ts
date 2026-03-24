"use client";
import type { MediaAsset, RecordItem } from "../lib/types";
import type { ControllerProps } from "./record-panel-controller.types";
import type { RecordPanelControllerDetailCopy } from "./record-panel-controller-detail-copy.types";

export type RecordPanelControllerMediaUploadActionInput = {
  detailCopy: RecordPanelControllerDetailCopy;
  onUploadMedia: ControllerProps["onUploadMedia"];
  selectedRecord: RecordItem | null;
  setError: (value: string) => void;
  setUploading: (value: boolean) => void;
};

export type RecordPanelControllerMediaDownloadActionInput = {
  authToken: string | null;
  detailCopy: RecordPanelControllerDetailCopy;
  setDownloadingMediaId: (value: string | null) => void;
  setError: (value: string) => void;
  workspaceId: string;
};

export type RecordPanelControllerMediaTransferActionInput =
  RecordPanelControllerMediaUploadActionInput & RecordPanelControllerMediaDownloadActionInput;

export type RecordPanelControllerMediaDownloadAsset = MediaAsset;
