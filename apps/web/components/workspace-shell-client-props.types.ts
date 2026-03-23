"use client";

import type { ComponentProps } from "react";
import { useRouter } from "next/navigation";

import { WorkspaceShellPanels } from "./workspace-shell-panels";
import { createWorkspaceShellRefreshers } from "./use-workspace-shell-refreshers";
import { useWorkspaceShellActions } from "./use-workspace-shell-actions";
import { useWorkspaceShellState } from "./use-workspace-shell-state";

export type WorkspaceShellState = ReturnType<typeof useWorkspaceShellState>;
export type WorkspaceShellRefreshers = ReturnType<typeof createWorkspaceShellRefreshers>;
export type WorkspaceShellActions = ReturnType<typeof useWorkspaceShellActions>;
export type WorkspaceShellRouter = ReturnType<typeof useRouter>;
export type WorkspaceShellPanelsProps = ComponentProps<typeof WorkspaceShellPanels>;
