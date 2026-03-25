"use client";

import Link from "next/link";
import type { AuthFormFrameProps } from "./auth-form-frame.types";
import { LanguageSwitcher } from "./language-switcher";

export function AuthFormFrame({
  alternateHref,
  alternateLabel,
  children,
  eyebrow,
  locale,
  onLocaleChange,
  title,
}: AuthFormFrameProps) {
  return (
    <main className="page-shell">
      <section className="panel auth-panel">
        <div className="panel-header">
          <div>
            <div className="eyebrow">{eyebrow}</div>
            <h1 className="title">{title}</h1>
          </div>
          <div className="hero-actions">
            <LanguageSwitcher locale={locale} onChange={onLocaleChange} />
            <Link className="button secondary" href={alternateHref}>
              {alternateLabel}
            </Link>
          </div>
        </div>
        <div className="panel-body">{children}</div>
      </section>
    </main>
  );
}
