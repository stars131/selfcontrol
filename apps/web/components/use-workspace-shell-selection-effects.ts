"use client";

import { useEffect } from "react";

import { refreshMediaAssets, refreshReminderItems } from "../lib/workspace-shell-refresh";
import type { UseWorkspaceShellSelectionEffectsInput } from "./use-workspace-shell-selection-effects.types";

export function useWorkspaceShellSelectionEffects({
  token,
  workspaceId,
  selectedRecordId,
  setMediaAssets,
  setReminders,
}: UseWorkspaceShellSelectionEffectsInput) {
  useEffect(() => {
    if (!token) {
      return;
    }
    void refreshMediaAssets(token, workspaceId, selectedRecordId, setMediaAssets);
    void refreshReminderItems(token, workspaceId, selectedRecordId, setReminders);
  }, [token, workspaceId, selectedRecordId, setMediaAssets, setReminders]);
}
