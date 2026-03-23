"use client";

import { useEffect } from "react";

import { refreshMediaAssets, refreshReminderItems } from "../lib/workspace-shell-refresh";
import type { UseWorkspaceShellEffectsProps } from "./workspace-shell-effects.types";

export function useWorkspaceShellSelectionEffects({
  token,
  workspaceId,
  selectedRecordId,
  setMediaAssets,
  setReminders,
}: Pick<
  UseWorkspaceShellEffectsProps,
  "token" | "workspaceId" | "selectedRecordId" | "setMediaAssets" | "setReminders"
>) {
  useEffect(() => {
    if (!token) {
      return;
    }
    void refreshMediaAssets(token, workspaceId, selectedRecordId, setMediaAssets);
  }, [token, workspaceId, selectedRecordId, setMediaAssets]);

  useEffect(() => {
    if (!token) {
      return;
    }
    void refreshReminderItems(token, workspaceId, selectedRecordId, setReminders);
  }, [token, workspaceId, selectedRecordId, setReminders]);
}
