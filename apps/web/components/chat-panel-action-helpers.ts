"use client";

import type { NotificationItem } from "../lib/types";

export function buildChatShareUrl(path: string) {
  if (typeof window === "undefined") {
    return path;
  }
  return `${window.location.origin}${path}`;
}

export function getChatPanelActionErrorMessage(caught: unknown, fallbackMessage: string) {
  return caught instanceof Error ? caught.message : fallbackMessage;
}

export function countUnreadNotifications(notifications: NotificationItem[]) {
  return notifications.filter((item) => !item.is_read).length;
}

export function buildCreateShareLinkInput({
  shareMaxUses,
  shareName,
  sharePermission,
}: {
  shareMaxUses: string;
  shareName: string;
  sharePermission: string;
}) {
  return {
    name: shareName || undefined,
    permission_code: sharePermission,
    max_uses: shareMaxUses ? Number(shareMaxUses) : null,
  };
}
