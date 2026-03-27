import type {
  AuditLogItem,
  ChatMessage,
  Conversation,
  KnowledgeStats,
  MediaStorageProviderHealth,
  NotificationItem,
  ProviderFeatureConfig,
  RecordFilterState,
  RecordItem,
  ReminderItem,
  SearchPresetItem,
  ShareLinkItem,
  SharePreview,
  TimelineDay,
  User,
  Workspace,
  WorkspaceImportResult,
  WorkspaceTransferJob,
  WorkspaceMemberItem,
} from "./types";
import { request, requestDownload } from "./api-core";
export {
  archiveMediaRetention,
  bulkRetryMediaDeadLetter,
  cleanupMediaRetention,
  deleteMedia,
  fetchMediaBlob,
  getMediaDeadLetterOverview,
  getMediaProcessingOverview,
  getMediaRetentionReport,
  getMediaStatus,
  getMediaStorageSummary,
  listMedia,
  retryMediaProcessing,
  uploadMedia,
} from "./api-media";

type LoginResult = {
  access_token: string;
  token_type: string;
  user: User;
};

type SearchResult = {
  items: RecordItem[];
  summary: string;
};

type SendMessageResult = {
  user_message: ChatMessage;
  assistant_message: ChatMessage;
  records: RecordItem[];
};


export async function register(input: {
  username: string;
  email?: string;
  password: string;
  display_name?: string;
}) {
  return request<{ user: User }>("/auth/register", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function login(input: { account: string; password: string }) {
  return request<LoginResult>("/auth/login", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function getCurrentUser(token: string) {
  return request<{ user: User }>("/auth/me", { method: "GET" }, token);
}

export async function listWorkspaces(token: string) {
  return request<{ items: Workspace[] }>("/workspaces", { method: "GET" }, token);
}

export async function getWorkspace(token: string, workspaceId: string) {
  return request<{ workspace: Workspace }>(`/workspaces/${workspaceId}`, { method: "GET" }, token);
}

export async function downloadWorkspaceExport(token: string, workspaceId: string) {
  return requestDownload(`/workspaces/${workspaceId}/export`, token);
}

export async function createWorkspace(
  token: string,
  input: { name: string; slug: string; visibility?: string },
) {
  return request<{ workspace: Workspace }>(
    "/workspaces",
    {
      method: "POST",
      body: JSON.stringify(input),
    },
    token,
  );
}

export async function importWorkspaceArchive(
  token: string,
  input: {
    file: File;
    name?: string;
    slug?: string;
  },
) {
  const formData = new FormData();
  formData.append("file", input.file);
  if (input.name?.trim()) {
    formData.append("name", input.name.trim());
  }
  if (input.slug?.trim()) {
    formData.append("slug", input.slug.trim());
  }
  return request<{ result: WorkspaceImportResult }>(
    "/workspaces/import",
    {
      method: "POST",
      body: formData,
    },
    token,
  );
}

export async function createWorkspaceImportJob(
  token: string,
  input: {
    file: File;
    name?: string;
    slug?: string;
  },
) {
  const formData = new FormData();
  formData.append("file", input.file);
  if (input.name?.trim()) {
    formData.append("name", input.name.trim());
  }
  if (input.slug?.trim()) {
    formData.append("slug", input.slug.trim());
  }
  return request<{ job: WorkspaceTransferJob; dispatch_mode: string }>(
    "/workspaces/import-jobs",
    {
      method: "POST",
      body: formData,
    },
    token,
  );
}

export async function createWorkspaceExportJob(token: string, workspaceId: string) {
  return request<{ job: WorkspaceTransferJob; dispatch_mode: string }>(
    `/workspaces/${workspaceId}/export-jobs`,
    {
      method: "POST",
    },
    token,
  );
}

export async function listWorkspaceTransferJobs(token: string) {
  return request<{ items: WorkspaceTransferJob[] }>(
    "/workspaces/jobs/transfer",
    { method: "GET" },
    token,
  );
}

export async function getWorkspaceTransferJob(token: string, jobId: string) {
  return request<{ job: WorkspaceTransferJob }>(
    `/workspaces/jobs/transfer/${jobId}`,
    { method: "GET" },
    token,
  );
}

export async function downloadWorkspaceTransferJob(token: string, jobId: string) {
  return requestDownload(`/workspaces/jobs/transfer/${jobId}/download`, token);
}

export async function listWorkspaceMembers(token: string, workspaceId: string) {
  return request<{ items: WorkspaceMemberItem[] }>(
    `/workspaces/${workspaceId}/members`,
    { method: "GET" },
    token,
  );
}

export async function updateWorkspaceMember(
  token: string,
  workspaceId: string,
  memberId: string,
  input: { role: "viewer" | "editor" },
) {
  return request<{ member: WorkspaceMemberItem }>(
    `/workspaces/${workspaceId}/members/${memberId}`,
    {
      method: "PATCH",
      body: JSON.stringify(input),
    },
    token,
  );
}

export async function deleteWorkspaceMember(token: string, workspaceId: string, memberId: string) {
  return request<{ deleted: boolean }>(
    `/workspaces/${workspaceId}/members/${memberId}`,
    { method: "DELETE" },
    token,
  );
}

export async function listRecords(
  token: string,
  workspaceId: string,
  params?: Partial<RecordFilterState>,
) {
  const searchParams = new URLSearchParams();
  if (params?.query?.trim()) {
    searchParams.set("q", params.query.trim());
  }
  if (params?.typeCode && params.typeCode !== "all") {
    searchParams.set("type_code", params.typeCode);
  }
  if (params?.avoidOnly === "avoid") {
    searchParams.set("is_avoid", "true");
  }
  if (params?.avoidOnly === "normal") {
    searchParams.set("is_avoid", "false");
  }
  if (params?.placeQuery?.trim()) {
    searchParams.set("location_query", params.placeQuery.trim());
  }
  if (params?.reviewStatus && params.reviewStatus !== "all") {
    searchParams.set("review_status", params.reviewStatus);
  }
  if (params?.mappedOnly === "mapped") {
    searchParams.set("has_coordinates", "true");
  }
  if (params?.mappedOnly === "unmapped") {
    searchParams.set("has_coordinates", "false");
  }

  const query = searchParams.toString();
  const path = query
    ? `/workspaces/${workspaceId}/records?${query}`
    : `/workspaces/${workspaceId}/records`;
  return request<{ items: RecordItem[] }>(path, { method: "GET" }, token);
}

type SearchPresetApiItem = {
  id: string;
  workspace_id: string;
  created_by: string;
  name: string;
  filters_json: {
    query?: string;
    type_code?: string;
    is_avoid?: string;
    place_query?: string;
    review_status?: string;
    mapped_only?: string;
  };
  created_at: string;
  updated_at: string;
};

function mapSearchPreset(item: SearchPresetApiItem): SearchPresetItem {
  return {
    id: item.id,
    workspace_id: item.workspace_id,
    created_by: item.created_by,
    name: item.name,
    filters: {
      query: item.filters_json.query ?? "",
      typeCode: item.filters_json.type_code ?? "all",
      avoidOnly: (item.filters_json.is_avoid as RecordFilterState["avoidOnly"]) ?? "all",
      placeQuery: item.filters_json.place_query ?? "",
      reviewStatus: (item.filters_json.review_status as RecordFilterState["reviewStatus"]) ?? "all",
      mappedOnly: (item.filters_json.mapped_only as RecordFilterState["mappedOnly"]) ?? "all",
    },
    created_at: item.created_at,
    updated_at: item.updated_at,
  };
}

export async function listSearchPresets(token: string, workspaceId: string) {
  const result = await request<{ items: SearchPresetApiItem[] }>(
    `/workspaces/${workspaceId}/search-presets`,
    { method: "GET" },
    token,
  );
  return { items: result.items.map(mapSearchPreset) };
}

export async function createSearchPreset(
  token: string,
  workspaceId: string,
  input: {
    name: string;
    filters: RecordFilterState;
  },
) {
  const result = await request<{ preset: SearchPresetApiItem }>(
    `/workspaces/${workspaceId}/search-presets`,
    {
      method: "POST",
      body: JSON.stringify({
        name: input.name,
        filters: {
          query: input.filters.query,
          type_code: input.filters.typeCode,
          is_avoid: input.filters.avoidOnly,
          place_query: input.filters.placeQuery,
          review_status: input.filters.reviewStatus,
          mapped_only: input.filters.mappedOnly,
        },
      }),
    },
    token,
  );
  return { preset: mapSearchPreset(result.preset) };
}

export async function deleteSearchPreset(token: string, workspaceId: string, presetId: string) {
  return request<{ deleted: boolean }>(
    `/workspaces/${workspaceId}/search-presets/${presetId}`,
    { method: "DELETE" },
    token,
  );
}

export async function getTimeline(
  token: string,
  workspaceId: string,
  params?: { typeCode?: string; isAvoid?: boolean; startDate?: string; endDate?: string },
) {
  const searchParams = new URLSearchParams();
  if (params?.typeCode) {
    searchParams.set("type_code", params.typeCode);
  }
  if (typeof params?.isAvoid === "boolean") {
    searchParams.set("is_avoid", String(params.isAvoid));
  }
  if (params?.startDate) {
    searchParams.set("start_date", params.startDate);
  }
  if (params?.endDate) {
    searchParams.set("end_date", params.endDate);
  }

  const query = searchParams.toString();
  const path = query
    ? `/workspaces/${workspaceId}/timeline?${query}`
    : `/workspaces/${workspaceId}/timeline`;
  return request<{ items: TimelineDay[]; total_days: number; total_records: number }>(
    path,
    { method: "GET" },
    token,
  );
}

export async function createRecord(
  token: string,
  workspaceId: string,
  input: {
    type_code: string;
    title?: string;
    content: string;
    rating?: number;
    occurred_at?: string;
    is_avoid?: boolean;
    source_type?: string;
    extra_data?: Record<string, unknown>;
  },
) {
  return request<{ record: RecordItem }>(
    `/workspaces/${workspaceId}/records`,
    {
      method: "POST",
      body: JSON.stringify(input),
    },
    token,
  );
}

export async function searchRecords(token: string, workspaceId: string, query: string) {
  return request<SearchResult>(
    `/workspaces/${workspaceId}/search`,
    {
      method: "POST",
      body: JSON.stringify({ query }),
    },
    token,
  );
}

export async function updateRecord(
  token: string,
  workspaceId: string,
  recordId: string,
  input: Partial<{
    title: string;
    content: string;
    rating: number | null;
    occurred_at: string | null;
    is_avoid: boolean;
    status: string;
    extra_data: Record<string, unknown>;
  }>,
) {
  return request<{ record: RecordItem }>(
    `/workspaces/${workspaceId}/records/${recordId}`,
    {
      method: "PATCH",
      body: JSON.stringify(input),
    },
    token,
  );
}

export async function deleteRecord(token: string, workspaceId: string, recordId: string) {
  return request<{ deleted: boolean }>(
    `/workspaces/${workspaceId}/records/${recordId}`,
    { method: "DELETE" },
    token,
  );
}

export async function listConversations(token: string, workspaceId: string) {
  return request<{ items: Conversation[] }>(
    `/workspaces/${workspaceId}/conversations`,
    { method: "GET" },
    token,
  );
}

export async function createConversation(token: string, workspaceId: string, title: string) {
  return request<{ conversation: Conversation }>(
    `/workspaces/${workspaceId}/conversations`,
    {
      method: "POST",
      body: JSON.stringify({ title }),
    },
    token,
  );
}

export async function listMessages(token: string, workspaceId: string, conversationId: string) {
  return request<{ items: ChatMessage[] }>(
    `/workspaces/${workspaceId}/conversations/${conversationId}/messages`,
    { method: "GET" },
    token,
  );
}

export async function sendMessage(
  token: string,
  workspaceId: string,
  conversationId: string,
  content: string,
) {
  return request<SendMessageResult>(
    `/workspaces/${workspaceId}/conversations/${conversationId}/messages`,
    {
      method: "POST",
      body: JSON.stringify({ content }),
    },
    token,
  );
}

export async function getKnowledgeStats(token: string, workspaceId: string) {
  return request<{ stats: KnowledgeStats }>(
    `/workspaces/${workspaceId}/knowledge/stats`,
    { method: "GET" },
    token,
  );
}

export async function reindexKnowledge(token: string, workspaceId: string, recordId?: string) {
  return request<{
    result: {
      record_count: number;
      chunk_count: number;
    };
    stats: KnowledgeStats;
  }>(
    `/workspaces/${workspaceId}/knowledge/reindex`,
    {
      method: "POST",
      body: JSON.stringify({ record_id: recordId ?? null }),
    },
    token,
  );
}

export async function listProviderConfigs(token: string, workspaceId: string) {
  return request<{ items: ProviderFeatureConfig[] }>(
    `/workspaces/${workspaceId}/provider-configs`,
    { method: "GET" },
    token,
  );
}

export async function updateProviderConfig(
  token: string,
  workspaceId: string,
  featureCode: string,
  input: {
    provider_code: string;
    model_name?: string | null;
    is_enabled: boolean;
    api_base_url?: string | null;
    api_key_env_name?: string | null;
    options_json?: Record<string, unknown>;
  },
) {
  return request<{ config: ProviderFeatureConfig }>(
    `/workspaces/${workspaceId}/provider-configs/${featureCode}`,
    {
      method: "PUT",
      body: JSON.stringify(input),
    },
    token,
  );
}

export async function getMediaStorageProviderHealth(token: string, workspaceId: string) {
  return request<{ health: MediaStorageProviderHealth }>(
    `/workspaces/${workspaceId}/provider-configs/media-storage-health`,
    { method: "GET" },
    token,
  );
}

export async function listAuditLogs(
  token: string,
  workspaceId: string,
  params?: { limit?: number; actionCode?: string },
) {
  const searchParams = new URLSearchParams();
  if (params?.limit) {
    searchParams.set("limit", String(params.limit));
  }
  if (params?.actionCode) {
    searchParams.set("action_code", params.actionCode);
  }
  const query = searchParams.toString();
  const path = query
    ? `/workspaces/${workspaceId}/audit-logs?${query}`
    : `/workspaces/${workspaceId}/audit-logs`;
  return request<{ items: AuditLogItem[] }>(path, { method: "GET" }, token);
}

export async function listShareLinks(token: string, workspaceId: string) {
  return request<{ items: ShareLinkItem[] }>(
    `/workspaces/${workspaceId}/share-links`,
    { method: "GET" },
    token,
  );
}

export async function createShareLink(
  token: string,
  workspaceId: string,
  input: {
    name?: string;
    permission_code: string;
    expires_at?: string | null;
    max_uses?: number | null;
  },
) {
  return request<{ share_link: ShareLinkItem; access_token: string; share_path: string }>(
    `/workspaces/${workspaceId}/share-links`,
    {
      method: "POST",
      body: JSON.stringify(input),
    },
    token,
  );
}

export async function updateShareLink(
  token: string,
  workspaceId: string,
  shareLinkId: string,
  input: Partial<{
    name: string | null;
    is_enabled: boolean;
    expires_at: string | null;
    max_uses: number | null;
  }>,
) {
  return request<{ share_link: ShareLinkItem }>(
    `/workspaces/${workspaceId}/share-links/${shareLinkId}`,
    {
      method: "PATCH",
      body: JSON.stringify(input),
    },
    token,
  );
}

export async function previewShareToken(tokenValue: string) {
  return request<{ preview: SharePreview }>(`/shares/${tokenValue}`, { method: "GET" });
}

export async function acceptShareToken(token: string, tokenValue: string) {
  return request<{ workspace: Workspace }>(
    `/shares/${tokenValue}/accept`,
    {
      method: "POST",
    },
    token,
  );
}

export async function listReminders(
  token: string,
  workspaceId: string,
  params?: { recordId?: string; status?: string; enabledOnly?: boolean },
) {
  const searchParams = new URLSearchParams();
  if (params?.recordId) {
    searchParams.set("record_id", params.recordId);
  }
  if (params?.status) {
    searchParams.set("status", params.status);
  }
  if (params?.enabledOnly) {
    searchParams.set("enabled_only", "true");
  }

  const query = searchParams.toString();
  const path = query
    ? `/workspaces/${workspaceId}/reminders?${query}`
    : `/workspaces/${workspaceId}/reminders`;
  return request<{ items: ReminderItem[] }>(path, { method: "GET" }, token);
}

export async function createReminder(
  token: string,
  workspaceId: string,
  recordId: string,
  input: {
    title?: string;
    message?: string;
    remind_at: string;
    channel_code?: string;
    is_enabled?: boolean;
    metadata_json?: Record<string, unknown>;
  },
) {
  return request<{ reminder: ReminderItem }>(
    `/workspaces/${workspaceId}/records/${recordId}/reminders`,
    {
      method: "POST",
      body: JSON.stringify(input),
    },
    token,
  );
}

export async function updateReminder(
  token: string,
  workspaceId: string,
  reminderId: string,
  input: Partial<{
    title: string | null;
    message: string | null;
    remind_at: string | null;
    channel_code: string;
    status: string;
    is_enabled: boolean;
    delivered_at: string | null;
    cancelled_at: string | null;
    metadata_json: Record<string, unknown>;
  }>,
) {
  return request<{ reminder: ReminderItem }>(
    `/workspaces/${workspaceId}/reminders/${reminderId}`,
    {
      method: "PATCH",
      body: JSON.stringify(input),
    },
    token,
  );
}

export async function deleteReminder(token: string, workspaceId: string, reminderId: string) {
  return request<{ deleted: boolean }>(
    `/workspaces/${workspaceId}/reminders/${reminderId}`,
    { method: "DELETE" },
    token,
  );
}

export async function syncNotifications(token: string, workspaceId: string) {
  return request<{ created_count: number; items: NotificationItem[] }>(
    `/workspaces/${workspaceId}/notifications/sync`,
    {
      method: "POST",
    },
    token,
  );
}

export async function listNotifications(
  token: string,
  workspaceId: string,
  params?: { unreadOnly?: boolean },
) {
  const searchParams = new URLSearchParams();
  if (params?.unreadOnly) {
    searchParams.set("unread_only", "true");
  }
  const query = searchParams.toString();
  const path = query
    ? `/workspaces/${workspaceId}/notifications?${query}`
    : `/workspaces/${workspaceId}/notifications`;
  return request<{ items: NotificationItem[] }>(path, { method: "GET" }, token);
}

export async function updateNotification(
  token: string,
  workspaceId: string,
  notificationId: string,
  input: Partial<{
    is_read: boolean;
    status: string;
  }>,
) {
  return request<{ notification: NotificationItem }>(
    `/workspaces/${workspaceId}/notifications/${notificationId}`,
    {
      method: "PATCH",
      body: JSON.stringify(input),
    },
    token,
  );
}
