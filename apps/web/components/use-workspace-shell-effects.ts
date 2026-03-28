"use client";

import type { UseWorkspaceShellEffectsProps } from "./workspace-shell-effects.types";
import { useWorkspaceShellInitialLoad } from "./use-workspace-shell-initial-load";
import { useWorkspaceShellNotificationEffect } from "./use-workspace-shell-notification-effect";
import { useWorkspaceShellSelectionEffects } from "./use-workspace-shell-selection-effects";

export function useWorkspaceShellEffects(input: UseWorkspaceShellEffectsProps) {
  useWorkspaceShellInitialLoad(input);
  useWorkspaceShellSelectionEffects(input);
  useWorkspaceShellNotificationEffect(input);
}
