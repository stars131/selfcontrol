"use client";

import type { LocaleCode } from "../lib/locale";
import { LanguageSwitcher } from "./language-switcher";

type WorkspaceEntryHeaderCopy = {
  eyebrow: string;
  title: string;
  signedInAs: string;
  signedIn: string;
  signOut: string;
};

export function WorkspaceEntryHeader({
  copy,
  locale,
  username,
  onLocaleChange,
  onLogout,
}: {
  copy: WorkspaceEntryHeaderCopy;
  locale: LocaleCode;
  username?: string | null;
  onLocaleChange: (nextLocale: LocaleCode) => void;
  onLogout: () => void;
}) {
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
