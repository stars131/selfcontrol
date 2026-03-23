"use client";

import { useMemo } from "react";

import type { NotificationItem } from "../lib/types";
import {
  buildChatShareUrl,
  countUnreadNotifications,
} from "./chat-panel-action-helpers";

export function useChatPanelActionDerivedData({
  latestSharePath,
  notifications,
}: {
  latestSharePath: string;
  notifications: NotificationItem[];
}) {
  const unreadCount = countUnreadNotifications(notifications);
  const latestShareUrl = useMemo(
    () => (latestSharePath ? buildChatShareUrl(latestSharePath) : ""),
    [latestSharePath],
  );

  return {
    unreadCount,
    latestShareUrl,
  };
}
