"use client";

import type { Dispatch, SetStateAction } from "react";

import type {
  AuditLogItem,
  ChatMessage,
  KnowledgeStats,
  MediaAsset,
  MediaDeadLetterOverview,
  MediaProcessingOverview,
  MediaStorageSummary,
  NotificationItem,
  RecordItem,
  ReminderItem,
  SearchPresetItem,
  ShareLinkItem,
  TimelineDay,
} from "../lib/types";

export type WorkspaceShellRefreshersParams = {
  workspaceId: string;
  setAuditLogs: Dispatch<SetStateAction<AuditLogItem[]>>;
  setKnowledgeStats: Dispatch<SetStateAction<KnowledgeStats | null>>;
  setMediaAssets: Dispatch<SetStateAction<MediaAsset[]>>;
  setMediaDeadLetterOverview: Dispatch<SetStateAction<MediaDeadLetterOverview | null>>;
  setMediaProcessingOverview: Dispatch<SetStateAction<MediaProcessingOverview | null>>;
  setMediaStorageSummary: Dispatch<SetStateAction<MediaStorageSummary | null>>;
  setMessages: Dispatch<SetStateAction<ChatMessage[]>>;
  setNotifications: Dispatch<SetStateAction<NotificationItem[]>>;
  setRecords: Dispatch<SetStateAction<RecordItem[]>>;
  setReminders: Dispatch<SetStateAction<ReminderItem[]>>;
  setSearchPresets: Dispatch<SetStateAction<SearchPresetItem[]>>;
  setSelectedRecordId: Dispatch<SetStateAction<string | null>>;
  setShareLinks: Dispatch<SetStateAction<ShareLinkItem[]>>;
  setTimelineDays: Dispatch<SetStateAction<TimelineDay[]>>;
  setVisibleRecords: Dispatch<SetStateAction<RecordItem[]>>;
};
