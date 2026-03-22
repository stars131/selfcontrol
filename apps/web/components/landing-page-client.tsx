"use client";

import Link from "next/link";

import { useStoredLocale } from "../lib/locale";
import { getLandingPageCopy } from "./landing-page-copy";
import { LanguageSwitcher } from "./language-switcher";

export function LandingPageClient() {
  const { locale, setLocale } = useStoredLocale();
  const copy = getLandingPageCopy(locale);

  return (
    <main className="page-shell">
      <section className="panel" style={{ maxWidth: 960, margin: "0 auto" }}>
        <div className="panel-header">
          <div>
            <div className="eyebrow">{copy.eyebrow}</div>
            <h1 className="title">{copy.title}</h1>
          </div>
          <div className="hero-actions">
            <LanguageSwitcher locale={locale} onChange={setLocale} />
            <Link className="button secondary" href="/register">
              {copy.createAccount}
            </Link>
            <Link className="button" href="/login">
              {copy.signIn}
            </Link>
          </div>
        </div>
        <div className="panel-body">
          <p className="muted" style={{ lineHeight: 1.7, maxWidth: 720 }}>
            {copy.description}
          </p>
          <div className="stats-grid" style={{ marginTop: 20 }}>
            <div className="stat-card">
              <div className="eyebrow">{copy.captureTitle}</div>
              <div className="title" style={{ fontSize: 18 }}>
                {copy.captureValue}
              </div>
            </div>
            <div className="stat-card">
              <div className="eyebrow">{copy.retrieveTitle}</div>
              <div className="title" style={{ fontSize: 18 }}>
                {copy.retrieveValue}
              </div>
            </div>
            <div className="stat-card">
              <div className="eyebrow">{copy.operateTitle}</div>
              <div className="title" style={{ fontSize: 18 }}>
                {copy.operateValue}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
