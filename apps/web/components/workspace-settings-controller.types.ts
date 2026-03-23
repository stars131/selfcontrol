"use client";

import type { Dispatch, SetStateAction } from "react";

import type {
  KnowledgeStats,
  MediaStorageProviderHealth,
  ProviderFeatureConfig,
  User,
  Workspace,
  WorkspaceMemberItem,
} from "../lib/types";

type StateSetter<T> = Dispatch<SetStateAction<T>>;

export type RouterLike = {
  replace: (href: string) => void;
};

export type WorkspaceSettingsProviderConfigInput = {
  provider_code: string;
  model_name?: string | null;
  is_enabled: boolean;
  api_base_url?: string | null;
  api_key_env_name?: string | null;
  options_json?: Record<string, unknown>;
};

export type UseWorkspaceSettingsControllerState = {
  token: string | null;
  setToken: StateSetter<string | null>;
  user: User | null;
  setUser: StateSetter<User | null>;
  workspace: Workspace | null;
  setWorkspace: StateSetter<Workspace | null>;
  providerConfigs: ProviderFeatureConfig[];
  setProviderConfigs: StateSetter<ProviderFeatureConfig[]>;
  mediaStorageHealth: MediaStorageProviderHealth | null;
  setMediaStorageHealth: StateSetter<MediaStorageProviderHealth | null>;
  knowledgeStats: KnowledgeStats | null;
  setKnowledgeStats: StateSetter<KnowledgeStats | null>;
  members: WorkspaceMemberItem[];
  setMembers: StateSetter<WorkspaceMemberItem[]>;
  savingMemberId: string;
  setSavingMemberId: StateSetter<string>;
  removingMemberId: string;
  setRemovingMemberId: StateSetter<string>;
  refreshingMediaStorageHealth: boolean;
  setRefreshingMediaStorageHealth: StateSetter<boolean>;
  highlightedAnchor: string | null;
  setHighlightedAnchor: StateSetter<string | null>;
  loading: boolean;
  setLoading: StateSetter<boolean>;
  error: string;
  setError: StateSetter<string>;
};
