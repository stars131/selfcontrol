"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { acceptShareToken, previewShareToken } from "../lib/api";
import { getStoredToken } from "../lib/auth";
import { useStoredLocale } from "../lib/locale";
import { getSharePermissionLabel, getSharePreviewPageCopy } from "../lib/share-link-display";
import type { SharePreview } from "../lib/types";
import type { SharePreviewClientProps } from "./share-preview-client.types";

export function SharePreviewClient({ tokenValue }: SharePreviewClientProps) {
  const router = useRouter();
  const { locale } = useStoredLocale();
  const copy = getSharePreviewPageCopy(locale);
  const [preview, setPreview] = useState<SharePreview | null>(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const result = await previewShareToken(tokenValue);
        setPreview(result.preview);
      } catch (caught) {
        setError(caught instanceof Error ? caught.message : copy.loadFailed);
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, [copy.loadFailed, tokenValue]);

  const handleJoin = async () => {
    const token = getStoredToken();
    if (!token) {
      router.push("/login");
      return;
    }
    setJoining(true);
    setError("");
    try {
      const result = await acceptShareToken(token, tokenValue);
      router.push(`/app/workspaces/${result.workspace.id}`);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : copy.joinFailed);
      setJoining(false);
    }
  };

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
          {loading ? (
            <div className="notice">{copy.loading}</div>
          ) : preview ? (
            <article className="record-card">
              <div className="eyebrow">{getSharePermissionLabel(locale, preview.permission_code)}</div>
              <h2 style={{ margin: "8px 0 12px" }}>{preview.workspace_name}</h2>
              <div>{preview.name}</div>
              <div className="muted" style={{ marginTop: 8 }}>
                {preview.workspace_slug}
              </div>
              <div className="action-row" style={{ marginTop: 16 }}>
                <button className="button" type="button" disabled={joining} onClick={() => void handleJoin()}>
                  {joining ? copy.joining : copy.joinWorkspace}
                </button>
                <Link className="button secondary" href="/app">
                  {copy.controlCenter}
                </Link>
              </div>
            </article>
          ) : (
            <div className="notice error">{copy.invalidLink}</div>
          )}
          {error ? <div className="notice error" style={{ marginTop: 12 }}>{error}</div> : null}
        </div>
      </section>
    </main>
  );
}
