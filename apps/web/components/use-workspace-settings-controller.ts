"use client";

import { useEffect, useState } from "react";

import {
  deleteWorkspaceMember,
  getCurrentUser,
  getKnowledgeStats,
  getMediaStorageProviderHealth,
  getWorkspace,
  listProviderConfigs,
  listWorkspaceMembers,
  updateProviderConfig,
  updateWorkspaceMember,
} from "../lib/api";
import { clearStoredSession, getStoredToken } from "../lib/auth";
import type {
  KnowledgeStats,
  MediaStorageProviderHealth,
  ProviderFeatureConfig,
  User,
  Workspace,
  WorkspaceMemberItem,
} from "../lib/types";

type RouterLike = {
  replace: (href: string) => void;
};

function getActionErrorMessage(caught: unknown, fallbackMessage: string) {
  return caught instanceof Error ? caught.message : fallbackMessage;
}

export function useWorkspaceSettingsController(router: RouterLike, workspaceId: string) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [providerConfigs, setProviderConfigs] = useState<ProviderFeatureConfig[]>([]);
  const [mediaStorageHealth, setMediaStorageHealth] = useState<MediaStorageProviderHealth | null>(null);
  const [knowledgeStats, setKnowledgeStats] = useState<KnowledgeStats | null>(null);
  const [members, setMembers] = useState<WorkspaceMemberItem[]>([]);
  const [savingMemberId, setSavingMemberId] = useState("");
  const [removingMemberId, setRemovingMemberId] = useState("");
  const [refreshingMediaStorageHealth, setRefreshingMediaStorageHealth] = useState(false);
  const [highlightedAnchor, setHighlightedAnchor] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const syncHighlightedAnchor = () => {
      const anchor = window.location.hash ? decodeURIComponent(window.location.hash.slice(1)) : "";
      setHighlightedAnchor(anchor || null);
    };

    syncHighlightedAnchor();
    window.addEventListener("hashchange", syncHighlightedAnchor);
    return () => window.removeEventListener("hashchange", syncHighlightedAnchor);
  }, []);

  useEffect(() => {
    const activeToken = getStoredToken();
    if (!activeToken) {
      router.replace("/login");
      return;
    }

    const load = async () => {
      try {
        setToken(activeToken);
        const [me, workspaceResult, knowledgeResult] = await Promise.all([
          getCurrentUser(activeToken),
          getWorkspace(activeToken, workspaceId),
          getKnowledgeStats(activeToken, workspaceId),
        ]);
        setUser(me.user);
        setWorkspace(workspaceResult.workspace);
        setKnowledgeStats(knowledgeResult.stats);

        if (workspaceResult.workspace.role === "owner" || workspaceResult.workspace.role === "editor") {
          const [providerResult, memberResult, mediaStorageHealthResult] = await Promise.all([
            listProviderConfigs(activeToken, workspaceId),
            listWorkspaceMembers(activeToken, workspaceId),
            getMediaStorageProviderHealth(activeToken, workspaceId),
          ]);
          setProviderConfigs(providerResult.items);
          setMembers(memberResult.items);
          setMediaStorageHealth(mediaStorageHealthResult.health);
        } else {
          setProviderConfigs([]);
          setMembers([]);
          setMediaStorageHealth(null);
        }
      } catch (caught) {
        clearStoredSession();
        setError(getActionErrorMessage(caught, "Failed to load settings"));
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, [router, workspaceId]);

  useEffect(() => {
    if (!highlightedAnchor) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      const target = document.getElementById(highlightedAnchor);
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [highlightedAnchor, providerConfigs.length, mediaStorageHealth?.checked_at]);

  const refreshMediaStorageHealthState = async (activeToken: string) => {
    setRefreshingMediaStorageHealth(true);
    try {
      const result = await getMediaStorageProviderHealth(activeToken, workspaceId);
      setMediaStorageHealth(result.health);
      setError("");
    } catch (caught) {
      setError(getActionErrorMessage(caught, "Failed to load media storage health"));
    } finally {
      setRefreshingMediaStorageHealth(false);
    }
  };

  const handleSaveProviderConfig = async (
    featureCode: string,
    input: {
      provider_code: string;
      model_name?: string | null;
      is_enabled: boolean;
      api_base_url?: string | null;
      api_key_env_name?: string | null;
      options_json?: Record<string, unknown>;
    },
  ) => {
    if (!token) {
      throw new Error("Not authenticated");
    }

    const result = await updateProviderConfig(token, workspaceId, featureCode, input);
    setProviderConfigs((current) =>
      current.map((item) => (item.feature_code === featureCode ? result.config : item)),
    );
    if (featureCode === "media_storage") {
      await refreshMediaStorageHealthState(token);
    }
  };

  const handleUpdateMemberRole = async (memberId: string, role: "viewer" | "editor") => {
    if (!token) {
      throw new Error("Not authenticated");
    }

    setSavingMemberId(memberId);
    setError("");
    try {
      const result = await updateWorkspaceMember(token, workspaceId, memberId, { role });
      setMembers((current) => current.map((item) => (item.id === memberId ? result.member : item)));
    } catch (caught) {
      setError(getActionErrorMessage(caught, "Failed to update workspace member"));
    } finally {
      setSavingMemberId("");
    }
  };

  const handleRemoveMember = async (memberId: string) => {
    if (!token) {
      throw new Error("Not authenticated");
    }

    setRemovingMemberId(memberId);
    setError("");
    try {
      await deleteWorkspaceMember(token, workspaceId, memberId);
      setMembers((current) => current.filter((item) => item.id !== memberId));
    } catch (caught) {
      setError(getActionErrorMessage(caught, "Failed to remove workspace member"));
    } finally {
      setRemovingMemberId("");
    }
  };

  return {
    token,
    user,
    workspace,
    providerConfigs,
    mediaStorageHealth,
    knowledgeStats,
    members,
    savingMemberId,
    removingMemberId,
    refreshingMediaStorageHealth,
    highlightedAnchor,
    loading,
    error,
    refreshMediaStorageHealthState,
    handleSaveProviderConfig,
    handleUpdateMemberRole,
    handleRemoveMember,
  };
}
