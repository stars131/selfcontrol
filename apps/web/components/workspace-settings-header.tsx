"use client";

import Link from "next/link";

import { LanguageSwitcher } from "./language-switcher";
import type { WorkspaceSettingsHeaderProps } from "./workspace-settings-header.types";

export function WorkspaceSettingsHeader({
  copy,
  locale,
  onLocaleChange,
  username,
  workspace,
  workspaceId,
}: WorkspaceSettingsHeaderProps) {
  return (
    <div className="panel-header">
      <div>
        <div className="eyebrow">{copy.eyebrow}</div>
        <h1 className="title">{copy.title}</h1>
        <div className="muted" style={{ marginTop: 8 }}>
          {copy.subtitle}
        </div>
        {username ? (
          <div className="muted" style={{ marginTop: 8 }}>
            {username}
            {workspace ? ` / ${workspace.role}` : ""}
          </div>
        ) : null}
      </div>
      <div className="hero-actions">
        <LanguageSwitcher locale={locale} onChange={onLocaleChange} />
        <Link className="button secondary" href={`/app/workspaces/${workspaceId}`}>
          {copy.back}
        </Link>
      </div>
    </div>
  );
}
