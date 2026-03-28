"use client";

import { useRouter } from "next/navigation";

import {
  buildWorkspaceShellActionsInput,
  buildWorkspaceShellEffectsInput,
  buildWorkspaceShellPanelsProps,
  buildWorkspaceShellRefreshersInput,
} from "./workspace-shell-client-props";
import { WorkspaceShellFrame } from "./workspace-shell-frame";
import { WorkspaceShellPanels } from "./workspace-shell-panels";
import type { WorkspaceShellClientProps } from "./workspace-shell-client.types";
import { useWorkspaceShellActions } from "./use-workspace-shell-actions";
import { useWorkspaceShellEffects } from "./use-workspace-shell-effects";
import { createWorkspaceShellRefreshers } from "./use-workspace-shell-refreshers";
import { useWorkspaceShellState } from "./use-workspace-shell-state";

export function WorkspaceShellClient({ workspaceId }: WorkspaceShellClientProps) {
  const router = useRouter();
  const state = useWorkspaceShellState();
  const refreshers = createWorkspaceShellRefreshers(
    buildWorkspaceShellRefreshersInput({ ...state, workspaceId }),
  );

  useWorkspaceShellEffects(buildWorkspaceShellEffectsInput({ ...state, router, workspaceId }));
  const actions = useWorkspaceShellActions(
    buildWorkspaceShellActionsInput({ refreshers, state, workspaceId }),
  );
  const panelsProps = buildWorkspaceShellPanelsProps({ ...state, actions, workspaceId });

  return (
    <WorkspaceShellFrame error={state.error} loading={state.loading}>
      <WorkspaceShellPanels {...panelsProps} />
    </WorkspaceShellFrame>
  );
}
