import type {
  AuditLogItem,
  User,
} from "./types";
import { request } from "./api-core";
export {
  createConversation,
  listConversations,
  listMessages,
  sendMessage,
} from "./api-chat";
export { getKnowledgeStats, reindexKnowledge } from "./api-knowledge";
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
  getMediaStorageProviderHealth,
  listProviderConfigs,
  updateProviderConfig,
} from "./api-provider-configs";
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
