import type { NotificationItem, ReminderItem } from "./types";
import { request } from "./api-core";

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
