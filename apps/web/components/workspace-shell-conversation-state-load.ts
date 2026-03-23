"use client";

import { createConversation, listConversations } from "../lib/api";
import { loadConversationMessagesForWorkspace } from "../lib/workspace-shell-refresh";
import type { UseWorkspaceShellEffectsProps } from "./workspace-shell-effects.types";

type WorkspaceRole = "owner" | "editor" | "viewer";

function canManageWorkspace(role: WorkspaceRole) {
  return role === "owner" || role === "editor";
}

export async function loadWorkspaceShellConversationState({
  activeToken,
  role,
  setActiveConversationId,
  setConversations,
  setMessages,
  workspaceId,
}: {
  activeToken: string;
  role: WorkspaceRole;
  setActiveConversationId: UseWorkspaceShellEffectsProps["setActiveConversationId"];
  setConversations: UseWorkspaceShellEffectsProps["setConversations"];
  setMessages: UseWorkspaceShellEffectsProps["setMessages"];
  workspaceId: string;
}) {
  const conversationResult = await listConversations(activeToken, workspaceId);
  let items = conversationResult.items;
  if (!items.length && canManageWorkspace(role)) {
    const created = await createConversation(activeToken, workspaceId, "Workspace chat");
    items = [created.conversation];
  }

  setConversations(items);
  setActiveConversationId(items[0]?.id ?? null);
  if (items[0]) {
    await loadConversationMessagesForWorkspace(activeToken, workspaceId, items[0].id, setMessages);
  } else {
    setMessages([]);
  }
}
