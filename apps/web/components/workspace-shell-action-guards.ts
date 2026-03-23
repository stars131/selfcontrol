"use client";

export function requireWorkspaceToken(token: string | null) {
  if (!token) {
    throw new Error("Not authenticated");
  }
  return token;
}

export function requireWritableWorkspaceToken(token: string | null, canWriteWorkspace: boolean) {
  const activeToken = requireWorkspaceToken(token);
  if (!canWriteWorkspace) {
    throw new Error("Viewer access is read-only");
  }
  return activeToken;
}

export function requireManageWorkspaceToken(token: string | null, canManageWorkspace: boolean) {
  const activeToken = requireWorkspaceToken(token);
  if (!canManageWorkspace) {
    throw new Error("Viewer access is read-only");
  }
  return activeToken;
}

export function requireShareManagerToken(token: string | null, canManageSharing: boolean) {
  const activeToken = requireWorkspaceToken(token);
  if (!canManageSharing) {
    throw new Error("Only workspace owners can manage share links");
  }
  return activeToken;
}

export function requireSelectedRecordContext(token: string | null, selectedRecordId: string | null) {
  if (!token || !selectedRecordId) {
    throw new Error("Not authenticated");
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
  if (!canWriteWorkspace) {
    throw new Error("Viewer access is read-only");
  }
  if (!token || !activeConversationId) {
    throw new Error("No active conversation");
  }
  return {
    activeToken: token,
    conversationId: activeConversationId,
  };
}
