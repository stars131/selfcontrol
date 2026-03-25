"use client";

import { useEffect } from "react";

import { getCurrentUser, listWorkspaces } from "../lib/api";
import { clearStoredSession, getStoredToken } from "../lib/auth";
import { getWorkspaceEntryActionErrorMessage } from "./workspace-entry-controller-helpers";
import type { UseWorkspaceEntryLoadInput } from "./use-workspace-entry-load.types";

export function useWorkspaceEntryLoad({
  loadTransferJobs,
  router,
  setError,
  setLoading,
  setToken,
  setUser,
  setWorkspaces,
}: UseWorkspaceEntryLoadInput) {
  useEffect(() => {
    const nextToken = getStoredToken();
    if (!nextToken) {
      router.replace("/login");
      return;
    }

    const load = async () => {
      try {
        setToken(nextToken);
        const [me, workspaceResult] = await Promise.all([
          getCurrentUser(nextToken),
          listWorkspaces(nextToken),
        ]);
        setUser(me.user);
        setWorkspaces(workspaceResult.items);
        await loadTransferJobs(nextToken);
      } catch (caught) {
        clearStoredSession();
        setError(getWorkspaceEntryActionErrorMessage(caught, "Failed to load workspace list"));
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, [loadTransferJobs, router, setError, setLoading, setToken, setUser, setWorkspaces]);
}
