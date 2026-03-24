"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import type { LocaleCode } from "../lib/locale";
import { LanguageSwitcher } from "./language-switcher";

type AuthFormFrameProps = {
  alternateHref: string;
  alternateLabel: string;
  children: ReactNode;
  eyebrow: string;
  locale: LocaleCode;
  onLocaleChange: (locale: LocaleCode) => void;
  title: string;
};

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
