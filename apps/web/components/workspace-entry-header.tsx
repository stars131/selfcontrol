"use client";

import { LanguageSwitcher } from "./language-switcher";
import type { WorkspaceEntryHeaderProps } from "./workspace-entry-header.types";

export function WorkspaceEntryHeader({
  copy,
  locale,
  username,
  onLocaleChange,
  onLogout,
}: WorkspaceEntryHeaderProps) {
  return (
    <div className="panel-header">
      <div>
        <div className="eyebrow">{copy.eyebrow}</div>
        <h1 className="title">{copy.title}</h1>
        <div className="muted" style={{ marginTop: 8 }}>
          {username ? `${copy.signedInAs} ${username}` : copy.signedIn}
        </div>
      </div>
      <div className="hero-actions">
        <LanguageSwitcher locale={locale} onChange={onLocaleChange} />
        <button className="button secondary" type="button" onClick={onLogout}>
          {copy.signOut}
        </button>
      </div>
    </div>
  );
}
