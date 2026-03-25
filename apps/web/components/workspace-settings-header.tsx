"use client";

import { WorkspaceSettingsHeaderActions } from "./workspace-settings-header-actions";
import type { WorkspaceSettingsHeaderProps } from "./workspace-settings-header.types";

export function WorkspaceSettingsHeader({ copy, locale, onLocaleChange, username, workspace, workspaceId }: WorkspaceSettingsHeaderProps) {
  return (
    <div className="panel-header">
      <div>
        <div className="eyebrow">{copy.eyebrow}</div>
        <h1 className="title">{copy.title}</h1>
        <div className="muted" style={{ marginTop: 8 }}>{copy.subtitle}</div>
        {username ? (
          <div className="muted" style={{ marginTop: 8 }}>{username}{workspace ? ` / ${workspace.role}` : ""}</div>
        ) : null}
      </div>
      <WorkspaceSettingsHeaderActions copy={copy} locale={locale} onLocaleChange={onLocaleChange} workspaceId={workspaceId} />
    </div>
  );
}
