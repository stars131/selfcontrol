"use client";

import type { UseWorkspaceShellActionsProps } from "./workspace-shell-actions.types";
import { createWorkspaceShellMediaDeadLetterActions } from "./workspace-shell-media-dead-letter-actions";
import { createWorkspaceShellMediaSelectedActions } from "./workspace-shell-media-selected-actions";
import { createWorkspaceShellMediaUploadActions } from "./workspace-shell-media-upload-actions";

export function createWorkspaceShellMediaActions(props: UseWorkspaceShellActionsProps) {
  const mediaUploadActions = createWorkspaceShellMediaUploadActions(props);
  const mediaSelectedActions = createWorkspaceShellMediaSelectedActions(props);
  const mediaDeadLetterActions = createWorkspaceShellMediaDeadLetterActions(props);

  return {
    ...mediaUploadActions,
    ...mediaSelectedActions,
    ...mediaDeadLetterActions,
  };
}
