"use client";

import { useState } from "react";

import type {
  MediaAsset,
  MediaDeadLetterOverview,
  MediaProcessingOverview,
  MediaStorageSummary,
  NotificationItem,
  ReminderItem,
} from "../lib/types";

export function useWorkspaceShellStateMediaValues() {
  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>([]);
  const [mediaDeadLetterOverview, setMediaDeadLetterOverview] =
    useState<MediaDeadLetterOverview | null>(null);
  const [mediaProcessingOverview, setMediaProcessingOverview] =
    useState<MediaProcessingOverview | null>(null);
  const [mediaStorageSummary, setMediaStorageSummary] =
    useState<MediaStorageSummary | null>(null);
  const [reminders, setReminders] = useState<ReminderItem[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  return {
    mediaAssets,
    setMediaAssets,
    mediaDeadLetterOverview,
    setMediaDeadLetterOverview,
    mediaProcessingOverview,
    setMediaProcessingOverview,
    mediaStorageSummary,
    setMediaStorageSummary,
    reminders,
    setReminders,
    notifications,
    setNotifications,
  };
}
