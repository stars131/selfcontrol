"use client";

import { resolveErrorMessage } from "../lib/error-message";
import type { NotificationItem } from "../lib/types";
import type { BuildCreateShareLinkInput } from "./chat-panel-action-helpers.types";

export function buildChatShareUrl(path: string) {
  if (typeof window === "undefined") {
    return path;
  }
  return `${window.location.origin}${path}`;
}

export function getChatPanelActionErrorMessage(caught: unknown, fallbackMessage: string) {
  return resolveErrorMessage(caught, fallbackMessage);
}

export function countUnreadNotifications(notifications: NotificationItem[]) {
  return notifications.filter((item) => !item.is_read).length;
}

export function buildCreateShareLinkInput({
  shareMaxUses,
  shareName,
  sharePermission,
}: BuildCreateShareLinkInput) {
  return {
    name: shareName || undefined,
    permission_code: sharePermission,
    max_uses: shareMaxUses ? Number(shareMaxUses) : null,
  };
}
