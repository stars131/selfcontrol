"use client";

import { useEffect, useRef } from "react";

import type { WorkspaceShellInitialLoadProps } from "./workspace-shell-effects.types";
import { readWorkspaceShellInitialToken } from "./workspace-shell-initial-load-auth";
import {
  buildWorkspaceShellInitialLoadKey,
  shouldRunWorkspaceShellInitialLoad,
} from "./workspace-shell-initial-load-key";
import { runWorkspaceShellInitialLoad } from "./workspace-shell-initial-load-runner";

export function useWorkspaceShellInitialLoad(input: WorkspaceShellInitialLoadProps) {
  const lastLoadKeyRef = useRef<string | null>(null);

  useEffect(() => {
    const activeToken = readWorkspaceShellInitialToken(input.router);
    if (!activeToken) {
      lastLoadKeyRef.current = null;
      return;
    }
    const loadKey = buildWorkspaceShellInitialLoadKey(activeToken, input.workspaceId);
    if (!shouldRunWorkspaceShellInitialLoad(lastLoadKeyRef.current, loadKey)) {
      return;
    }
    lastLoadKeyRef.current = loadKey;

    void runWorkspaceShellInitialLoad(activeToken, input);
  }, [
    input.router,
    input.workspaceId,
    input.setActiveConversationId,
    input.setAuditLogs,
    input.setConversations,
    input.setError,
    input.setKnowledgeStats,
    input.setLatestSharePath,
    input.setLoading,
    input.setMediaDeadLetterOverview,
    input.setMediaProcessingOverview,
    input.setMediaStorageSummary,
    input.setMessages,
    input.setNotifications,
    input.setRecords,
    input.setSearchPresets,
    input.setSelectedRecordId,
    input.setShareLinks,
    input.setTimelineDays,
    input.setToken,
    input.setVisibleRecords,
    input.setWorkspace,
  ]);
}
