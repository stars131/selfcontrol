"use client";

import type { MediaRetentionReport } from "../lib/types";

export function getWorkspaceMediaRetentionActionErrorMessage(
  caught: unknown,
  fallbackMessage: string,
) {
  return caught instanceof Error ? caught.message : fallbackMessage;
}

export function buildWorkspaceMediaRetentionRiskLabel({
  allHealthyLabel,
  missingFilesLabel,
  orphanFilesLabel,
  remoteMediaLabel,
  report,
}: {
  allHealthyLabel: string;
  missingFilesLabel: string;
  orphanFilesLabel: string;
  remoteMediaLabel: string;
  report: MediaRetentionReport | null;
}) {
  if (!report) {
    return "-";
  }
  return [
    report.missing_file_count ? `${report.missing_file_count} ${missingFilesLabel}` : allHealthyLabel,
    `${report.orphan_file_count} ${orphanFilesLabel}`,
    `${report.remote_item_count} ${remoteMediaLabel}`,
  ].join(" / ");
}
