"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStoredLocale, type LocaleCode } from "../lib/locale";
import { LanguageSwitcher } from "./language-switcher";
import { WorkspaceCreateSection } from "./workspace-create-section";
import { WorkspaceImportSection } from "./workspace-import-section";
import { WorkspaceJoinSection } from "./workspace-join-section";
import { useWorkspaceEntryController } from "./use-workspace-entry-controller";
import { WorkspaceListSection } from "./workspace-list-section";
import { WorkspaceTransferJobsSection } from "./workspace-transfer-jobs-section";

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
    refreshJobs: "ジョブを更新",
    openImportedWorkspace: "インポート結果を開く",
    downloadExportJob: "エクスポート結果を取得",
    noJobs: "バックグラウンドジョブはまだありません。",
    noWorkspace: "まだワークスペースがありません。先に作成またはインポートしてください。",
    loading: "ワークスペース一覧を読み込み中...",
  },
};

const DISPLAY_COPY: Record<
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
    refreshJobs: "ジョブを更新",
    openImportedWorkspace: "インポート結果を開く",
    downloadExportJob: "エクスポート結果を取得",
    noJobs: "バックグラウンドジョブはまだありません。",
    noWorkspace: "まだワークスペースがありません。先に作成またはインポートしてください。",
    loading: "ワークスペース一覧を読み込み中...",
  },
};

export function WorkspaceEntryClient() {
  const router = useRouter();
  const { locale, setLocale } = useStoredLocale();
  const copy = { ...COPY[locale], ...DISPLAY_COPY[locale] };
  const {
    fileInputRef,
    token,
    user,
    workspaces,
    name,
    shareTokenInput,
    importName,
    importSlug,
    importFile,
    transferJobs,
    sharePreview,
    loading,
    error,
    creating,
    importing,
    queueingImportJob,
    joining,
    previewing,
    jobsLoading,
    suggestedSlug,
    normalizedShareToken,
    setName,
    setShareTokenInput,
    setImportName,
    setImportSlug,
    setImportFile,
    handleCreate,
    handleImportWorkspace,
    handleQueueImportJob,
    handlePreviewShare,
    handleAcceptShare,
    handleLogout,
    handleDownloadTransferJob,
    loadTransferJobs,
  } = useWorkspaceEntryController(router);

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
            <WorkspaceCreateSection
              copy={copy}
              creating={creating}
              name={name}
              onNameChange={setName}
              onSubmit={handleCreate}
              suggestedSlug={suggestedSlug}
            />

            <WorkspaceJoinSection
              copy={copy}
              joining={joining}
              onAcceptShare={handleAcceptShare}
              onPreviewShare={handlePreviewShare}
              onShareTokenInputChange={setShareTokenInput}
              previewing={previewing}
              sharePreview={sharePreview}
              shareTokenInput={shareTokenInput}
            />

            <WorkspaceImportSection
              copy={copy}
              fileInputRef={fileInputRef}
              importFile={importFile}
              importName={importName}
              importSlug={importSlug}
              importing={importing}
              onImportFileChange={setImportFile}
              onImportNameChange={setImportName}
              onImportSlugChange={setImportSlug}
              onImportWorkspace={handleImportWorkspace}
              onQueueImportJob={handleQueueImportJob}
              queueingImportJob={queueingImportJob}
            />

            <WorkspaceListSection copy={copy} workspaces={workspaces} />

            <WorkspaceTransferJobsSection
              copy={copy}
              jobsLoading={jobsLoading}
              locale={locale}
              token={token}
              transferJobs={transferJobs}
              onDownloadTransferJob={handleDownloadTransferJob}
              onRefreshJobs={() => (token ? loadTransferJobs(token) : Promise.resolve())}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
