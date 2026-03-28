"use client";

import { useState } from "react";

import type {
  KnowledgeStats,
  MediaStorageProviderHealth,
  ProviderFeatureConfig,
  User,
  Workspace,
  WorkspaceMemberItem,
} from "../lib/types";
import { createWorkspaceSettingsActions } from "./workspace-settings-actions";
import {
  type RouterLike,
  type UseWorkspaceSettingsControllerState,
} from "./workspace-settings-controller.types";
import { useWorkspaceSettingsAnchor } from "./use-workspace-settings-anchor";
import { useWorkspaceSettingsLoad } from "./use-workspace-settings-load";

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

  const state: UseWorkspaceSettingsControllerState = {
    token,
    setToken,
    user,
    setUser,
    workspace,
    setWorkspace,
    providerConfigs,
    setProviderConfigs,
    mediaStorageHealth,
    setMediaStorageHealth,
    knowledgeStats,
    setKnowledgeStats,
    members,
    setMembers,
    savingMemberId,
    setSavingMemberId,
    removingMemberId,
    setRemovingMemberId,
    refreshingMediaStorageHealth,
    setRefreshingMediaStorageHealth,
    highlightedAnchor,
    setHighlightedAnchor,
    loading,
    setLoading,
    error,
    setError,
  };

  useWorkspaceSettingsAnchor({
    highlightedAnchor,
    providerConfigCount: providerConfigs.length,
    healthCheckedAt: mediaStorageHealth?.checked_at,
    setHighlightedAnchor,
  });
  useWorkspaceSettingsLoad({ ...state, router, workspaceId });
  const actions = createWorkspaceSettingsActions({ ...state, workspaceId });

  return {
    ...state,
    ...actions,
  };
}
