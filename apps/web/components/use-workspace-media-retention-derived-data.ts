"use client";

import { useMemo } from "react";

import { buildWorkspaceMediaRetentionRiskLabel } from "./workspace-media-retention-controller-helpers";
import type { WorkspaceMediaRetentionRiskLabelInput } from "./workspace-media-retention-controller.types";

export function useWorkspaceMediaRetentionDerivedData({
  allHealthyLabel,
  missingFilesLabel,
  orphanFilesLabel,
  remoteMediaLabel,
  report,
}: WorkspaceMediaRetentionRiskLabelInput) {
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
