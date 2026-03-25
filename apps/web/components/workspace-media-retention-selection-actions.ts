"use client";

import type { CreateWorkspaceMediaRetentionSelectionActionsInput } from "./workspace-media-retention-selection-actions.types";

export function createWorkspaceMediaRetentionSelectionActions({
  report,
  setSelectedMediaIds,
}: CreateWorkspaceMediaRetentionSelectionActionsInput) {
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
