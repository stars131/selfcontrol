import type { Dispatch, SetStateAction } from "react";

import {
  getKnowledgeStats,
  getMediaDeadLetterOverview,
  getMediaProcessingOverview,
  getMediaStorageSummary,
  listAuditLogs,
  listMedia,
  listMessages,
  listNotifications,
  listProviderConfigs,
  listRecords,
  listReminders,
  listSearchPresets,
  listShareLinks,
  syncNotifications,
} from "./api";
import { buildTimelineDays } from "./timeline";
import type {
  AuditLogItem,
  ChatMessage,
  KnowledgeStats,
  MediaAsset,
  MediaDeadLetterOverview,
  MediaProcessingOverview,
  MediaStorageSummary,
  NotificationItem,
  ProviderFeatureConfig,
  RecordFilterState,
  RecordItem,
  ReminderItem,
  SearchPresetItem,
  ShareLinkItem,
  TimelineDay,
} from "./types";

export const INITIAL_RECORD_FILTER: RecordFilterState = {
  query: "",
  typeCode: "all",
  avoidOnly: "all",
  placeQuery: "",
  reviewStatus: "all",
  mappedOnly: "all",
};

type RefreshRecordCollectionInput = {
  token: string;
  workspaceId: string;
  nextRecordFilter: RecordFilterState;
  setRecords: Dispatch<SetStateAction<RecordItem[]>>;
  setVisibleRecords: Dispatch<SetStateAction<RecordItem[]>>;
  setTimelineDays: Dispatch<SetStateAction<TimelineDay[]>>;
  setSelectedRecordId: Dispatch<SetStateAction<string | null>>;
};

export async function refreshRecordCollection({
  token,
  workspaceId,
  nextRecordFilter,
  setRecords,
  setVisibleRecords,
  setTimelineDays,
  setSelectedRecordId,
}: RefreshRecordCollectionInput) {
  const result = await listRecords(token, workspaceId, nextRecordFilter);
  setRecords(result.items);
  setVisibleRecords(result.items);
  setTimelineDays(buildTimelineDays(result.items));
  setSelectedRecordId((current) =>
    current && result.items.some((item) => item.id === current) ? current : result.items[0]?.id ?? null,
  );
}

export async function refreshMediaAssets(
  token: string,
  workspaceId: string,
  recordId: string | null,
  setMediaAssets: Dispatch<SetStateAction<MediaAsset[]>>,
) {
  if (!recordId) {
    setMediaAssets([]);
    return;
  }
  const result = await listMedia(token, workspaceId, recordId);
  setMediaAssets(result.items);
}

export async function refreshMediaStorageSummaryData(
  token: string,
  workspaceId: string,
  setMediaStorageSummary: Dispatch<SetStateAction<MediaStorageSummary | null>>,
) {
  const result = await getMediaStorageSummary(token, workspaceId);
  setMediaStorageSummary(result.summary);
}

export async function refreshMediaProcessingOverviewData(
  token: string,
  workspaceId: string,
  setMediaProcessingOverview: Dispatch<SetStateAction<MediaProcessingOverview | null>>,
) {
  const result = await getMediaProcessingOverview(token, workspaceId, { issueLimit: 6 });
  setMediaProcessingOverview(result.overview);
}

export async function refreshMediaDeadLetterOverviewData(
  token: string,
  workspaceId: string,
  setMediaDeadLetterOverview: Dispatch<SetStateAction<MediaDeadLetterOverview | null>>,
) {
  const result = await getMediaDeadLetterOverview(token, workspaceId, { limit: 12 });
  setMediaDeadLetterOverview(result.overview);
}

export async function refreshReminderItems(
  token: string,
  workspaceId: string,
  recordId: string | null,
  setReminders: Dispatch<SetStateAction<ReminderItem[]>>,
) {
  if (!recordId) {
    setReminders([]);
    return;
  }
  const result = await listReminders(token, workspaceId, { recordId });
  setReminders(result.items);
}

export async function refreshNotificationItems(
  token: string,
  workspaceId: string,
  setNotifications: Dispatch<SetStateAction<NotificationItem[]>>,
) {
  const result = await listNotifications(token, workspaceId);
  setNotifications(result.items);
}

export async function refreshKnowledgeStatsData(
  token: string,
  workspaceId: string,
  setKnowledgeStats: Dispatch<SetStateAction<KnowledgeStats | null>>,
) {
  const result = await getKnowledgeStats(token, workspaceId);
  setKnowledgeStats(result.stats);
}

export async function refreshProviderConfigItems(
  token: string,
  workspaceId: string,
  setProviderConfigs: Dispatch<SetStateAction<ProviderFeatureConfig[]>>,
) {
  const result = await listProviderConfigs(token, workspaceId);
  setProviderConfigs(result.items);
}

export async function refreshShareLinkItems(
  token: string,
  workspaceId: string,
  setShareLinks: Dispatch<SetStateAction<ShareLinkItem[]>>,
) {
  const result = await listShareLinks(token, workspaceId);
  setShareLinks(result.items);
}

export async function refreshSearchPresetItems(
  token: string,
  workspaceId: string,
  setSearchPresets: Dispatch<SetStateAction<SearchPresetItem[]>>,
) {
  const result = await listSearchPresets(token, workspaceId);
  setSearchPresets(result.items);
}

export async function refreshAuditLogItems(
  token: string,
  workspaceId: string,
  setAuditLogs: Dispatch<SetStateAction<AuditLogItem[]>>,
) {
  const result = await listAuditLogs(token, workspaceId, { limit: 8 });
  setAuditLogs(result.items);
}

export async function syncDueNotificationsAndRefresh(
  token: string,
  workspaceId: string,
  setNotifications: Dispatch<SetStateAction<NotificationItem[]>>,
) {
  await syncNotifications(token, workspaceId);
  await refreshNotificationItems(token, workspaceId, setNotifications);
}

export async function loadConversationMessagesForWorkspace(
  token: string,
  workspaceId: string,
  conversationId: string,
  setMessages: Dispatch<SetStateAction<ChatMessage[]>>,
) {
  const result = await listMessages(token, workspaceId, conversationId);
  setMessages(result.items);
}
