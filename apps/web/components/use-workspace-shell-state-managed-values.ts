"use client";

import { useState } from "react";

import type {
  AuditLogItem,
  KnowledgeStats,
  ProviderFeatureConfig,
  ShareLinkItem,
} from "../lib/types";

export function useWorkspaceShellStateManagedValues() {
  const [knowledgeStats, setKnowledgeStats] = useState<KnowledgeStats | null>(null);
  const [providerConfigs, setProviderConfigs] = useState<ProviderFeatureConfig[]>([]);
  const [shareLinks, setShareLinks] = useState<ShareLinkItem[]>([]);
  const [latestSharePath, setLatestSharePath] = useState("");
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>([]);

  return {
    knowledgeStats,
    setKnowledgeStats,
    providerConfigs,
    setProviderConfigs,
    shareLinks,
    setShareLinks,
    latestSharePath,
    setLatestSharePath,
    auditLogs,
    setAuditLogs,
  };
}
