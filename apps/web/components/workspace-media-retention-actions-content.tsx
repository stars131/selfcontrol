"use client";
import { WorkspaceMediaRetentionEditorNotice } from "./workspace-media-retention-editor-notice"; import { WorkspaceMediaRetentionOwnerActions } from "./workspace-media-retention-owner-actions";
import type { WorkspaceMediaRetentionActionsContentProps } from "./workspace-media-retention-actions-content.types";

export function WorkspaceMediaRetentionActionsContent({ role, ...props }: WorkspaceMediaRetentionActionsContentProps) {
  return role === "owner" ? <WorkspaceMediaRetentionOwnerActions {...props} /> : <WorkspaceMediaRetentionEditorNotice editorReadOnly={props.editorReadOnly} />;
}
