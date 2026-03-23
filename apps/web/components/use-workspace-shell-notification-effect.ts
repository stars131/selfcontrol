"use client";

import { useEffect } from "react";

import { syncDueNotificationsAndRefresh } from "../lib/workspace-shell-refresh";
import type { UseWorkspaceShellEffectsProps } from "./workspace-shell-effects.types";

export function useWorkspaceShellNotificationEffect({
  token,
  workspaceId,
  setNotifications,
}: Pick<UseWorkspaceShellEffectsProps, "token" | "workspaceId" | "setNotifications">) {
  useEffect(() => {
    if (!token) {
      return;
    }

    void syncDueNotificationsAndRefresh(token, workspaceId, setNotifications);
    const timer = window.setInterval(() => {
      void syncDueNotificationsAndRefresh(token, workspaceId, setNotifications);
    }, 30_000);

    return () => window.clearInterval(timer);
  }, [token, workspaceId, setNotifications]);
}
