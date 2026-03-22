"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStoredLocale, type LocaleCode } from "../lib/locale";
import { LanguageSwitcher } from "./language-switcher";
import { ProviderSettingsPanel } from "./provider-settings-panel";
import { useWorkspaceSettingsController } from "./use-workspace-settings-controller";
import { WorkspaceMembersSection } from "./workspace-members-section";
import { WorkspaceExportCard } from "./workspace-export-card";
import { WorkspaceExportJobsCard } from "./workspace-export-jobs-card";
import { WorkspaceMediaRetentionCard } from "./workspace-media-retention-card";

const COPY: Record<
  LocaleCode,
  {
    eyebrow: string;
    title: string;
    subtitle: string;
    back: string;
    providerTitle: string;
    apiTitle: string;
    apiDescription: string;
    apiBaseLabel: string;
    mapKeyLabel: string;
    mapKeyReady: string;
    mapKeyMissing: string;
    knowledgeTitle: string;
    browserKeyNote: string;
    viewerNotice: string;
    membersTitle: string;
    membersDescription: string;
    membersReadOnly: string;
    membersEmpty: string;
    roleLabel: string;
    joinedLabel: string;
    removeLabel: string;
    removingLabel: string;
    ownerProtected: string;
    loading: string;
  }
> = {
  "zh-CN": {
    eyebrow: "设置",
    title: "工作区设置",
    subtitle: "管理当前工作区的 AI 提供商、API 接入方式和成员权限。",
    back: "返回工作区",
    providerTitle: "AI Providers",
    apiTitle: "API 接入",
    apiDescription:
      "浏览器端只保存 provider 选择、模型名、API Base URL 和环境变量名，真正的密钥只保存在服务端环境变量中。",
    apiBaseLabel: "当前前端 API Base URL",
    mapKeyLabel: "高德地图 Key 状态",
    mapKeyReady: "已配置",
    mapKeyMissing: "未配置",
    knowledgeTitle: "知识库状态",
    browserKeyNote: "浏览器地图 Key 只保存在本地或部署环境变量中，不写入工作区设置。",
    viewerNotice: "Viewer 仅可只读访问。工作区设置仅对 owner 和 editor 开放。",
    membersTitle: "工作区成员",
    membersDescription: "Owner 可以调整非 owner 成员角色并移除成员，editor 只能查看成员列表。",
    membersReadOnly: "当前是 editor 视角，只能查看成员，不能修改角色或移除成员。",
    membersEmpty: "当前没有成员。",
    roleLabel: "角色",
    joinedLabel: "加入时间",
    removeLabel: "移除成员",
    removingLabel: "移除中...",
    ownerProtected: "Owner 成员受保护，不能在这里修改或移除。",
    loading: "正在加载设置...",
  },
  en: {
    eyebrow: "Settings",
    title: "Workspace Settings",
    subtitle: "Manage AI providers, API endpoints, and member permissions for this workspace.",
    back: "Back to workspace",
    providerTitle: "AI Providers",
    apiTitle: "API Integration",
    apiDescription:
      "The browser only stores provider selection, model name, API base URL, and env var names. Real secrets stay on the server.",
    apiBaseLabel: "Current frontend API base URL",
    mapKeyLabel: "AMap key status",
    mapKeyReady: "Configured",
    mapKeyMissing: "Missing",
    knowledgeTitle: "Knowledge status",
    browserKeyNote: "Browser map keys stay in local or deployment env files and are not stored in workspace settings.",
    viewerNotice: "Viewer access is read-only. Workspace settings are available to owners and editors only.",
    membersTitle: "Workspace Members",
    membersDescription: "Owners can change non-owner roles and remove members. Editors can review the member list only.",
    membersReadOnly: "Editor access can review members but cannot change roles or remove members.",
    membersEmpty: "No workspace members found.",
    roleLabel: "Role",
    joinedLabel: "Joined",
    removeLabel: "Remove member",
    removingLabel: "Removing...",
    ownerProtected: "Owner memberships are protected and cannot be changed here.",
    loading: "Loading settings...",
  },
  ja: {
    eyebrow: "設定",
    title: "ワークスペース設定",
    subtitle: "このワークスペースの AI Provider、API 連携、メンバー権限を管理します。",
    back: "ワークスペースへ戻る",
    providerTitle: "AI Providers",
    apiTitle: "API 連携",
    apiDescription:
      "ブラウザには provider の選択、モデル名、API Base URL、環境変数名のみを保存し、実際の秘密情報はサーバー側環境変数に保持します。",
    apiBaseLabel: "現在のフロントエンド API Base URL",
    mapKeyLabel: "AMap キー状態",
    mapKeyReady: "設定済み",
    mapKeyMissing: "未設定",
    knowledgeTitle: "ナレッジ状態",
    browserKeyNote: "ブラウザ用の地図キーはローカルまたはデプロイ環境変数にのみ保存され、ワークスペース設定には保存されません。",
    viewerNotice: "Viewer は読み取り専用です。ワークスペース設定は owner と editor のみ利用できます。",
    membersTitle: "ワークスペースメンバー",
    membersDescription: "Owner は non-owner の権限変更と削除ができ、editor は一覧確認のみ可能です。",
    membersReadOnly: "現在は editor 権限のため、メンバー確認のみ可能で、役割変更や削除はできません。",
    membersEmpty: "メンバーが見つかりません。",
    roleLabel: "権限",
    joinedLabel: "参加日時",
    removeLabel: "メンバー削除",
    removingLabel: "削除中...",
    ownerProtected: "Owner メンバーは保護されており、ここでは変更や削除はできません。",
    loading: "設定を読み込み中...",
  },
};

export function WorkspaceSettingsClient({ workspaceId }: { workspaceId: string }) {
  const router = useRouter();
  const { locale, setLocale } = useStoredLocale();
  const copy = COPY[locale];
  const {
    token,
    user,
    workspace,
    providerConfigs,
    mediaStorageHealth,
    knowledgeStats,
    members,
    savingMemberId,
    removingMemberId,
    refreshingMediaStorageHealth,
    highlightedAnchor,
    loading,
    error,
    refreshMediaStorageHealthState,
    handleSaveProviderConfig,
    handleUpdateMemberRole,
    handleRemoveMember,
  } = useWorkspaceSettingsController(router, workspaceId);

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
              {copy.subtitle}
            </div>
            {user ? (
              <div className="muted" style={{ marginTop: 8 }}>
                {user.username}
                {workspace ? ` / ${workspace.role}` : ""}
              </div>
            ) : null}
          </div>
          <div className="hero-actions">
            <LanguageSwitcher locale={locale} onChange={setLocale} />
            <Link className="button secondary" href={`/app/workspaces/${workspaceId}`}>
              {copy.back}
            </Link>
          </div>
        </div>
        <div className="panel-body">
          {error ? (
            <div className="notice error" style={{ marginBottom: 16 }}>
              {error}
            </div>
          ) : null}
          <div className="two-column-grid">
            <section className="record-card">
              <div className="eyebrow">{copy.apiTitle}</div>
              <div className="muted" style={{ marginTop: 8, lineHeight: 1.7 }}>
                {copy.apiDescription}
              </div>
              <div className="detail-grid" style={{ marginTop: 16 }}>
                <div className="subtle-card">
                  <div className="eyebrow">{copy.apiBaseLabel}</div>
                  <div style={{ marginTop: 8, wordBreak: "break-all", fontWeight: 600 }}>
                    {process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000/api/v1"}
                  </div>
                </div>
                <div className="subtle-card">
                  <div className="eyebrow">{copy.mapKeyLabel}</div>
                  <div style={{ marginTop: 8, fontWeight: 600 }}>
                    {process.env.NEXT_PUBLIC_AMAP_KEY ? copy.mapKeyReady : copy.mapKeyMissing}
                  </div>
                  <div className="muted" style={{ marginTop: 8 }}>
                    {copy.browserKeyNote}
                  </div>
                </div>
                <div className="subtle-card">
                  <div className="eyebrow">{copy.knowledgeTitle}</div>
                  <div style={{ marginTop: 8, fontWeight: 600 }}>
                    {knowledgeStats
                      ? `${knowledgeStats.chunk_count} chunks / ${knowledgeStats.record_count} records`
                      : "-"}
                  </div>
                </div>
              </div>
            </section>
            {workspace?.role === "owner" || workspace?.role === "editor" ? (
              <ProviderSettingsPanel
                locale={locale}
                highlightedAnchor={highlightedAnchor}
                mediaStorageHealth={mediaStorageHealth}
                onRefreshMediaStorageHealth={
                  token ? async () => refreshMediaStorageHealthState(token) : null
                }
                onSaveProviderConfig={handleSaveProviderConfig}
                providerConfigs={providerConfigs}
                refreshingMediaStorageHealth={refreshingMediaStorageHealth}
              />
            ) : (
              <section className="record-card">
                <div className="eyebrow">{copy.providerTitle}</div>
                <div className="notice" style={{ marginTop: 12 }}>
                  {copy.viewerNotice}
                </div>
              </section>
            )}
          </div>
          {workspace?.role === "owner" || workspace?.role === "editor" ? (
            token ? (
              <WorkspaceMediaRetentionCard
                locale={locale}
                role={workspace.role}
                token={token}
                workspaceId={workspaceId}
              />
            ) : null
          ) : null}
          {workspace?.role === "owner" || workspace?.role === "editor" ? (
            token ? (
              <WorkspaceExportCard
                locale={locale}
                role={workspace.role}
                token={token}
                workspaceId={workspaceId}
                workspaceSlug={workspace?.slug}
              />
            ) : null
          ) : null}
          {workspace?.role === "owner" || workspace?.role === "editor" ? (
            token ? (
              <WorkspaceExportJobsCard
                locale={locale}
                role={workspace.role}
                token={token}
                workspaceId={workspaceId}
              />
            ) : null
          ) : null}
          {workspace?.role === "owner" || workspace?.role === "editor" ? (
            <WorkspaceMembersSection
              copy={copy}
              locale={locale}
              members={members}
              onRemoveMember={handleRemoveMember}
              onUpdateMemberRole={handleUpdateMemberRole}
              removingMemberId={removingMemberId}
              savingMemberId={savingMemberId}
              userId={user?.id}
              workspaceRole={workspace.role}
            />
          ) : null}
        </div>
      </section>
    </main>
  );
}
