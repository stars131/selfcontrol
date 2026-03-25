"use client";

import { useCallback, useEffect } from "react";

import { getMediaRetentionReport } from "../lib/api";
import { getWorkspaceMediaRetentionActionErrorMessage } from "./workspace-media-retention-controller-helpers";
import type { UseWorkspaceMediaRetentionReportInput } from "./use-workspace-media-retention-report.types";

export function useWorkspaceMediaRetentionReport({
  loadFailedMessage,
  olderThanDays,
  setError,
  setLoading,
  setReport,
  setSelectedMediaIds,
  token,
  workspaceId,
}: UseWorkspaceMediaRetentionReportInput) {
  const loadReport = useCallback(
    async (threshold: number) => {
      setLoading(true);
      setError("");
      try {
        const result = await getMediaRetentionReport(token, workspaceId, {
          olderThanDays: threshold,
          limit: 5,
        });
        setReport(result.report);
        setSelectedMediaIds((current) =>
          current.filter((mediaId) =>
            result.report.retention_candidates.some((item) => item.media_id === mediaId),
          ),
        );
      } catch (caught) {
        setError(getWorkspaceMediaRetentionActionErrorMessage(caught, loadFailedMessage));
      } finally {
        setLoading(false);
      }
    },
    [loadFailedMessage, setError, setLoading, setReport, setSelectedMediaIds, token, workspaceId],
  );

  useEffect(() => {
    void loadReport(olderThanDays);
  }, [olderThanDays, loadReport]);

  return {
    loadReport,
  };
}
