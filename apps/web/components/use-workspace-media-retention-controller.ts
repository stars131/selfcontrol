"use client";

import type {
  UseWorkspaceMediaRetentionControllerProps,
} from "./workspace-media-retention-controller.types";
import { createWorkspaceMediaRetentionControllerActions } from "./workspace-media-retention-controller-actions";
import { useWorkspaceMediaRetentionDerivedData } from "./use-workspace-media-retention-derived-data";
import { useWorkspaceMediaRetentionReport } from "./use-workspace-media-retention-report";
import { useWorkspaceMediaRetentionState } from "./use-workspace-media-retention-state";

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
  const state = useWorkspaceMediaRetentionState();

  const { loadReport } = useWorkspaceMediaRetentionReport({
    loadFailedMessage,
    olderThanDays: state.olderThanDays,
    setError: state.setError,
    setLoading: state.setLoading,
    setReport: state.setReport,
    setSelectedMediaIds: state.setSelectedMediaIds,
    token,
    workspaceId,
  });
  const { storageRiskLabel } = useWorkspaceMediaRetentionDerivedData({
    allHealthyLabel,
    missingFilesLabel,
    orphanFilesLabel,
    remoteMediaLabel,
    report: state.report,
  });
  const actions = createWorkspaceMediaRetentionControllerActions({
    actionFailedMessage,
    loadReport,
    olderThanDays: state.olderThanDays,
    report: state.report,
    selectedMediaIds: state.selectedMediaIds,
    setActionError: state.setActionError,
    setActionLoading: state.setActionLoading,
    setActionResult: state.setActionResult,
    setSelectedMediaIds: state.setSelectedMediaIds,
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
