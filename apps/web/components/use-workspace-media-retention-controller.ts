"use client";

import { useMemo, useState } from "react";

import type { MediaRetentionReport } from "../lib/types";
import { buildWorkspaceMediaRetentionRiskLabel } from "./workspace-media-retention-controller-helpers";
import type {
  MediaRetentionActionResult,
  UseWorkspaceMediaRetentionControllerProps,
  WorkspaceMediaRetentionControllerState,
} from "./workspace-media-retention-controller.types";
import { createWorkspaceMediaRetentionControllerActions } from "./workspace-media-retention-controller-actions";
import { useWorkspaceMediaRetentionReport } from "./use-workspace-media-retention-report";

export function useWorkspaceMediaRetentionController({
  token,
  workspaceId,
  remoteMediaLabel,
  missingFilesLabel,
  orphanFilesLabel,
  allHealthyLabel,
  loadFailedMessage,
  actionFailedMessage,
}: UseWorkspaceMediaRetentionControllerProps) {
  const [olderThanDays, setOlderThanDays] = useState(90);
  const [report, setReport] = useState<MediaRetentionReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedMediaIds, setSelectedMediaIds] = useState<string[]>([]);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState("");
  const [actionResult, setActionResult] = useState<MediaRetentionActionResult | null>(null);

  const state: WorkspaceMediaRetentionControllerState = {
    olderThanDays,
    setOlderThanDays,
    report,
    setReport,
    loading,
    setLoading,
    error,
    setError,
    selectedMediaIds,
    setSelectedMediaIds,
    actionLoading,
    setActionLoading,
    actionError,
    setActionError,
    actionResult,
    setActionResult,
  };

  const { loadReport } = useWorkspaceMediaRetentionReport({
    loadFailedMessage,
    olderThanDays,
    setError,
    setLoading,
    setReport,
    setSelectedMediaIds,
    token,
    workspaceId,
  });
  const storageRiskLabel = useMemo(
    () =>
      buildWorkspaceMediaRetentionRiskLabel({
        allHealthyLabel,
        missingFilesLabel,
        orphanFilesLabel,
        remoteMediaLabel,
        report,
      }),
    [allHealthyLabel, missingFilesLabel, orphanFilesLabel, remoteMediaLabel, report],
  );
  const actions = createWorkspaceMediaRetentionControllerActions({
    actionFailedMessage,
    loadReport,
    olderThanDays,
    report,
    selectedMediaIds,
    setActionError,
    setActionLoading,
    setActionResult,
    setSelectedMediaIds,
    token,
    workspaceId,
  });

  return {
    ...state,
    storageRiskLabel,
    loadReport,
    ...actions,
  };
}
