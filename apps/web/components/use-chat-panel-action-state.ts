"use client";

import { useState } from "react";

export function useChatPanelActionState() {
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [reindexing, setReindexing] = useState(false);
  const [refreshingAudit, setRefreshingAudit] = useState(false);
  const [creatingShare, setCreatingShare] = useState(false);
  const [disablingShareId, setDisablingShareId] = useState("");
  const [shareName, setShareName] = useState("");
  const [sharePermission, setSharePermission] = useState("viewer");
  const [shareMaxUses, setShareMaxUses] = useState("");
  const [error, setError] = useState("");

  return {
    draft,
    setDraft,
    loading,
    setLoading,
    syncing,
    setSyncing,
    reindexing,
    setReindexing,
    refreshingAudit,
    setRefreshingAudit,
    creatingShare,
    setCreatingShare,
    disablingShareId,
    setDisablingShareId,
    shareName,
    setShareName,
    sharePermission,
    setSharePermission,
    shareMaxUses,
    setShareMaxUses,
    error,
    setError,
  };
}
