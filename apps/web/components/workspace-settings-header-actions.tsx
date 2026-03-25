"use client";

import Link from "next/link";

import { LanguageSwitcher } from "./language-switcher";
import type { WorkspaceSettingsHeaderActionsProps } from "./workspace-settings-header-actions.types";

export function WorkspaceSettingsHeaderActions({ copy, locale, onLocaleChange, workspaceId }: WorkspaceSettingsHeaderActionsProps) {
  return (
    <div className="hero-actions">
      <LanguageSwitcher locale={locale} onChange={onLocaleChange} />
      <Link className="button secondary" href={`/app/workspaces/${workspaceId}`}>
        {copy.back}
      </Link>
    </div>
  );
}
