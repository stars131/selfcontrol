"use client";

import { useEffect, useRef } from "react";

import { getCurrentUser, listWorkspaces } from "../lib/api";
import { clearStoredSession, getStoredToken } from "../lib/auth";
import { getStoredLocale } from "../lib/locale";
import { getWorkspaceEntryCopy } from "./workspace-entry-copy";
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
  const lastLoadKeyRef = useRef<string | null>(null);
  const copy = getWorkspaceEntryCopy(getStoredLocale());

  useEffect(() => {
    const nextToken = getStoredToken();
    if (!nextToken) {
      lastLoadKeyRef.current = null;
      router.replace("/login");
      return;
    }
    if (lastLoadKeyRef.current === nextToken) {
      return;
    }
    lastLoadKeyRef.current = nextToken;

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
        lastLoadKeyRef.current = null;
        clearStoredSession();
        setError(getWorkspaceEntryActionErrorMessage(caught, copy.loadFailed));
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, [loadTransferJobs, router, setError, setLoading, setToken, setUser, setWorkspaces]);
}
