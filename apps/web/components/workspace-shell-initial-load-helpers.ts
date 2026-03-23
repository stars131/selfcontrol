"use client";

import { createConversation, listConversations } from "../lib/api";
import {
  loadConversationMessagesForWorkspace,
  refreshMediaDeadLetterOverviewData,
  refreshProviderConfigItems,
  refreshShareLinkItems,
} from "../lib/workspace-shell-refresh";
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

export async function loadWorkspaceShellManagedState({
  activeToken,
  role,
  setLatestSharePath,
  setMediaDeadLetterOverview,
  setProviderConfigs,
  setShareLinks,
  workspaceId,
}: {
  activeToken: string;
  role: WorkspaceRole;
  setLatestSharePath: UseWorkspaceShellEffectsProps["setLatestSharePath"];
  setMediaDeadLetterOverview: UseWorkspaceShellEffectsProps["setMediaDeadLetterOverview"];
  setProviderConfigs: UseWorkspaceShellEffectsProps["setProviderConfigs"];
  setShareLinks: UseWorkspaceShellEffectsProps["setShareLinks"];
  workspaceId: string;
}) {
  if (canManageWorkspace(role)) {
    await refreshMediaDeadLetterOverviewData(activeToken, workspaceId, setMediaDeadLetterOverview);
    await refreshProviderConfigItems(activeToken, workspaceId, setProviderConfigs);
    if (role === "owner") {
      await refreshShareLinkItems(activeToken, workspaceId, setShareLinks);
    } else {
      setShareLinks([]);
      setLatestSharePath("");
    }
    return;
  }

  setMediaDeadLetterOverview(null);
  setProviderConfigs([]);
  setShareLinks([]);
  setLatestSharePath("");
}
