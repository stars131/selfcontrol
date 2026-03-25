"use client";

import { useMemo } from "react";

import {
  buildChatShareUrl,
  countUnreadNotifications,
} from "./chat-panel-action-helpers";
import type { UseChatPanelActionDerivedDataInput } from "./use-chat-panel-action-derived-data.types";

export function useChatPanelActionDerivedData({
  latestSharePath,
  notifications,
}: UseChatPanelActionDerivedDataInput) {
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
