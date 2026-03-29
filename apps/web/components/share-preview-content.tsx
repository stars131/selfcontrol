"use client";

import Link from "next/link";
import { getSharePermissionLabel } from "../lib/share-link-display";
import type { SharePreviewContentProps } from "./share-preview-content.types";

export function SharePreviewContent({
  copy,
  error,
  handleJoin,
  joining,
  loading,
  locale,
  preview,
}: SharePreviewContentProps) {
  return (
    <main className="page-shell">
      <section className="panel" style={{ maxWidth: 760, margin: "0 auto" }}>
        <div className="panel-header">
          <div>
            <div className="eyebrow">{copy.shareEyebrow}</div>
            <h1 className="title">{copy.shareTitle}</h1>
          </div>
        </div>
        <div className="panel-body">
          {loading ? <div className="notice">{copy.loading}</div> : null}
          {!loading && preview ? (
            <article className="record-card">
              <div className="eyebrow">{getSharePermissionLabel(locale, preview.permission_code)}</div>
              <h2 style={{ margin: "8px 0 12px" }}>{preview.workspace_name}</h2>
              <div>{preview.name}</div>
              <div className="muted" style={{ marginTop: 8 }}>{preview.workspace_slug}</div>
              <div className="action-row" style={{ marginTop: 16 }}>
                <button className="button" type="button" disabled={joining} onClick={() => void handleJoin()}>
                  {joining ? copy.joining : copy.joinWorkspace}
                </button>
                <Link className="button secondary" href="/app">
                  {copy.controlCenter}
                </Link>
              </div>
            </article>
          ) : null}
          {!loading && !preview ? <div className="notice error">{copy.invalidLink}</div> : null}
          {error ? <div className="notice error" style={{ marginTop: 12 }}>{error}</div> : null}
        </div>
      </section>
    </main>
  );
}
