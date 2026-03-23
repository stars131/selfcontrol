"use client";

import Link from "next/link";

import type { LocaleCode } from "../lib/locale";
import type { Workspace } from "../lib/types";
import { LanguageSwitcher } from "./language-switcher";
import type { WorkspaceSettingsCopy } from "./workspace-settings-copy";

type WorkspaceSettingsHeaderProps = {
  copy: WorkspaceSettingsCopy;
  locale: LocaleCode;
  onLocaleChange: (locale: LocaleCode) => void;
  username?: string | null;
  workspace?: Workspace | null;
  workspaceId: string;
};

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
