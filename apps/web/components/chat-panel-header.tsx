"use client";

import Link from "next/link";

import { useStoredLocale } from "../lib/locale";
import { getWorkspaceRoleLabel } from "../lib/workspace-role-display";
import { getChatPanelDisplayCopy } from "./chat-panel-display-copy";
import type { ChatPanelHeaderProps } from "./chat-panel-header.types";

export function ChatPanelHeader({
  canManageWorkspace,
  workspaceId,
  workspaceRole,
}: ChatPanelHeaderProps) {
  const { locale } = useStoredLocale();
  const copy = getChatPanelDisplayCopy(locale);

  return (
    <div className="panel-header">
      <div>
        <div className="eyebrow">{copy.headerEyebrow}</div>
        <h2 className="title" style={{ fontSize: 22 }}>
          {copy.headerTitle}
        </h2>
        <div className="muted" style={{ marginTop: 8 }}>
          {copy.workspaceLabel} {workspaceId} / {getWorkspaceRoleLabel(locale, workspaceRole)}
        </div>
      </div>
      {canManageWorkspace ? (
        <Link className="button secondary" href={`/app/workspaces/${workspaceId}/settings`}>
          {copy.settingsLabel}
        </Link>
      ) : null}
    </div>
  );
}
