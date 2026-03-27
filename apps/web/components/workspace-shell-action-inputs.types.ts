"use client";

import type { ReminderUpdateInput, SaveRecordInput } from "./record-panel-v2.types";

export type WorkspaceShellBulkRetryInput = {
  mediaIds?: string[];
  retryStates?: string[];
  limit?: number;
};

export type WorkspaceShellReminderCreateInput = {
  recordId: string;
  title?: string;
  message?: string;
  remind_at: string;
  channel_code?: string;
};

export type WorkspaceShellShareLinkInput = {
  name?: string;
  permission_code: string;
  max_uses?: number | null;
};

export type WorkspaceShellSaveRecordInput = SaveRecordInput;
export type WorkspaceShellReminderUpdateInput = ReminderUpdateInput;
