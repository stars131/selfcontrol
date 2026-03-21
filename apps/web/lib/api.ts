import type {
  AuditLogItem,
  ChatMessage,
  Conversation,
  KnowledgeStats,
  MediaAsset,
  NotificationItem,
  ProviderFeatureConfig,
  RecordItem,
  ReminderItem,
  ShareLinkItem,
  SharePreview,
  User,
  Workspace,
} from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000/api/v1";

type Envelope<T> = {
  success: boolean;
  data: T;
  error?: {
    code?: string;
    message?: string;
  };
};

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

async function request<T>(path: string, init: RequestInit = {}, token?: string): Promise<T> {
  const headers = new Headers(init.headers);
  if (!headers.has("Content-Type") && init.body && !(init.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers,
  });
  const payload = (await response.json()) as Envelope<T> & { detail?: string };

  if (!response.ok || !payload.success) {
    throw new Error(payload.error?.message || payload.detail || "Request failed");
  }

  return payload.data;
}

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

export async function listRecords(token: string, workspaceId: string) {
  return request<{ items: RecordItem[] }>(`/workspaces/${workspaceId}/records`, { method: "GET" }, token);
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

export async function createConversation(token: string, workspaceId: string, title = "New conversation") {
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

export async function listMedia(token: string, workspaceId: string, recordId: string) {
  return request<{ items: MediaAsset[] }>(
    `/workspaces/${workspaceId}/records/${recordId}/media`,
    { method: "GET" },
    token,
  );
}

export async function uploadMedia(token: string, workspaceId: string, recordId: string, file: File) {
  const formData = new FormData();
  formData.append("file", file);
  return request<{ media: MediaAsset }>(
    `/workspaces/${workspaceId}/records/${recordId}/media`,
    {
      method: "POST",
      body: formData,
    },
    token,
  );
}

export async function getMediaStatus(token: string, workspaceId: string, mediaId: string) {
  return request<{ media: MediaAsset }>(
    `/workspaces/${workspaceId}/media/${mediaId}/status`,
    { method: "GET" },
    token,
  );
}

export async function retryMediaProcessing(token: string, workspaceId: string, mediaId: string) {
  return request<{ media: MediaAsset }>(
    `/workspaces/${workspaceId}/media/${mediaId}/retry`,
    { method: "POST" },
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
