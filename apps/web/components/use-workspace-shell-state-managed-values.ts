"use client";

import { useState } from "react";

import type {
  AuditLogItem,
  KnowledgeStats,
  ShareLinkItem,
} from "../lib/types";

export function useWorkspaceShellStateManagedValues() {
  const [knowledgeStats, setKnowledgeStats] = useState<KnowledgeStats | null>(null);
  const [shareLinks, setShareLinks] = useState<ShareLinkItem[]>([]);
  const [latestSharePath, setLatestSharePath] = useState("");
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>([]);

  return {
    knowledgeStats,
    setKnowledgeStats,
    shareLinks,
    setShareLinks,
    latestSharePath,
    setLatestSharePath,
    auditLogs,
    setAuditLogs,
  };
}
