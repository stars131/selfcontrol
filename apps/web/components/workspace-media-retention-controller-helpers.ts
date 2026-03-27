"use client";

import { resolveErrorMessage } from "../lib/error-message";
import type { WorkspaceMediaRetentionRiskLabelInput } from "./workspace-media-retention-controller.types";

export function getWorkspaceMediaRetentionActionErrorMessage(
  caught: unknown,
  fallbackMessage: string,
) {
  return resolveErrorMessage(caught, fallbackMessage);
}

export function buildWorkspaceMediaRetentionRiskLabel({
  allHealthyLabel,
  missingFilesLabel,
  orphanFilesLabel,
  remoteMediaLabel,
  report,
}: WorkspaceMediaRetentionRiskLabelInput) {
  if (!report) {
    return "-";
  }
  return [
    report.missing_file_count ? `${report.missing_file_count} ${missingFilesLabel}` : allHealthyLabel,
    `${report.orphan_file_count} ${orphanFilesLabel}`,
    `${report.remote_item_count} ${remoteMediaLabel}`,
  ].join(" / ");
}
