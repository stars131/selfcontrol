"use client";

import { useWorkspaceShellStateConversationValues } from "./use-workspace-shell-state-conversation-values";
import { useWorkspaceShellStateCoreValues } from "./use-workspace-shell-state-core-values";
import { useWorkspaceShellStateManagedValues } from "./use-workspace-shell-state-managed-values";
import { useWorkspaceShellStateMediaValues } from "./use-workspace-shell-state-media-values";

export function useWorkspaceShellStateValues() {
  const coreState = useWorkspaceShellStateCoreValues();
  const conversationState = useWorkspaceShellStateConversationValues();
  const mediaState = useWorkspaceShellStateMediaValues();
  const managedState = useWorkspaceShellStateManagedValues();

  return {
    ...coreState,
    ...conversationState,
    ...mediaState,
    ...managedState,
  };
}
