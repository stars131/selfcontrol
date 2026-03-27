"use client";

import { getStoredWorkspaceShellActionCopy } from "./workspace-shell-action-copy";

export function requireWorkspaceToken(token: string | null) {
  const copy = getStoredWorkspaceShellActionCopy();
  if (!token) {
    throw new Error(copy.notAuthenticated);
  }
  return token;
}

export function requireWritableWorkspaceToken(token: string | null, canWriteWorkspace: boolean) {
  const copy = getStoredWorkspaceShellActionCopy();
  const activeToken = requireWorkspaceToken(token);
  if (!canWriteWorkspace) {
    throw new Error(copy.viewerReadOnly);
  }
  return activeToken;
}

export function requireManageWorkspaceToken(token: string | null, canManageWorkspace: boolean) {
  const copy = getStoredWorkspaceShellActionCopy();
  const activeToken = requireWorkspaceToken(token);
  if (!canManageWorkspace) {
    throw new Error(copy.viewerReadOnly);
  }
  return activeToken;
}

export function requireShareManagerToken(token: string | null, canManageSharing: boolean) {
  const copy = getStoredWorkspaceShellActionCopy();
  const activeToken = requireWorkspaceToken(token);
  if (!canManageSharing) {
    throw new Error(copy.ownerOnlyShareLinks);
  }
  return activeToken;
}

export function requireSelectedRecordContext(token: string | null, selectedRecordId: string | null) {
  const copy = getStoredWorkspaceShellActionCopy();
  if (!token || !selectedRecordId) {
    throw new Error(copy.notAuthenticated);
  }
  return {
    activeToken: token,
    recordId: selectedRecordId,
  };
}

export function requireActiveConversationContext(
  token: string | null,
  activeConversationId: string | null,
  canWriteWorkspace: boolean,
) {
  const copy = getStoredWorkspaceShellActionCopy();
  if (!canWriteWorkspace) {
    throw new Error(copy.viewerReadOnly);
  }
  if (!token || !activeConversationId) {
    throw new Error(copy.noActiveConversation);
  }
  return {
    activeToken: token,
    conversationId: activeConversationId,
  };
}
