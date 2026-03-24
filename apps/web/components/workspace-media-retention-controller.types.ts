"use client";

import type { Dispatch, SetStateAction } from "react";

import type {
  MediaRetentionArchiveResult,
  MediaRetentionCleanupResult,
  MediaRetentionReport,
} from "../lib/types";

export type MediaRetentionActionResult =
  | { kind: "archive"; result: MediaRetentionArchiveResult }
  | { kind: "cleanup"; result: MediaRetentionCleanupResult };

export type UseWorkspaceMediaRetentionControllerProps = {
  token: string;
  workspaceId: string;
  remoteMediaLabel: string;
  missingFilesLabel: string;
  orphanFilesLabel: string;
  allHealthyLabel: string;
  loadFailedMessage: string;
  actionFailedMessage: string;
};

export type WorkspaceMediaRetentionCleanupInput = {
  mediaIds: string[];
  purgeOrphanFiles: boolean;
  confirmMessage: string;
};

export type WorkspaceMediaRetentionRiskLabelInput = Pick<
  UseWorkspaceMediaRetentionControllerProps,
  "allHealthyLabel" | "missingFilesLabel" | "orphanFilesLabel" | "remoteMediaLabel"
> & {
  report: MediaRetentionReport | null;
};

export type WorkspaceMediaRetentionControllerState = {
  olderThanDays: number;
  setOlderThanDays: (value: number) => void;
  report: MediaRetentionReport | null;
  setReport: (value: MediaRetentionReport | null) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
  error: string;
  setError: (value: string) => void;
  selectedMediaIds: string[];
  setSelectedMediaIds: Dispatch<SetStateAction<string[]>>;
  actionLoading: boolean;
  setActionLoading: (value: boolean) => void;
  actionError: string;
  setActionError: (value: string) => void;
  actionResult: MediaRetentionActionResult | null;
  setActionResult: (value: MediaRetentionActionResult | null) => void;
};
