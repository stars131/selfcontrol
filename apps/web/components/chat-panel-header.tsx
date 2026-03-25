"use client";

import Link from "next/link";

import type { ChatPanelHeaderProps } from "./chat-panel-header.types";

export function ChatPanelHeader({
  canManageWorkspace,
  workspaceId,
  workspaceRole,
}: ChatPanelHeaderProps) {
  return (
    <div className="panel-header">
      <div>
        <div className="eyebrow">Agent</div>
        <h2 className="title" style={{ fontSize: 22 }}>
          Chat Assistant
        </h2>
        <div className="muted" style={{ marginTop: 8 }}>
          Workspace {workspaceId} / {workspaceRole}
        </div>
      </div>
      {canManageWorkspace ? (
        <Link className="button secondary" href={`/app/workspaces/${workspaceId}/settings`}>
          Settings
        </Link>
      ) : null}
    </div>
  );
}
