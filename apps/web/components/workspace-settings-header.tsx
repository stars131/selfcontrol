"use client";

import { WorkspaceSettingsHeaderActions } from "./workspace-settings-header-actions";
import { WorkspaceSettingsHeaderIntro } from "./workspace-settings-header-intro";
import type { WorkspaceSettingsHeaderProps } from "./workspace-settings-header.types";

export function WorkspaceSettingsHeader({ copy, locale, onLocaleChange, username, workspace, workspaceId }: WorkspaceSettingsHeaderProps) {
  return (
    <div className="panel-header">
      <WorkspaceSettingsHeaderIntro copy={copy} username={username} workspace={workspace} />
      <WorkspaceSettingsHeaderActions copy={copy} locale={locale} onLocaleChange={onLocaleChange} workspaceId={workspaceId} />
    </div>
  );
}
