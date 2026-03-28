"use client";

import { useEffect } from "react";

import {
  getCurrentUser,
  getKnowledgeStats,
  getMediaStorageProviderHealth,
  getWorkspace,
  listProviderConfigs,
  listWorkspaceMembers,
} from "../lib/api";
import { clearStoredSession, getStoredToken } from "../lib/auth";
import { resolveErrorMessage } from "../lib/error-message";
import { getStoredLocale } from "../lib/locale";
import { getWorkspaceSettingsCopy } from "./workspace-settings-copy";
import type { UseWorkspaceSettingsLoadInput } from "./use-workspace-settings-load.types";

function getWorkspaceSettingsLoadErrorMessage(caught: unknown) {
  return resolveErrorMessage(caught, getWorkspaceSettingsCopy(getStoredLocale()).loadFailed);
}

export function useWorkspaceSettingsLoad({
  router,
  setError,
  setKnowledgeStats,
  setLoading,
  setMediaStorageHealth,
  setMembers,
  setProviderConfigs,
  setToken,
  setUser,
  setWorkspace,
  workspaceId,
}: UseWorkspaceSettingsLoadInput) {
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
        setError(getWorkspaceSettingsLoadErrorMessage(caught));
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, [
    router,
    setError,
    setKnowledgeStats,
    setLoading,
    setMediaStorageHealth,
    setMembers,
    setProviderConfigs,
    setToken,
    setUser,
    setWorkspace,
    workspaceId,
  ]);
}
