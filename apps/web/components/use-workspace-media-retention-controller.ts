"use client";

import { useEffect, useMemo, useState } from "react";

import { archiveMediaRetention, cleanupMediaRetention, getMediaRetentionReport } from "../lib/api";
import type {
  MediaRetentionArchiveResult,
  MediaRetentionCleanupResult,
  MediaRetentionReport,
} from "../lib/types";

export type MediaRetentionActionResult =
  | { kind: "archive"; result: MediaRetentionArchiveResult }
  | { kind: "cleanup"; result: MediaRetentionCleanupResult };

type UseWorkspaceMediaRetentionControllerProps = {
  token: string;
  workspaceId: string;
  remoteMediaLabel: string;
  missingFilesLabel: string;
  orphanFilesLabel: string;
  allHealthyLabel: string;
  loadFailedMessage: string;
  actionFailedMessage: string;
};

function getActionErrorMessage(caught: unknown, fallbackMessage: string) {
  return caught instanceof Error ? caught.message : fallbackMessage;
}

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

  const loadReport = async (threshold: number) => {
    setLoading(true);
    setError("");
    try {
      const result = await getMediaRetentionReport(token, workspaceId, {
        olderThanDays: threshold,
        limit: 5,
      });
      setReport(result.report);
      setSelectedMediaIds((current) =>
        current.filter((mediaId) => result.report.retention_candidates.some((item) => item.media_id === mediaId)),
      );
    } catch (caught) {
      setError(getActionErrorMessage(caught, loadFailedMessage));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadReport(olderThanDays);
  }, [olderThanDays, token, workspaceId]);

  const storageRiskLabel = useMemo(() => {
    if (!report) {
      return "-";
    }
    return [
      report.missing_file_count ? `${report.missing_file_count} ${missingFilesLabel}` : allHealthyLabel,
      `${report.orphan_file_count} ${orphanFilesLabel}`,
      `${report.remote_item_count} ${remoteMediaLabel}`,
    ].join(" / ");
  }, [allHealthyLabel, missingFilesLabel, orphanFilesLabel, remoteMediaLabel, report]);

  const toggleSelectedMedia = (mediaId: string) => {
    setSelectedMediaIds((current) =>
      current.includes(mediaId) ? current.filter((item) => item !== mediaId) : [...current, mediaId],
    );
  };

  const selectAllCandidates = () => {
    setSelectedMediaIds(report?.retention_candidates.map((item) => item.media_id) ?? []);
  };

  const clearSelection = () => {
    setSelectedMediaIds([]);
  };

  const handleArchive = async (confirmMessage: string) => {
    if (!selectedMediaIds.length || !window.confirm(confirmMessage)) {
      return;
    }
    setActionLoading(true);
    setActionError("");
    try {
      const result = await archiveMediaRetention(token, workspaceId, {
        mediaIds: selectedMediaIds,
        olderThanDays,
        dryRun: false,
      });
      setActionResult({ kind: "archive", result: result.result });
      await loadReport(olderThanDays);
    } catch (caught) {
      setActionError(getActionErrorMessage(caught, actionFailedMessage));
    } finally {
      setActionLoading(false);
    }
  };

  const handleCleanup = async ({
    mediaIds,
    purgeOrphanFiles,
    confirmMessage,
  }: {
    mediaIds: string[];
    purgeOrphanFiles: boolean;
    confirmMessage: string;
  }) => {
    if (!window.confirm(confirmMessage)) {
      return;
    }

    setActionLoading(true);
    setActionError("");
    try {
      const result = await cleanupMediaRetention(token, workspaceId, {
        mediaIds,
        olderThanDays,
        purgeOrphanFiles,
        dryRun: false,
      });
      setActionResult({ kind: "cleanup", result: result.result });
      await loadReport(olderThanDays);
    } catch (caught) {
      setActionError(getActionErrorMessage(caught, actionFailedMessage));
    } finally {
      setActionLoading(false);
    }
  };

  return {
    olderThanDays,
    report,
    loading,
    error,
    selectedMediaIds,
    actionLoading,
    actionError,
    actionResult,
    storageRiskLabel,
    setOlderThanDays,
    loadReport,
    toggleSelectedMedia,
    selectAllCandidates,
    clearSelection,
    handleArchive,
    handleCleanup,
  };
}
