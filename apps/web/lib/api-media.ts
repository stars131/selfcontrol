import type {
  MediaAsset,
  MediaDeadLetterBulkRetryResult,
  MediaDeadLetterOverview,
  MediaProcessingOverview,
  MediaRetentionArchiveResult,
  MediaRetentionCleanupResult,
  MediaRetentionReport,
  MediaStorageSummary,
} from "./types";
import { request, requestBlob } from "./api-core";

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

export async function getMediaStorageSummary(token: string, workspaceId: string) {
  return request<{ summary: MediaStorageSummary }>(
    `/workspaces/${workspaceId}/media/storage-summary`,
    { method: "GET" },
    token,
  );
}

export async function getMediaProcessingOverview(
  token: string,
  workspaceId: string,
  params?: { issueLimit?: number },
) {
  const searchParams = new URLSearchParams();
  if (params?.issueLimit) {
    searchParams.set("issue_limit", String(params.issueLimit));
  }
  const query = searchParams.toString();
  const path = query
    ? `/workspaces/${workspaceId}/media/processing-overview?${query}`
    : `/workspaces/${workspaceId}/media/processing-overview`;
  return request<{ overview: MediaProcessingOverview }>(path, { method: "GET" }, token);
}

export async function getMediaDeadLetterOverview(
  token: string,
  workspaceId: string,
  params?: { limit?: number; retryStates?: string[] },
) {
  const searchParams = new URLSearchParams();
  if (params?.limit) {
    searchParams.set("limit", String(params.limit));
  }
  for (const retryState of params?.retryStates ?? []) {
    searchParams.append("retry_states", retryState);
  }
  const query = searchParams.toString();
  const path = query
    ? `/workspaces/${workspaceId}/media/dead-letter?${query}`
    : `/workspaces/${workspaceId}/media/dead-letter`;
  return request<{ overview: MediaDeadLetterOverview }>(path, { method: "GET" }, token);
}

export async function bulkRetryMediaDeadLetter(
  token: string,
  workspaceId: string,
  input: {
    mediaIds?: string[];
    retryStates?: string[];
    limit?: number;
  },
) {
  return request<{ result: MediaDeadLetterBulkRetryResult }>(
    `/workspaces/${workspaceId}/media/dead-letter/retry`,
    {
      method: "POST",
      body: JSON.stringify({
        media_ids: input.mediaIds ?? [],
        retry_states: input.retryStates ?? [],
        limit: input.limit ?? 20,
      }),
    },
    token,
  );
}

export async function getMediaRetentionReport(
  token: string,
  workspaceId: string,
  params?: { olderThanDays?: number; limit?: number },
) {
  const searchParams = new URLSearchParams();
  if (params?.olderThanDays) {
    searchParams.set("older_than_days", String(params.olderThanDays));
  }
  if (params?.limit) {
    searchParams.set("limit", String(params.limit));
  }
  const query = searchParams.toString();
  const path = query
    ? `/workspaces/${workspaceId}/media/retention-report?${query}`
    : `/workspaces/${workspaceId}/media/retention-report`;
  return request<{ report: MediaRetentionReport }>(path, { method: "GET" }, token);
}

export async function cleanupMediaRetention(
  token: string,
  workspaceId: string,
  input: {
    mediaIds: string[];
    olderThanDays: number;
    purgeOrphanFiles?: boolean;
    dryRun?: boolean;
  },
) {
  return request<{ result: MediaRetentionCleanupResult }>(
    `/workspaces/${workspaceId}/media/retention-cleanup`,
    {
      method: "POST",
      body: JSON.stringify({
        media_ids: input.mediaIds,
        older_than_days: input.olderThanDays,
        purge_orphan_files: input.purgeOrphanFiles ?? false,
        dry_run: input.dryRun ?? false,
      }),
    },
    token,
  );
}

export async function archiveMediaRetention(
  token: string,
  workspaceId: string,
  input: {
    mediaIds: string[];
    olderThanDays: number;
    dryRun?: boolean;
  },
) {
  return request<{ result: MediaRetentionArchiveResult }>(
    `/workspaces/${workspaceId}/media/retention-archive`,
    {
      method: "POST",
      body: JSON.stringify({
        media_ids: input.mediaIds,
        older_than_days: input.olderThanDays,
        dry_run: input.dryRun ?? false,
      }),
    },
    token,
  );
}

export async function fetchMediaBlob(token: string, workspaceId: string, mediaId: string) {
  return requestBlob(`/workspaces/${workspaceId}/media/${mediaId}/content`, token);
}

export async function retryMediaProcessing(token: string, workspaceId: string, mediaId: string) {
  return request<{ media: MediaAsset }>(
    `/workspaces/${workspaceId}/media/${mediaId}/retry`,
    { method: "POST" },
    token,
  );
}

export async function deleteMedia(token: string, workspaceId: string, mediaId: string) {
  return request<{ deleted: boolean }>(
    `/workspaces/${workspaceId}/media/${mediaId}`,
    { method: "DELETE" },
    token,
  );
}
