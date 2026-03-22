"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStoredLocale } from "../lib/locale";
import { LanguageSwitcher } from "./language-switcher";
import { ProviderSettingsPanel } from "./provider-settings-panel";
import { useWorkspaceSettingsController } from "./use-workspace-settings-controller";
import { WorkspaceMembersSection } from "./workspace-members-section";
import { getWorkspaceSettingsCopy } from "./workspace-settings-copy";
import { WorkspaceExportCard } from "./workspace-export-card";
import { WorkspaceExportJobsCard } from "./workspace-export-jobs-card";
import { WorkspaceMediaRetentionCard } from "./workspace-media-retention-card";

export function WorkspaceSettingsClient({ workspaceId }: { workspaceId: string }) {
  const router = useRouter();
  const { locale, setLocale } = useStoredLocale();
  const copy = getWorkspaceSettingsCopy(locale);
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
