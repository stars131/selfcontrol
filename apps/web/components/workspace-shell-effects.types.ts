"use client";

import type { Dispatch, SetStateAction } from "react";

import type {
  AuditLogItem,
  ChatMessage,
  Conversation,
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
  Workspace,
} from "../lib/types";

export type RouterLike = {
  replace: (href: string) => void;
};

type StateSetter<T> = Dispatch<SetStateAction<T>>;

export type UseWorkspaceShellEffectsProps = {
  router: RouterLike;
  workspaceId: string;
  token: string | null;
  selectedRecordId: string | null;
  setToken: StateSetter<string | null>;
  setWorkspace: StateSetter<Workspace | null>;
  setRecords: StateSetter<RecordItem[]>;
  setVisibleRecords: StateSetter<RecordItem[]>;
  setTimelineDays: StateSetter<TimelineDay[]>;
  setConversations: StateSetter<Conversation[]>;
  setActiveConversationId: StateSetter<string | null>;
  setMessages: StateSetter<ChatMessage[]>;
  setSelectedRecordId: StateSetter<string | null>;
  setMediaAssets: StateSetter<MediaAsset[]>;
  setMediaDeadLetterOverview: StateSetter<MediaDeadLetterOverview | null>;
  setMediaProcessingOverview: StateSetter<MediaProcessingOverview | null>;
  setMediaStorageSummary: StateSetter<MediaStorageSummary | null>;
  setReminders: StateSetter<ReminderItem[]>;
  setNotifications: StateSetter<NotificationItem[]>;
  setKnowledgeStats: StateSetter<KnowledgeStats | null>;
  setSearchPresets: StateSetter<SearchPresetItem[]>;
  setShareLinks: StateSetter<ShareLinkItem[]>;
  setLatestSharePath: StateSetter<string>;
  setAuditLogs: StateSetter<AuditLogItem[]>;
  setError: StateSetter<string>;
  setLoading: StateSetter<boolean>;
};

export type WorkspaceShellInitialLoadProps = Pick<
  UseWorkspaceShellEffectsProps,
  | "router"
  | "workspaceId"
  | "setActiveConversationId"
  | "setAuditLogs"
  | "setConversations"
  | "setError"
  | "setKnowledgeStats"
  | "setLatestSharePath"
  | "setLoading"
  | "setMediaDeadLetterOverview"
  | "setMediaProcessingOverview"
  | "setMediaStorageSummary"
  | "setMessages"
  | "setNotifications"
  | "setRecords"
  | "setSearchPresets"
  | "setSelectedRecordId"
  | "setShareLinks"
  | "setTimelineDays"
  | "setToken"
  | "setVisibleRecords"
  | "setWorkspace"
>;
