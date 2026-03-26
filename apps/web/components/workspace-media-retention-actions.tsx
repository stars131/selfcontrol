"use client";
import { WorkspaceMediaRetentionActionsContent } from "./workspace-media-retention-actions-content";
import type { WorkspaceMediaRetentionActionsProps } from "./workspace-media-retention-actions.types";

export function WorkspaceMediaRetentionActions({ ownerActions, ...props }: WorkspaceMediaRetentionActionsProps) {
  return (
    <section className="subtle-card" style={{ marginTop: 16 }}><div className="eyebrow">{ownerActions}</div><WorkspaceMediaRetentionActionsContent {...props} /></section>
  );
}
