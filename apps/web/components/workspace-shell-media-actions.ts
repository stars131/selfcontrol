"use client";

import type { UseWorkspaceShellActionsProps } from "./workspace-shell-actions.types";
import { createWorkspaceShellMediaDeadLetterActions } from "./workspace-shell-media-dead-letter-actions";
import { createWorkspaceShellMediaSelectedActions } from "./workspace-shell-media-selected-actions";
import { createWorkspaceShellMediaUploadActions } from "./workspace-shell-media-upload-actions";

export function createWorkspaceShellMediaActions(input: UseWorkspaceShellActionsProps) {
  const mediaUploadActions = createWorkspaceShellMediaUploadActions(input);
  const mediaSelectedActions = createWorkspaceShellMediaSelectedActions(input);
  const mediaDeadLetterActions = createWorkspaceShellMediaDeadLetterActions(input);

  return {
    ...mediaUploadActions,
    ...mediaSelectedActions,
    ...mediaDeadLetterActions,
  };
}
