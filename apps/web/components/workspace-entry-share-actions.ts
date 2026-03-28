"use client";

import { acceptShareToken, listWorkspaces, previewShareToken } from "../lib/api";
import { clearStoredSession } from "../lib/auth";
import { getStoredLocale } from "../lib/locale";
import { getWorkspaceEntryCopy } from "./workspace-entry-copy";
import {
  extractWorkspaceShareToken,
  getWorkspaceEntryActionErrorMessage,
} from "./workspace-entry-controller-helpers";
import type { CreateWorkspaceEntryShareActionsInput } from "./workspace-entry-share-actions.types";

export function createWorkspaceEntryShareActions({
  router,
  setError,
  setJoining,
  setPreviewing,
  setSharePreview,
  setWorkspaces,
  token,
}: CreateWorkspaceEntryShareActionsInput) {
  const copy = getWorkspaceEntryCopy(getStoredLocale());

  const handlePreviewShare = async (shareTokenInput: string) => {
    const normalizedShareToken = extractWorkspaceShareToken(shareTokenInput);
    if (!normalizedShareToken) {
      return;
    }

    setPreviewing(true);
    setError("");
    try {
      const result = await previewShareToken(normalizedShareToken);
      setSharePreview(result.preview);
    } catch (caught) {
      setSharePreview(null);
      setError(getWorkspaceEntryActionErrorMessage(caught, copy.previewShareFailed));
    } finally {
      setPreviewing(false);
    }
  };

  const handleAcceptShare = async (shareTokenInput: string) => {
    const normalizedShareToken = extractWorkspaceShareToken(shareTokenInput);
    if (!token || !normalizedShareToken) {
      return;
    }

    setJoining(true);
    setError("");
    try {
      const result = await acceptShareToken(token, normalizedShareToken);
      const workspaceResult = await listWorkspaces(token);
      setWorkspaces(workspaceResult.items);
      router.push(`/app/workspaces/${result.workspace.id}`);
    } catch (caught) {
      setError(getWorkspaceEntryActionErrorMessage(caught, copy.joinSharedWorkspaceFailed));
    } finally {
      setJoining(false);
    }
  };

  const handleLogout = () => {
    clearStoredSession();
    router.replace("/login");
  };

  return {
    handlePreviewShare,
    handleAcceptShare,
    handleLogout,
  };
}
