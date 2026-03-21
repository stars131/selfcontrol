"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState } from "react";

import {
  acceptShareToken,
  createWorkspace,
  getCurrentUser,
  listWorkspaces,
  previewShareToken,
} from "../lib/api";
import { clearStoredSession, getStoredToken } from "../lib/auth";
import type { SharePreview, User, Workspace } from "../lib/types";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function extractShareToken(value: string) {
  const trimmed = value.trim();
  if (!trimmed) {
    return "";
  }
  if (trimmed.includes("/share/")) {
    return trimmed.split("/share/").pop()?.split(/[?#]/)[0] ?? "";
  }
  return trimmed.replace(/^\/+/, "").replace(/^share\//, "");
}

export function WorkspaceEntryClient() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [name, setName] = useState("");
  const [shareTokenInput, setShareTokenInput] = useState("");
  const [sharePreview, setSharePreview] = useState<SharePreview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [creating, setCreating] = useState(false);
  const [joining, setJoining] = useState(false);
  const [previewing, setPreviewing] = useState(false);

  const suggestedSlug = useMemo(() => slugify(name), [name]);
  const normalizedShareToken = useMemo(() => extractShareToken(shareTokenInput), [shareTokenInput]);

  useEffect(() => {
    const nextToken = getStoredToken();
    if (!nextToken) {
      router.replace("/login");
      return;
    }

    const load = async () => {
      try {
        setToken(nextToken);
        const [me, workspaceResult] = await Promise.all([getCurrentUser(nextToken), listWorkspaces(nextToken)]);
        setUser(me.user);
        setWorkspaces(workspaceResult.items);
      } catch (caught) {
        clearStoredSession();
        setError(caught instanceof Error ? caught.message : "Failed to load workspace list");
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, [router]);

  const handleCreate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!token || !name.trim()) {
      return;
    }

    setCreating(true);
    setError("");
    try {
      const result = await createWorkspace(token, {
        name: name.trim(),
        slug: suggestedSlug || `workspace-${Date.now()}`,
      });
      setWorkspaces((prev) => [result.workspace, ...prev]);
      setName("");
      router.push(`/app/workspaces/${result.workspace.id}`);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Failed to create workspace");
    } finally {
      setCreating(false);
    }
  };

  const handlePreviewShare = async () => {
    if (!normalizedShareToken) {
      return;
    }
    setPreviewing(true);
    setError("");
    try {
      const result = await previewShareToken(normalizedShareToken);
      setSharePreview(result.preview);
    } catch (caught) {
      setSharePreview(null);
      setError(caught instanceof Error ? caught.message : "Failed to preview share link");
    } finally {
      setPreviewing(false);
    }
  };

  const handleAcceptShare = async () => {
    if (!token || !normalizedShareToken) {
      return;
    }
    setJoining(true);
    setError("");
    try {
      const result = await acceptShareToken(token, normalizedShareToken);
      const workspaceResult = await listWorkspaces(token);
      setWorkspaces(workspaceResult.items);
      router.push(`/app/workspaces/${result.workspace.id}`);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Failed to join shared workspace");
    } finally {
      setJoining(false);
    }
  };

  const handleLogout = () => {
    clearStoredSession();
    router.replace("/login");
  };

  if (loading) {
    return (
      <main className="page-shell">
        <section className="panel auth-panel">
          <div className="panel-body">
            <div className="notice">Loading your workspace list...</div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="page-shell">
      <section className="panel" style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div className="panel-header">
          <div>
            <div className="eyebrow">Workspace</div>
            <h1 className="title">Control Center</h1>
            <div className="muted" style={{ marginTop: 8 }}>
              {user ? `Signed in as ${user.username}` : "Signed in"}
            </div>
          </div>
          <button className="button secondary" type="button" onClick={handleLogout}>
            Sign Out
          </button>
        </div>
        <div className="panel-body">
          <div className="two-column-grid">
            <section className="record-card">
              <div className="eyebrow">Create</div>
              <h2 style={{ margin: "8px 0 12px" }}>New workspace</h2>
              <form className="form-stack" onSubmit={handleCreate}>
                <label className="field">
                  <span className="field-label">Name</span>
                  <input
                    className="input"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Food memory"
                  />
                </label>
                <label className="field">
                  <span className="field-label">Slug preview</span>
                  <input className="input" value={suggestedSlug} readOnly />
                </label>
                {error ? <div className="notice error">{error}</div> : null}
                <button className="button" type="submit" disabled={creating}>
                  {creating ? "Creating..." : "Create workspace"}
                </button>
              </form>
            </section>

            <section className="record-card">
              <div className="eyebrow">Join</div>
              <h2 style={{ margin: "8px 0 12px" }}>Shared workspace</h2>
              <div className="form-stack">
                <input
                  className="input"
                  placeholder="Paste share token or /share/... link"
                  value={shareTokenInput}
                  onChange={(event) => setShareTokenInput(event.target.value)}
                />
                <div className="action-row">
                  <button className="button secondary" type="button" disabled={previewing} onClick={() => void handlePreviewShare()}>
                    {previewing ? "Previewing..." : "Preview share"}
                  </button>
                  <button className="button" type="button" disabled={joining || !sharePreview} onClick={() => void handleAcceptShare()}>
                    {joining ? "Joining..." : "Join workspace"}
                  </button>
                </div>
                {sharePreview ? (
                  <article className="message assistant">
                    <div className="eyebrow">{sharePreview.permission_code}</div>
                    <div style={{ marginTop: 8, fontWeight: 600 }}>{sharePreview.workspace_name}</div>
                    <div style={{ marginTop: 8 }}>{sharePreview.name}</div>
                    <div className="muted" style={{ marginTop: 8 }}>
                      {sharePreview.workspace_slug}
                    </div>
                  </article>
                ) : null}
              </div>
            </section>

            <section className="record-card" style={{ gridColumn: "1 / -1" }}>
              <div className="eyebrow">List</div>
              <h2 style={{ margin: "8px 0 12px" }}>Your workspaces</h2>
              <div className="record-list">
                {workspaces.length ? (
                  workspaces.map((workspace) => (
                    <article className="record-card" key={workspace.id}>
                      <div className="eyebrow">{workspace.visibility}</div>
                      <h3 style={{ margin: "8px 0 6px" }}>{workspace.name}</h3>
                      <div className="muted">{workspace.slug}</div>
                      <div style={{ marginTop: 12 }}>
                        <Link className="button" href={`/app/workspaces/${workspace.id}`}>
                          Open workspace
                        </Link>
                      </div>
                    </article>
                  ))
                ) : (
                  <div className="notice">No workspace yet. Create your first one on the left.</div>
                )}
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
