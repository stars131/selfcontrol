"use client";

import type { Dispatch, SetStateAction } from "react";

import type {
  ChatMessage,
  Conversation,
  KnowledgeStats,
  RecordFilterState,
  RecordItem,
  TimelineDay,
} from "../lib/types";
import type { ReminderUpdateInput, SaveRecordInput } from "./record-panel-v2.types";

type StateSetter<T> = Dispatch<SetStateAction<T>>;

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

export type UseWorkspaceShellActionsProps = {
  token: string | null;
  workspaceId: string;
  activeConversationId: string | null;
  canWriteWorkspace: boolean;
  canManageWorkspace: boolean;
  canManageSharing: boolean;
  conversationsCount: number;
  recordFilter: RecordFilterState;
  records: RecordItem[];
  selectedRecordId: string | null;
  refreshRecords: (activeToken: string, nextRecordFilter?: RecordFilterState) => Promise<void>;
  refreshMedia: (activeToken: string, recordId: string | null) => Promise<void>;
  refreshMediaStorageSummary: (activeToken: string) => Promise<void>;
  refreshMediaProcessingOverview: (activeToken: string) => Promise<void>;
  refreshMediaDeadLetterOverview: (activeToken: string) => Promise<void>;
  refreshReminders: (activeToken: string, recordId: string | null) => Promise<void>;
  refreshNotifications: (activeToken: string) => Promise<void>;
  refreshKnowledge: (activeToken: string) => Promise<void>;
  refreshSearchPresets: (activeToken: string) => Promise<void>;
  refreshAuditLogs: (activeToken: string) => Promise<void>;
  refreshShareLinks: (activeToken: string) => Promise<void>;
  syncDueNotifications: (activeToken: string) => Promise<void>;
  loadConversationMessages: (activeToken: string, conversationId: string) => Promise<void>;
  setMessages: StateSetter<ChatMessage[]>;
  setVisibleRecords: StateSetter<RecordItem[]>;
  setTimelineDays: StateSetter<TimelineDay[]>;
  setSelectedRecordId: StateSetter<string | null>;
  setConversations: StateSetter<Conversation[]>;
  setActiveConversationId: StateSetter<string | null>;
  setRecordFilter: StateSetter<RecordFilterState>;
  setFilteringRecords: StateSetter<boolean>;
  setSavingSearchPreset: StateSetter<boolean>;
  setKnowledgeStats: StateSetter<KnowledgeStats | null>;
  setLatestSharePath: StateSetter<string>;
  initialRecordFilter: RecordFilterState;
};

export type WorkspaceShellSaveRecordInput = SaveRecordInput;
export type WorkspaceShellReminderUpdateInput = ReminderUpdateInput;
