import type {
  AuditLogItem,
  KnowledgeStats,
  MediaStorageProviderHealth,
  ProviderFeatureConfig,
  User,
} from "./types";
import { request } from "./api-core";
export {
  createConversation,
  listConversations,
  listMessages,
  sendMessage,
} from "./api-chat";
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
export {
  createRecord,
  createSearchPreset,
  deleteRecord,
  deleteSearchPreset,
  getTimeline,
  listRecords,
  listSearchPresets,
  searchRecords,
  updateRecord,
} from "./api-records";
export {
  createReminder,
  deleteReminder,
  listNotifications,
  listReminders,
  syncNotifications,
  updateNotification,
  updateReminder,
} from "./api-reminders";
export {
  acceptShareToken,
  createShareLink,
  listShareLinks,
  previewShareToken,
  updateShareLink,
} from "./api-sharing";
export {
  createWorkspace,
  createWorkspaceExportJob,
  createWorkspaceImportJob,
  deleteWorkspaceMember,
  downloadWorkspaceExport,
  downloadWorkspaceTransferJob,
  getWorkspace,
  getWorkspaceTransferJob,
  importWorkspaceArchive,
  listWorkspaceMembers,
  listWorkspaceTransferJobs,
  listWorkspaces,
  updateWorkspaceMember,
} from "./api-workspaces";

type LoginResult = {
  access_token: string;
  token_type: string;
  user: User;
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
