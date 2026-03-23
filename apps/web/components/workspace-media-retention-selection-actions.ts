"use client";

import type { WorkspaceMediaRetentionControllerState } from "./workspace-media-retention-controller.types";

export function createWorkspaceMediaRetentionSelectionActions({
  report,
  setSelectedMediaIds,
}: Pick<WorkspaceMediaRetentionControllerState, "report" | "setSelectedMediaIds">) {
  function toggleSelectedMedia(mediaId: string) {
    setSelectedMediaIds((current) =>
      current.includes(mediaId)
        ? current.filter((item) => item !== mediaId)
        : [...current, mediaId],
    );
  }

  function selectAllCandidates() {
    setSelectedMediaIds(report?.retention_candidates.map((item) => item.media_id) ?? []);
  }

  function clearSelection() {
    setSelectedMediaIds([]);
  }

  return {
    toggleSelectedMedia,
    selectAllCandidates,
    clearSelection,
  };
}
