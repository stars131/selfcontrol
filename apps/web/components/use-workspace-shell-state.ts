"use client";

import { useState } from "react";

import { INITIAL_RECORD_FILTER } from "../lib/workspace-shell-refresh";
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
  ProviderFeatureConfig,
  RecordItem,
  ReminderItem,
  SearchPresetItem,
  ShareLinkItem,
  TimelineDay,
  Workspace,
} from "../lib/types";

export function useWorkspaceShellState() {
  const [token, setToken] = useState<string | null>(null);
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [records, setRecords] = useState<RecordItem[]>([]);
  const [visibleRecords, setVisibleRecords] = useState<RecordItem[]>([]);
  const [timelineDays, setTimelineDays] = useState<TimelineDay[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null);
  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>([]);
  const [mediaDeadLetterOverview, setMediaDeadLetterOverview] = useState<MediaDeadLetterOverview | null>(null);
  const [mediaProcessingOverview, setMediaProcessingOverview] = useState<MediaProcessingOverview | null>(null);
  const [mediaStorageSummary, setMediaStorageSummary] = useState<MediaStorageSummary | null>(null);
  const [reminders, setReminders] = useState<ReminderItem[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [knowledgeStats, setKnowledgeStats] = useState<KnowledgeStats | null>(null);
  const [providerConfigs, setProviderConfigs] = useState<ProviderFeatureConfig[]>([]);
  const [shareLinks, setShareLinks] = useState<ShareLinkItem[]>([]);
  const [latestSharePath, setLatestSharePath] = useState("");
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>([]);
  const [recordFilter, setRecordFilter] = useState(INITIAL_RECORD_FILTER);
  const [searchPresets, setSearchPresets] = useState<SearchPresetItem[]>([]);
  const [filteringRecords, setFilteringRecords] = useState(false);
  const [savingSearchPreset, setSavingSearchPreset] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const canWriteWorkspace = workspace?.role === "owner" || workspace?.role === "editor";
  const canManageWorkspace = canWriteWorkspace;
  const canManageSharing = workspace?.role === "owner";

  return {
    token,
    setToken,
    workspace,
    setWorkspace,
    records,
    setRecords,
    visibleRecords,
    setVisibleRecords,
    timelineDays,
    setTimelineDays,
    conversations,
    setConversations,
    activeConversationId,
    setActiveConversationId,
    messages,
    setMessages,
    selectedRecordId,
    setSelectedRecordId,
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
    knowledgeStats,
    setKnowledgeStats,
    providerConfigs,
    setProviderConfigs,
    shareLinks,
    setShareLinks,
    latestSharePath,
    setLatestSharePath,
    auditLogs,
    setAuditLogs,
    recordFilter,
    setRecordFilter,
    searchPresets,
    setSearchPresets,
    filteringRecords,
    setFilteringRecords,
    savingSearchPreset,
    setSavingSearchPreset,
    loading,
    setLoading,
    error,
    setError,
    canWriteWorkspace,
    canManageWorkspace,
    canManageSharing,
  };
}
