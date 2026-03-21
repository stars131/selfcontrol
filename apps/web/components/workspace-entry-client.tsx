"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

import {
  acceptShareToken,
  createWorkspace,
  createWorkspaceImportJob,
  downloadWorkspaceTransferJob,
  getCurrentUser,
  importWorkspaceArchive,
  listWorkspaceTransferJobs,
  listWorkspaces,
  previewShareToken,
} from "../lib/api";
import { clearStoredSession, getStoredToken } from "../lib/auth";
import { useStoredLocale, type LocaleCode } from "../lib/locale";
import type { SharePreview, User, Workspace, WorkspaceTransferJob } from "../lib/types";
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
    importEyebrow: string;
    importTitle: string;
    importArchive: string;
    importName: string;
    importSlug: string;
    importWorkspace: string;
    queueImportJob: string;
    joinEyebrow: string;
    joinTitle: string;
    sharePlaceholder: string;
    previewShare: string;
    joinWorkspace: string;
    listEyebrow: string;
    listTitle: string;
    openWorkspace: string;
    settings: string;
    jobsEyebrow: string;
    jobsTitle: string;
    refreshJobs: string;
    openImportedWorkspace: string;
    downloadExportJob: string;
    noJobs: string;
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
    importEyebrow: "导入",
    importTitle: "从导出 ZIP 恢复",
    importArchive: "导入 ZIP",
    importName: "新工作区名称（可选）",
    importSlug: "新工作区 Slug（可选）",
    importWorkspace: "导入工作区",
    queueImportJob: "加入导入队列",
    joinEyebrow: "加入",
    joinTitle: "共享工作区",
    sharePlaceholder: "粘贴分享 token 或 /share/... 链接",
    previewShare: "预览分享",
    joinWorkspace: "加入工作区",
    listEyebrow: "列表",
    listTitle: "你的工作区",
    openWorkspace: "打开工作区",
    settings: "设置",
    jobsEyebrow: "任务",
    jobsTitle: "最近后台任务",
    refreshJobs: "刷新任务",
    openImportedWorkspace: "打开导入结果",
    downloadExportJob: "下载导出结果",
    noJobs: "当前没有后台任务。",
    noWorkspace: "还没有工作区，先创建或导入一个。",
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
    importEyebrow: "Import",
    importTitle: "Restore from export ZIP",
    importArchive: "Import ZIP",
    importName: "New workspace name (optional)",
    importSlug: "New workspace slug (optional)",
    importWorkspace: "Import workspace",
    queueImportJob: "Queue import job",
    joinEyebrow: "Join",
    joinTitle: "Shared workspace",
    sharePlaceholder: "Paste share token or /share/... link",
    previewShare: "Preview share",
    joinWorkspace: "Join workspace",
    listEyebrow: "List",
    listTitle: "Your workspaces",
    openWorkspace: "Open workspace",
    settings: "Settings",
    jobsEyebrow: "Jobs",
    jobsTitle: "Recent background jobs",
    refreshJobs: "Refresh jobs",
    openImportedWorkspace: "Open imported workspace",
    downloadExportJob: "Download export result",
    noJobs: "No background jobs yet.",
    noWorkspace: "No workspace yet. Create or import one first.",
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
    createWorkspace: "ワークスペースを作成",
    importEyebrow: "インポート",
    importTitle: "エクスポート ZIP から復元",
    importArchive: "ZIP を選択",
    importName: "新しいワークスペース名（任意）",
    importSlug: "新しいワークスペース slug（任意）",
    importWorkspace: "ワークスペースをインポート",
    queueImportJob: "インポートジョブ追加",
    joinEyebrow: "参加",
    joinTitle: "共有ワークスペース",
    sharePlaceholder: "共有 token または /share/... リンクを貼り付け",
    previewShare: "共有を確認",
    joinWorkspace: "ワークスペースに参加",
    listEyebrow: "一覧",
    listTitle: "あなたのワークスペース",
    openWorkspace: "開く",
    settings: "設定",
    jobsEyebrow: "ジョブ",
    jobsTitle: "最近のバックグラウンドジョブ",
    refreshJobs: "ジョブ更新",
    openImportedWorkspace: "インポート結果を開く",
    downloadExportJob: "エクスポート結果を取得",
    noJobs: "バックグラウンドジョブはまだありません。",
    noWorkspace: "まだワークスペースがありません。先に作成またはインポートしてください。",
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
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [name, setName] = useState("");
  const [shareTokenInput, setShareTokenInput] = useState("");
  const [importName, setImportName] = useState("");
  const [importSlug, setImportSlug] = useState("");
  const [importFile, setImportFile] = useState<File | null>(null);
  const [transferJobs, setTransferJobs] = useState<WorkspaceTransferJob[]>([]);
  const [sharePreview, setSharePreview] = useState<SharePreview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [creating, setCreating] = useState(false);
  const [importing, setImporting] = useState(false);
  const [queueingImportJob, setQueueingImportJob] = useState(false);
  const [joining, setJoining] = useState(false);
  const [previewing, setPreviewing] = useState(false);
  const [jobsLoading, setJobsLoading] = useState(false);

  const suggestedSlug = useMemo(() => slugify(name), [name]);
  const normalizedShareToken = useMemo(() => extractShareToken(shareTokenInput), [shareTokenInput]);

  const loadTransferJobs = async (activeToken: string) => {
    setJobsLoading(true);
    try {
      const result = await listWorkspaceTransferJobs(activeToken);
      setTransferJobs(result.items);
    } finally {
      setJobsLoading(false);
    }
  };

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
        await loadTransferJobs(nextToken);
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

  const handleImportWorkspace = async () => {
    if (!token || !importFile) {
      return;
    }

    setImporting(true);
    setError("");
    try {
      const result = await importWorkspaceArchive(token, {
        file: importFile,
        name: importName.trim() || undefined,
        slug: slugify(importSlug) || undefined,
      });
      const workspaceResult = await listWorkspaces(token);
      setWorkspaces(workspaceResult.items);
      await loadTransferJobs(token);
      setImportName("");
      setImportSlug("");
      setImportFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      router.push(`/app/workspaces/${result.result.workspace.id}`);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Failed to import workspace");
    } finally {
      setImporting(false);
    }
  };

  const handleQueueImportJob = async () => {
    if (!token || !importFile) {
      return;
    }

    setQueueingImportJob(true);
    setError("");
    try {
      await createWorkspaceImportJob(token, {
        file: importFile,
        name: importName.trim() || undefined,
        slug: slugify(importSlug) || undefined,
      });
      await loadTransferJobs(token);
      setImportName("");
      setImportSlug("");
      setImportFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Failed to create import job");
    } finally {
      setQueueingImportJob(false);
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

  const handleDownloadTransferJob = async (jobId: string) => {
    if (!token) {
      return;
    }
    setError("");
    try {
      const result = await downloadWorkspaceTransferJob(token, jobId);
      const objectUrl = window.URL.createObjectURL(result.blob);
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = result.filename ?? `workspace-transfer-${jobId}.zip`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(objectUrl);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Failed to download transfer job result");
    }
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
          {error ? <div className="notice error">{error}</div> : null}
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
                  <button
                    className="button secondary"
                    type="button"
                    disabled={previewing}
                    onClick={() => void handlePreviewShare()}
                  >
                    {previewing ? `${copy.previewShare}...` : copy.previewShare}
                  </button>
                  <button
                    className="button"
                    type="button"
                    disabled={joining || !sharePreview}
                    onClick={() => void handleAcceptShare()}
                  >
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

            <section className="record-card">
              <div className="eyebrow">{copy.importEyebrow}</div>
              <h2 style={{ margin: "8px 0 12px" }}>{copy.importTitle}</h2>
              <div className="form-stack">
                <label className="field">
                  <span className="field-label">{copy.importArchive}</span>
                  <input
                    ref={fileInputRef}
                    className="input"
                    type="file"
                    accept=".zip,application/zip"
                    onChange={(event) => setImportFile(event.target.files?.[0] ?? null)}
                  />
                </label>
                <label className="field">
                  <span className="field-label">{copy.importName}</span>
                  <input
                    className="input"
                    value={importName}
                    onChange={(event) => setImportName(event.target.value)}
                  />
                </label>
                <label className="field">
                  <span className="field-label">{copy.importSlug}</span>
                  <input
                    className="input"
                    value={importSlug}
                    onChange={(event) => setImportSlug(event.target.value)}
                  />
                </label>
                <button
                  className="button"
                  type="button"
                  disabled={importing || !importFile}
                  onClick={() => void handleImportWorkspace()}
                >
                  {importing ? `${copy.importWorkspace}...` : copy.importWorkspace}
                </button>
                <button
                  className="button secondary"
                  type="button"
                  disabled={queueingImportJob || !importFile}
                  onClick={() => void handleQueueImportJob()}
                >
                  {queueingImportJob ? `${copy.queueImportJob}...` : copy.queueImportJob}
                </button>
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

            <section className="record-card" style={{ gridColumn: "1 / -1" }}>
              <div className="action-row" style={{ justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div className="eyebrow">{copy.jobsEyebrow}</div>
                  <h2 style={{ margin: "8px 0 12px" }}>{copy.jobsTitle}</h2>
                </div>
                <button className="button secondary" disabled={jobsLoading || !token} type="button" onClick={() => token ? void loadTransferJobs(token) : undefined}>
                  {jobsLoading ? `${copy.refreshJobs}...` : copy.refreshJobs}
                </button>
              </div>
              <div className="record-list compact-list">
                {transferJobs.length ? (
                  transferJobs.map((job) => {
                    const importedWorkspaceId =
                      job.job_type === "import" && typeof job.result_json.workspace_id === "string"
                        ? job.result_json.workspace_id
                        : null;
                    return (
                      <article className="message" key={job.id}>
                        <div className="action-row" style={{ justifyContent: "space-between", alignItems: "flex-start" }}>
                          <div>
                            <div className="eyebrow">{job.job_type} / {job.status}</div>
                            <div style={{ marginTop: 8, fontWeight: 600 }}>{job.id}</div>
                            <div className="muted" style={{ marginTop: 8 }}>
                              {new Date(job.created_at).toLocaleString(locale)}
                            </div>
                            {job.error_message ? (
                              <div className="notice error" style={{ marginTop: 12 }}>{job.error_message}</div>
                            ) : null}
                          </div>
                          <div className="action-row">
                            {job.job_type === "import" && importedWorkspaceId && job.status === "completed" ? (
                              <Link className="button secondary" href={`/app/workspaces/${importedWorkspaceId}`}>
                                {copy.openImportedWorkspace}
                              </Link>
                            ) : null}
                            {job.job_type === "export" && job.status === "completed" ? (
                              <button className="button secondary" type="button" onClick={() => void handleDownloadTransferJob(job.id)}>
                                {copy.downloadExportJob}
                              </button>
                            ) : null}
                          </div>
                        </div>
                      </article>
                    );
                  })
                ) : (
                  <div className="notice">{copy.noJobs}</div>
                )}
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
