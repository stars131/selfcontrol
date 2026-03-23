"use client";

import { useMemo } from "react";

import { buildWorkspaceMediaRetentionRiskLabel } from "./workspace-media-retention-controller-helpers";

export function useWorkspaceMediaRetentionDerivedData({
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
  report: Parameters<typeof buildWorkspaceMediaRetentionRiskLabel>[0]["report"];
}) {
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

  return {
    storageRiskLabel,
  };
}
