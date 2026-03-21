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
import { useStoredLocale, type LocaleCode } from "../lib/locale";
import type { SharePreview, User, Workspace } from "../lib/types";
import { LanguageSwitcher } from "./language-switcher";

const COPY: Record<
  LocaleCode,
  {
    eyebrow: string;
    title: string;
    signedInAs: string;
    signedIn: string;
    signOut: string;
    createEyebrow: string;
    createTitle: string;
    name: string;
    slugPreview: string;
    createWorkspace: string;
    joinEyebrow: string;
    joinTitle: string;
    sharePlaceholder: string;
    previewShare: string;
    joinWorkspace: string;
    listEyebrow: string;
    listTitle: string;
    openWorkspace: string;
    settings: string;
    noWorkspace: string;
    loading: string;
  }
> = {
  "zh-CN": {
    eyebrow: "工作区",
    title: "控制中心",
    signedInAs: "当前登录",
    signedIn: "已登录",
    signOut: "退出登录",
    createEyebrow: "创建",
    createTitle: "新建工作区",
    name: "名称",
    slugPreview: "Slug 预览",
    createWorkspace: "创建工作区",
    joinEyebrow: "加入",
    joinTitle: "共享工作区",
    sharePlaceholder: "粘贴分享 token 或 /share/... 链接",
    previewShare: "预览分享",
    joinWorkspace: "加入工作区",
    listEyebrow: "列表",
    listTitle: "你的工作区",
    openWorkspace: "打开工作区",
    settings: "设置",
    noWorkspace: "还没有工作区。先在左侧创建一个。",
    loading: "正在加载工作区列表...",
  },
  en: {
    eyebrow: "Workspace",
    title: "Control Center",
    signedInAs: "Signed in as",
    signedIn: "Signed in",
    signOut: "Sign Out",
    createEyebrow: "Create",
    createTitle: "New workspace",
    name: "Name",
    slugPreview: "Slug preview",
    createWorkspace: "Create workspace",
    joinEyebrow: "Join",
    joinTitle: "Shared workspace",
    sharePlaceholder: "Paste share token or /share/... link",
    previewShare: "Preview share",
    joinWorkspace: "Join workspace",
    listEyebrow: "List",
    listTitle: "Your workspaces",
    openWorkspace: "Open workspace",
    settings: "Settings",
    noWorkspace: "No workspace yet. Create your first one on the left.",
    loading: "Loading your workspace list...",
  },
  ja: {
    eyebrow: "ワークスペース",
    title: "コントロールセンター",
    signedInAs: "ログイン中",
    signedIn: "ログイン済み",
    signOut: "ログアウト",
    createEyebrow: "作成",
    createTitle: "新しいワークスペース",
    name: "名前",
    slugPreview: "Slug プレビュー",
    createWorkspace: "ワークスペース作成",
    joinEyebrow: "参加",
    joinTitle: "共有ワークスペース",
    sharePlaceholder: "共有トークンまたは /share/... リンクを貼り付け",
    previewShare: "共有を確認",
    joinWorkspace: "ワークスペース参加",
    listEyebrow: "一覧",
    listTitle: "あなたのワークスペース",
    openWorkspace: "ワークスペースを開く",
    settings: "設定",
    noWorkspace: "まだワークスペースがありません。左側で最初のものを作成してください。",
    loading: "ワークスペース一覧を読み込み中...",
  },
};

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
  const { locale, setLocale } = useStoredLocale();
  const copy = COPY[locale];
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
            <div className="notice">{copy.loading}</div>
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
            <div className="eyebrow">{copy.eyebrow}</div>
            <h1 className="title">{copy.title}</h1>
            <div className="muted" style={{ marginTop: 8 }}>
              {user ? `${copy.signedInAs} ${user.username}` : copy.signedIn}
            </div>
          </div>
          <div className="hero-actions">
            <LanguageSwitcher locale={locale} onChange={setLocale} />
            <button className="button secondary" type="button" onClick={handleLogout}>
              {copy.signOut}
            </button>
          </div>
        </div>
        <div className="panel-body">
          <div className="two-column-grid">
            <section className="record-card">
              <div className="eyebrow">{copy.createEyebrow}</div>
              <h2 style={{ margin: "8px 0 12px" }}>{copy.createTitle}</h2>
              <form className="form-stack" onSubmit={handleCreate}>
                <label className="field">
                  <span className="field-label">{copy.name}</span>
                  <input
                    className="input"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Food memory"
                  />
                </label>
                <label className="field">
                  <span className="field-label">{copy.slugPreview}</span>
                  <input className="input" value={suggestedSlug} readOnly />
                </label>
                {error ? <div className="notice error">{error}</div> : null}
                <button className="button" type="submit" disabled={creating}>
                  {creating ? `${copy.createWorkspace}...` : copy.createWorkspace}
                </button>
              </form>
            </section>

            <section className="record-card">
              <div className="eyebrow">{copy.joinEyebrow}</div>
              <h2 style={{ margin: "8px 0 12px" }}>{copy.joinTitle}</h2>
              <div className="form-stack">
                <input
                  className="input"
                  placeholder={copy.sharePlaceholder}
                  value={shareTokenInput}
                  onChange={(event) => setShareTokenInput(event.target.value)}
                />
                <div className="action-row">
                  <button className="button secondary" type="button" disabled={previewing} onClick={() => void handlePreviewShare()}>
                    {previewing ? `${copy.previewShare}...` : copy.previewShare}
                  </button>
                  <button className="button" type="button" disabled={joining || !sharePreview} onClick={() => void handleAcceptShare()}>
                    {joining ? `${copy.joinWorkspace}...` : copy.joinWorkspace}
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
              <div className="eyebrow">{copy.listEyebrow}</div>
              <h2 style={{ margin: "8px 0 12px" }}>{copy.listTitle}</h2>
              <div className="record-list">
                {workspaces.length ? (
                  workspaces.map((workspace) => (
                    <article className="record-card" key={workspace.id}>
                      <div className="eyebrow">
                        {workspace.visibility} / {workspace.role}
                      </div>
                      <h3 style={{ margin: "8px 0 6px" }}>{workspace.name}</h3>
                      <div className="muted">{workspace.slug}</div>
                      <div style={{ marginTop: 12 }}>
                        <div className="action-row">
                          <Link className="button" href={`/app/workspaces/${workspace.id}`}>
                            {copy.openWorkspace}
                          </Link>
                          {workspace.role !== "viewer" ? (
                            <Link className="button secondary" href={`/app/workspaces/${workspace.id}/settings`}>
                              {copy.settings}
                            </Link>
                          ) : null}
                        </div>
                      </div>
                    </article>
                  ))
                ) : (
                  <div className="notice">{copy.noWorkspace}</div>
                )}
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
